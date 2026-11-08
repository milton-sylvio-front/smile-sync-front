# SmileSync

Frontend do SmileSync, sistema de gestão para clínicas odontológicas. A interface cobre a landing pública e a área da clínica: painel, agenda, pacientes, financeiro e reativação de pacientes.

Produção: [https://smile-sync-front.vercel.app/](https://smile-sync-front.vercel.app/)

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) e React 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/docs) 4
- Jest e Testing Library
- [Playwright](https://playwright.dev) para testes de ponta a ponta
- [Storybook](https://storybook.js.org) 10 (`@storybook/nextjs-vite`), com documentação, acessibilidade e testes das stories
- Gerenciador de pacotes: npm (`package-lock.json`)

O `next.config.ts` liga `cacheComponents` e `partialPrefetching`. Não há variáveis de ambiente obrigatórias: os textos e os dados de tela vêm de `src/mocks`.

## Começar

Requer Node.js 20.9 ou superior (use Node.js 24 com `nvm use`).

```bash
nvm use
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm test` | Testes de componente (Jest) |
| `npm run test:watch` | Testes de componente em modo watch |
| `npm run test:e2e` | Testes de ponta a ponta (Playwright, Chromium). Sobe o `next dev` em `127.0.0.1:3000` se a porta estiver livre |

Na primeira execução, instale o navegador com `npx playwright install chromium`. No Linux, o Chromium também precisa das bibliotecas do sistema: `npx playwright install-deps chromium`.
| `npm run storybook` | Catálogo de componentes em [http://localhost:6006](http://localhost:6006) |
| `npm run build-storybook` | Build estático do catálogo em `storybook-static` |

## Rotas

Públicas:

| Rota | Tela |
| --- | --- |
| `/` | Landing |
| `/home` | Redireciona para `/` |
| `/entrar` | Login |
| `/cadastre-se` | Cadastro |
| `/recuperar-senha` | Recuperação de senha |
| `/relatorios` | Estado vazio (sem dados) |
| `/componentes/skeleton` | Vitrine do componente de skeleton |

Área interna, com menu lateral em `src/app/(interno)/layout.tsx`:

| Rota | Tela |
| --- | --- |
| `/painel` | Visão geral da clínica |
| `/agendamentos` | Agenda (dia, semana e mês) e lembretes |
| `/pacientes` | Lista e prontuário |
| `/pacientes/novo` | Cadastro de paciente |
| `/pacientes/[id]/editar` | Edição de paciente |
| `/financeiro` | Receitas, despesas e fluxo de caixa |
| `/reativacao` | Reativação de pacientes inativos |

O login só valida o formato do e-mail e da senha e, em seguida, navega para `/painel`. Não existe sessão nem API de autenticação.

## Organização

O alias `@/*` aponta para `src/*`.

```text
src/
  app/            rotas do App Router
  modules/        uma pasta por funcionalidade
  components/     UI compartilhada (botão, logotipo, skeleton, estado vazio)
  mocks/          conteúdo e dados de demonstração
```

Cada módulo segue, quando faz sentido, `components`, `containers`, `state`, `types` e `lib`. A página em `src/app` só importa o container e o mock correspondente.

Pacientes, agenda e financeiro guardam as alterações em estado de cliente (`PatientsProvider`, `ScheduleProvider` e `FinanceProvider`), montados no layout interno. Esse estado vive na memória da aba: um recarregamento volta aos dados de `src/mocks`.

## Interface

Idioma da interface: `pt-BR`. Fonte: Montserrat, carregada em `src/app/layout.tsx`.

Tokens em `tailwind.config.js`: `primary` `#004953`, `secondary` `#F9F07E`, `ink` `#06343b`, além de `muted`, `surface`, `cream` e `footer`.

## Storybook

As stories ficam em `src/stories` e cobrem a identidade visual, os componentes compartilhados (`Button`, `Logotype`, `EmptyData`, `Skeleton`) e as telas públicas e internas. As telas da clínica usam o mesmo menu e os mesmos providers do layout `(interno)`.

```bash
npm run storybook
```
