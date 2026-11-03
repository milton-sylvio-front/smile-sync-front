import type { EmptyDataContent } from "@/components/empty-data/EmptyData";

export const emptyDataContent: EmptyDataContent = {
  title: "Nenhum dado encontrado",
  description:
    "Não encontramos registros para o período selecionado ou com os filtros aplicados. Tente ajustar seus filtros ou adicione novos dados para começar.",
  clearFiltersLabel: "Limpar Filtros",
  addRecord: {
    label: "Adicionar novo registro",
    href: "/relatorios/novo",
  },
  tip: "Dica: Relatórios de faturamento levam até 24h para serem atualizados após o pagamento.",
};
