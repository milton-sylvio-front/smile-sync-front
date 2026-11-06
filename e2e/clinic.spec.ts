import { expect, test } from "@playwright/test";
import { login } from "./support";

test.beforeEach(async ({ page }) => {
  await login(page);
});

test("o menu da clínica percorre as áreas e o sair volta ao login", async ({ page }) => {
  await page.getByRole("button", { name: "Notificações" }).click();
  await expect(page.getByText("5 reativações pendentes")).toBeVisible();

  const menu = page.getByRole("navigation", { name: "Menu da clínica" });

  await menu.getByRole("link", { name: "Agendamentos" }).click();
  await expect(page).toHaveURL(/\/agendamentos$/);
  await expect(page.getByRole("heading", { name: "Agenda e Marcações" })).toBeVisible();

  await menu.getByRole("link", { name: "Pacientes" }).click();
  await expect(page).toHaveURL(/\/pacientes$/);
  await expect(page.getByRole("heading", { name: "Gestão de Pacientes" })).toBeVisible();

  await menu.getByRole("link", { name: "Financeiro" }).click();
  await expect(page).toHaveURL(/\/financeiro$/);
  await expect(page.getByRole("heading", { name: "Gestão Financeira" })).toBeVisible();

  await menu.getByRole("link", { name: "Reativação com IA" }).click();
  await expect(page).toHaveURL(/\/reativacao$/);
  await expect(
    page.getByRole("heading", { name: "Hub de Inteligência de Pacientes" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Sair" }).click();
  await expect(page).toHaveURL(/\/entrar$/);
  await expect(page.getByRole("heading", { name: "Bem-vindo de volta" })).toBeVisible();
});

test("cadastra um paciente e ele aparece na lista", async ({ page }) => {
  await page.goto("/pacientes");
  await page.getByRole("link", { name: "Novo Paciente" }).click();
  await expect(page).toHaveURL(/\/pacientes\/novo$/);
  await expect(page.getByRole("heading", { name: "Novo cadastro" })).toBeVisible();

  await page.getByLabel("Nome", { exact: true }).fill("An");
  await page.getByRole("button", { name: "Salvar" }).click();
  await expect(page.getByText("Informe o nome completo do paciente.")).toBeVisible();

  await page.getByLabel("Nome", { exact: true }).fill("Ana Pereira");
  await page.getByRole("button", { name: "Salvar" }).click();

  await expect(page).toHaveURL(/\/pacientes$/);
  const list = page.getByRole("region", { name: "Lista de pacientes" });
  await expect(list.getByRole("button", { name: /Ana Pereira/ })).toBeVisible();
});

test("abre o prontuário e troca de aba", async ({ page }) => {
  await page.goto("/pacientes");
  const list = page.getByRole("region", { name: "Lista de pacientes" });
  await list.getByRole("button", { name: /Sarah Johnson/ }).click();

  const tabs = page.getByRole("tablist", { name: "Prontuário do paciente" });
  await tabs.getByRole("tab", { name: "Odontograma" }).click();
  await expect(tabs.getByRole("tab", { name: "Odontograma" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("marca uma consulta na agenda", async ({ page }) => {
  await page.goto("/agendamentos");
  await page.getByRole("button", { name: "Agendar Consulta" }).click();

  const dialog = page.getByRole("dialog", { name: "Nova consulta" });
  await dialog.getByLabel("Paciente").fill("Helena Duarte");
  await dialog.getByLabel("Procedimento").fill("Avaliação");
  await dialog.getByRole("button", { name: "Salvar consulta" }).click();

  await expect(dialog).toBeHidden();
  await expect(page.getByText("Helena Duarte")).toBeVisible();
});

test("o financeiro troca o período, lança uma transação e exporta o relatório", async ({
  page,
}) => {
  await page.goto("/financeiro");
  await expect(page.getByText("R$ 32.450,00")).toBeVisible();

  await page.getByRole("button", { name: "Mês Passado" }).click();
  await expect(page.getByText("R$ 28.120,00")).toBeVisible();

  await page.getByRole("button", { name: "Adicionar Transação" }).click();
  const dialog = page.getByRole("dialog", { name: "Nova transação" });
  await dialog.getByLabel("Descrição").fill("Consulta particular");
  await dialog.getByLabel("Valor").fill("187,65");
  await dialog.getByRole("button", { name: "Adicionar" }).click();

  await expect(dialog).toBeHidden();
  const row = page.getByRole("row", { name: /Consulta particular/ });
  await expect(row).toBeVisible();
  await expect(row).toContainText("+ R$ 187,65");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar Relatório" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("smile-sync-financeiro.csv");
});
