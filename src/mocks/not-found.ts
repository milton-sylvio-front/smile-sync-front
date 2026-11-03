import type { NotFoundContent } from "@/modules/not-found/types/not-found";

export const notFoundContent: NotFoundContent = {
  title: "Página não encontrada",
  description:
    "Parece que a página que você está procurando foi removida, teve seu nome alterado ou está temporariamente indisponível.",
  home: { label: "Voltar ao Início", href: "/" },
  back: { label: "Voltar à Página Anterior" },
  support: { label: "SmileSync Suporte", href: "/#ajuda" },
  report: { label: "Relatar Problema", href: "/#relatar-problema" },
};
