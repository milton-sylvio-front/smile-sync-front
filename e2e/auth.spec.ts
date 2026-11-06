import { expect, test } from "@playwright/test";
import { login } from "./support";

test("o login só segue com e-mail e senha válidos", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByText("Informe o endereço de e-mail.")).toBeVisible();
  await expect(page.getByText("Informe a senha.")).toBeVisible();

  await page.getByLabel("Endereço de E-mail").fill("doutor");
  await page.getByLabel("Senha").fill("senha-segura");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
  await expect(page).toHaveURL(/\/entrar$/);

  await login(page);
});

test("a recuperação de senha confirma o envio do link", async ({ page }) => {
  await page.goto("/entrar");
  await page.getByRole("link", { name: "Esqueceu a senha?" }).click();
  await expect(page).toHaveURL(/\/recuperar-senha$/);

  await page.getByRole("button", { name: "Enviar Link de Redefinição" }).click();
  await expect(page.getByText("Informe o endereço de e-mail.")).toBeVisible();

  await page.getByLabel("Endereço de E-mail").fill("doutor.silva@exemplo.com");
  await page.getByRole("button", { name: "Enviar Link de Redefinição" }).click();
  await expect(page.getByRole("status")).toContainText(
    "enviaremos um link para redefinir a senha",
  );

  await page.getByRole("link", { name: "Voltar para o login" }).click();
  await expect(page).toHaveURL(/\/entrar$/);
});

test("o cadastro exige os dados da clínica e volta para o login", async ({ page }) => {
  await page.goto("/cadastre-se");
  await page.getByRole("button", { name: "Criar Conta" }).click();
  await expect(page.getByText("Informe o nome completo.")).toBeVisible();
  await expect(page.getByText("Aceite os termos para criar a conta.")).toBeVisible();

  await page.getByRole("link", { name: "Faça login agora" }).click();
  await expect(page).toHaveURL(/\/entrar$/);
});
