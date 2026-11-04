import type {
  ReactivationContent,
  ReactivationPatient,
  ReactivationPortrait,
} from '@/modules/reactivation/types/reactivation'

type RosterEntry = {
  name: string
  procedure: string
  revenue: number
  months: number
  visit?: string
  portrait?: ReactivationPortrait
}

const roster: RosterEntry[] = [
  {
    name: 'Amanda Wilson',
    procedure: 'Tratamento Periodontal',
    revenue: 450,
    months: 6,
    visit: '6 meses atrás',
    portrait: 'amanda',
  },
  {
    name: 'Jessica Taylor',
    procedure: 'Check-up Ouro',
    revenue: 180,
    months: 7,
    visit: '7 meses atrás',
    portrait: 'jessica',
  },
  {
    name: 'David Miller',
    procedure: 'Consulta de Implante',
    revenue: 1700,
    months: 14,
    visit: '1,2 anos atrás',
    portrait: 'david',
  },
  { name: 'Olivia Bennett', procedure: 'Limpeza de Rotina', revenue: 260, months: 8 },
  { name: 'Liam Carter', procedure: 'Clareamento', revenue: 890, months: 11 },
  { name: 'Emma Diaz', procedure: 'Avaliação Ortodôntica', revenue: 640, months: 9 },
  { name: 'Noah Evans', procedure: 'Restauração', revenue: 320, months: 15 },
  { name: 'Sophia Foster', procedure: 'Profilaxia', revenue: 210, months: 5 },
  { name: 'Lucas Garcia', procedure: 'Consulta de Implante', revenue: 980, months: 18 },
  { name: 'Mia Hayes', procedure: 'Check-up Ouro', revenue: 180, months: 10 },
  { name: 'Theo Ingram', procedure: 'Tratamento Periodontal', revenue: 520, months: 13 },
  { name: 'Helena Keller', procedure: 'Limpeza de Rotina', revenue: 240, months: 30 },
  { name: 'Arthur Lopez', procedure: 'Clareamento', revenue: 760, months: 16 },
  { name: 'Alice Murphy', procedure: 'Restauração', revenue: 340, months: 8 },
  { name: 'Miguel Nguyen', procedure: 'Profilaxia', revenue: 190, months: 12 },
  { name: 'Laura Owens', procedure: 'Avaliação Ortodôntica', revenue: 610, months: 20 },
  { name: 'Ben Parker', procedure: 'Consulta de Implante', revenue: 860, months: 22 },
  { name: 'Chloe Quinn', procedure: 'Check-up Ouro', revenue: 180, months: 6 },
  { name: 'Daniel Reed', procedure: 'Limpeza de Rotina', revenue: 250, months: 9 },
  { name: 'Sofia Scott', procedure: 'Tratamento Periodontal', revenue: 480, months: 17 },
  { name: 'Leo Turner', procedure: 'Clareamento', revenue: 720, months: 14 },
  { name: 'Maya Vargas', procedure: 'Restauração', revenue: 300, months: 7 },
  { name: 'Ethan Walsh', procedure: 'Profilaxia', revenue: 200, months: 11 },
  { name: 'Julia Young', procedure: 'Check-up Ouro', revenue: 180, months: 19 },
  { name: 'Pedro Silva', procedure: 'Consulta de Implante', revenue: 910, months: 24 },
  { name: 'Camila Costa', procedure: 'Limpeza de Rotina', revenue: 230, months: 8 },
  { name: 'Ryan Almeida', procedure: 'Clareamento', revenue: 680, months: 13 },
  { name: 'Nina Ribeiro', procedure: 'Avaliação Ortodôntica', revenue: 590, months: 10 },
  { name: 'Gabriel Gomes', procedure: 'Tratamento Periodontal', revenue: 510, months: 21 },
  { name: 'Lara Martins', procedure: 'Profilaxia', revenue: 210, months: 6 },
  { name: 'Enzo Barbosa', procedure: 'Restauração', revenue: 360, months: 15 },
  { name: 'Beatriz Rocha', procedure: 'Check-up Ouro', revenue: 180, months: 12 },
  { name: 'Hugo Dias', procedure: 'Consulta de Implante', revenue: 840, months: 27 },
  { name: 'Clara Nunes', procedure: 'Limpeza de Rotina', revenue: 240, months: 9 },
  { name: 'Samuel Melo', procedure: 'Clareamento', revenue: 700, months: 16 },
  { name: 'Valentina Castro', procedure: 'Avaliação Ortodôntica', revenue: 630, months: 18 },
  { name: 'Igor Araujo', procedure: 'Tratamento Periodontal', revenue: 470, months: 11 },
  { name: 'Alice Teixeira', procedure: 'Profilaxia', revenue: 190, months: 7 },
  { name: 'Caio Cardoso', procedure: 'Restauração', revenue: 330, months: 23 },
  { name: 'Helena Correia', procedure: 'Check-up Ouro', revenue: 180, months: 14 },
  { name: 'Samuel Pinto', procedure: 'Limpeza de Rotina', revenue: 220, months: 8 },
  { name: 'Marina Duarte', procedure: 'Consulta de Implante', revenue: 790, months: 26 },
]

function visitLabel(months: number) {
  if (months < 12) return `${months} meses atrás`
  const years = Math.round((months / 12) * 10) / 10
  const formatted = years.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
  return `${formatted} ${years === 1 ? 'ano' : 'anos'} atrás`
}

function currency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

function slug(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const patients: ReactivationPatient[] = roster.map((entry, index) => ({
  id: slug(entry.name),
  name: entry.name,
  lastVisit: entry.visit ?? visitLabel(entry.months),
  procedure: entry.procedure,
  revenue: entry.revenue,
  revenueLabel: currency(entry.revenue),
  monthsInactive: entry.months,
  priority: roster.length - index,
  portrait: entry.portrait,
  selected: true,
}))

export const reactivationContent: ReactivationContent = {
  engine: {
    label: 'Motor de IA Online',
  },
  hub: {
    title: 'Hub de Inteligência de Pacientes',
    leadPrefix: 'Analisamos',
    records: '1.204 registros de pacientes',
    leadMiddle: 'e identificamos',
    opportunities: '42 oportunidades de reativação',
    leadSuffix: 'para esta semana.',
    potentialLabel: 'Receita potencial',
    potentialValue: 'R$ 12.400',
    targetLabel: 'Pacientes alvo',
    targetValue: '42',
    previewTitle: 'Prévia da Mensagem IA',
    previewMessage:
      'Olá [Nome do Paciente]! Faz 6 meses desde sua última limpeza no SmileSync. A Dra. Joana notou que temos alguns horários disponíveis nesta terça. Gostaria de manter seu sorriso brilhando?',
    previewFootnote: 'Enviado via WhatsApp • Personalizado com base no histórico clínico',
    launchLabel: 'Lançar Sequência de IA Agora',
    launchedLabel: 'Sequência de IA em andamento',
    launchedMessage: 'Sequência enviada para {count} pacientes via WhatsApp.',
  },
  list: {
    title: 'Lista Prioritária de Reativação',
    sortLabel: 'Ordenar',
    sorts: [
      { id: 'potential', label: 'Maior Potencial' },
      { id: 'revenue', label: 'Maior Receita' },
      { id: 'inactivity', label: 'Mais tempo inativo' },
    ],
    defaultSort: 'potential',
    lastVisitPrefix: 'Última Visita:',
    revenueCaption: 'Receita est.',
    previewCount: 3,
    showAllLabel: 'Ver Todos os {count} Pacientes Inativos',
    showLessLabel: 'Mostrar apenas a prioridade',
  },
  patients,
  performance: {
    title: 'Performance da IA',
    conversionLabel: 'Taxa de conversão',
    conversionValue: '24%',
    scheduledLabel: 'Consultas agendadas',
    scheduledValue: '12',
    scheduledGoal: '/ meta de 50',
    scheduledPercent: 24,
    roiLabel: 'ROI Este Mês',
    roiValue: '8.4x',
  },
  tip: {
    title: 'Dica da IA',
    before: 'Pacientes têm',
    emphasis: '3x',
    after:
      'mais chances de agendar quando as mensagens são enviadas entre 10:30 e 11:30 às terças-feiras. Sua próxima campanha está otimizada para estes horários.',
  },
}
