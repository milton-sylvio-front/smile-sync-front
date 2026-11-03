import type {
  DashboardContent,
  FinancialPoint,
} from '@/modules/dashboard/types/dashboard'

const year: FinancialPoint[] = [
  { label: 'Jan', expenses: 7000, revenue: 13200 },
  { label: 'Fev', expenses: 8200, revenue: 15200 },
  { label: 'Mar', expenses: 8600, revenue: 14600 },
  { label: 'Abr', expenses: 9100, revenue: 17100 },
  { label: 'Mai', expenses: 11000, revenue: 20200 },
  { label: 'Jun', expenses: 10200, revenue: 21100 },
  { label: 'Jul', expenses: 12100, revenue: 20000 },
  { label: 'Ago', expenses: 13200, revenue: 23100 },
  { label: 'Set', expenses: 12400, revenue: 22300 },
  { label: 'Out', expenses: 14100, revenue: 25400 },
  { label: 'Nov', expenses: 16300, revenue: 27600 },
  { label: 'Dez', expenses: 17600, revenue: 30000 },
]

export const dashboardContent: DashboardContent = {
  metrics: [
    {
      id: 'appointments-today',
      label: 'Consultas Hoje',
      value: '18',
      trend: '+12%',
      trendTone: 'positive',
      icon: 'calendar',
      tone: 'blue',
    },
    {
      id: 'weekly-revenue',
      label: 'Receita Semanal',
      value: 'R$ 4.250',
      trend: '+8%',
      trendTone: 'positive',
      icon: 'revenue',
      tone: 'green',
    },
    {
      id: 'ai-reactivations',
      label: 'Reativações por IA',
      value: '24',
      trend: '5 pendentes',
      trendTone: 'warning',
      icon: 'reactivation',
      tone: 'orange',
    },
    {
      id: 'new-patients',
      label: 'Novos Pacientes',
      value: '1.204',
      trend: '+4',
      trendTone: 'positive',
      icon: 'patients',
      tone: 'purple',
    },
  ],
  financial: {
    title: 'Saúde Financeira',
    description: 'Acompanhamento mensal de receitas vs despesas',
    periods: [
      { id: '6m', label: '6 Meses' },
      { id: '1y', label: '1 Ano' },
    ],
    defaultPeriod: '1y',
    series: {
      '6m': year.slice(6),
      '1y': year,
    },
    expensesLabel: 'Despesas',
    revenueLabel: 'Receita',
  },
  appointments: {
    title: 'Próximas Consultas',
    items: [
      {
        id: 'michael-chen',
        time: '10:30',
        period: 'AM',
        patient: 'Michael Chen',
        procedure: 'Retorno Canal',
        status: 'done',
        statusLabel: 'Concluída',
      },
      {
        id: 'sarah-johnson',
        time: '11:45',
        period: 'AM',
        patient: 'Sarah Johnson',
        procedure: 'Limpeza de Rotina',
        status: 'scheduled',
        statusLabel: 'Agendada',
      },
      {
        id: 'robert-brown',
        time: '02:15',
        period: 'PM',
        patient: 'Robert Brown',
        procedure: 'Consulta Inicial',
        status: 'new',
        statusLabel: 'Paciente novo',
      },
    ],
    action: {
      label: 'Ver Agenda Completa',
      href: '/agendamentos',
    },
  },
  insight: {
    title: 'Inteligência SmileSync IA',
    description:
      'Identificamos 12 pacientes que não visitam a clínica há mais de 6 meses. Ative nossa sequência de reativação por IA agora para preencher horários vazios na próxima semana.',
    action: {
      label: 'Revisar Pacientes',
      href: '/reativacao',
    },
  },
}
