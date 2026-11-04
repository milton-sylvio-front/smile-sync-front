import type { InternalContent } from '@/modules/internal/types/internal'

export const internalContent: InternalContent = {
  brandName: 'SmileSync',
  navigation: [
    {
      label: 'Painel',
      href: '/painel',
      icon: 'panel',
      title: 'Visão Geral do Painel',
      description: 'Bem-vinda de volta, Dra. Joana Silva',
    },
    {
      label: 'Agendamentos',
      href: '/agendamentos',
      icon: 'calendar',
      title: 'Agenda e Marcações',
      description: 'Consultas da semana, lembretes e encaixes',
    },
    {
      label: 'Pacientes',
      href: '/pacientes',
      icon: 'patients',
      title: 'Gestão de Pacientes',
      description: 'Prontuários e cadastros da clínica',
    },
    {
      label: 'Financeiro',
      href: '/financeiro',
      icon: 'finance',
      title: 'Gestão Financeira',
      description: 'Acompanhe a lucratividade e o fluxo de caixa da sua clínica',
    },
    {
      label: 'Reativação com IA',
      href: '/reativacao',
      icon: 'reactivation',
      title: 'Reativação de Pacientes SmileSync IA',
      description: 'Converta registros inativos em novas consultas automaticamente',
    },
  ],
  user: {
    name: 'Dra. Joana Silva',
    role: 'Diretora Clínica',
    initials: 'JS',
  },
  plan: {
    name: 'Plano IA Clínica',
    badge: 'PRO',
    usedPercent: 75,
    usageLabel: '75% do armazenamento utilizado',
  },
  logout: {
    label: 'Sair',
    href: '/entrar',
  },
  notifications: {
    label: 'Notificações',
    items: [
      {
        id: 'pending-reactivation',
        title: '5 reativações pendentes',
        description: 'A sequência de IA aguarda a sua revisão.',
      },
    ],
  },
}
