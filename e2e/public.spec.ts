import { expect, test } from "@playwright/test";

test("a página inicial apresenta a clínica e leva ao cadastro", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Modernize sua Clínica Odontológica com Inteligência.",
    }),
  ).toBeVisible();

  const nav = page.getByRole("navigation", { name: "Principal" });
  await nav.getByRole("link", { name: "Funcionalidades" }).click();
  await expect(page).toHaveURL(/#funcionalidades$/);
  await expect(
    page.getByRole("heading", { name: "Tudo o que sua Clínica Precisa" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Iniciar Teste Grátis" }).click();
  await expect(page).toHaveURL(/\/cadastre-se$/);
  await expect(
    page.getByRole("heading", { name: "Crie sua conta clínica" }),
  ).toBeVisible();
});

test("/home redireciona para a página inicial", async ({ page }) => {
  await page.goto("/home");
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole("heading", {
      name: "Modernize sua Clínica Odontológica com Inteligência.",
    }),
  ).toBeVisible();
});

test("um endereço inexistente mostra a página não encontrada", async ({ page }) => {
  await page.goto("/pagina-inexistente");
  await expect(
    page.getByRole("heading", { name: "Página não encontrada" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Voltar ao Início" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("relatórios mostra o estado vazio", async ({ page }) => {
  await page.goto("/relatorios");
  await expect(
    page.getByRole("heading", { name: "Nenhum dado encontrado" }),
  ).toBeVisible();
});
