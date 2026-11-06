import { expect, type Page } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("/entrar");
  await page.getByLabel("Endereço de E-mail").fill("doutor.silva@exemplo.com");
  await page.getByLabel("Senha").fill("senha-segura");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(/\/painel$/);
  await expect(
    page.getByRole("heading", { name: "Visão Geral do Painel" }),
  ).toBeVisible();
}
