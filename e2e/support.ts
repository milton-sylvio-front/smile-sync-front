import { expect, type Page } from "@playwright/test";

const session = {
  accessToken: "access-token",
  user: {
    id: "user-id",
    clinicId: "clinic-id",
    name: "Dra. Ana Silva",
    email: "doutor.silva@exemplo.com",
    role: "OWNER",
  },
};

export async function mockAuth(page: Page) {
  await page.route("**/api/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(session),
    });
  });

  await page.route("**/api/auth/me", async (route) => {
    const authorization = route.request().headers().authorization;

    if (authorization !== `Bearer ${session.accessToken}`) {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Autenticação necessária." }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        userId: session.user.id,
        clinicId: session.user.clinicId,
        name: session.user.name,
        role: session.user.role,
      }),
    });
  });
}

export async function login(page: Page) {
  await mockAuth(page);
  await page.goto("/entrar");
  await page.getByLabel("Endereço de E-mail").fill("doutor.silva@exemplo.com");
  await page.getByLabel("Senha").fill("senha-segura");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(/\/painel$/);
  await expect(
    page.getByRole("heading", { name: "Visão Geral do Painel" }),
  ).toBeVisible();
}
