import type { HomeContent } from '@/modules/home/types/home'
import { globalContent } from '@/mocks/global'

export const homeContent: HomeContent = {
  brand: {
    name: 'SmileSync',
    description:
      'O ecossistema de gestão odontológica inteligente projetado para o dentista moderno.',
  },
  navigation: [
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Preços', href: '#precos' },
  ],
  login: { label: 'Entrar', href: '/entrar' },
  trial: { label: 'Teste Grátis', href: '/cadastre-se' },
  hero: {
    title: 'Modernize sua Clínica Odontológica com Inteligência.',
    description:
      'O sistema de gestão completo para profissionais da odontologia. Automatize agendamentos, digitalize prontuários e reative pacientes com ferramentas de IA.',
    primaryAction: { label: 'Iniciar Teste Grátis', href: '/cadastre-se' },
    secondaryAction: { label: 'Ver Demonstração', href: '#demonstracao' },
    trustLabel: 'Confiado por mais de 2.000 Clínicas',
    clinics: [
      { name: 'Ana Lima', initials: 'AL' },
      { name: 'Bruno Costa', initials: 'BC' },
      { name: 'Carla Dias', initials: 'CD' },
    ],
  },
  dashboard: {
    title: 'Desempenho da Clínica',
    badge: 'Ao vivo',
    metrics: [
      { label: 'Agendamentos', value: '128' },
      { label: 'Comparecimento', value: '92%' },
      { label: 'Receita', value: 'R$ 48 mil' },
    ],
    bars: [46, 62, 54, 78, 70, 88, 64],
    segments: [
      { label: 'Confirmadas', value: 62 },
      { label: 'Pendentes', value: 23 },
      { label: 'Faltas', value: 15 },
    ],
  },
  features: {
    id: 'funcionalidades',
    title: 'Tudo o que sua Clínica Precisa',
    subtitle: 'Otimize suas operações clínicas e administrativas.',
    items: [
      {
        id: 'whatsapp',
        icon: 'whatsapp',
        title: 'Automação de WhatsApp',
        description:
          'Lembretes de consulta automatizados via WhatsApp — grátis e sem limite de uso. Reduza faltas em 40%.',
      },
      {
        id: 'records',
        icon: 'records',
        title: 'Prontuários 100% Digitais',
        description:
          'Prontuários clínicos, histórico médico digital e assinatura eletrônica gratuitas. Sua clínica sem papel de forma fácil.',
      },
      {
        id: 'reactivation',
        icon: 'reactivation',
        title: 'Reativação de Pacientes com IA',
        description:
          'Mantenha os pacientes engajados e converta registros inativos em novas consultas automaticamente com a IA do SmileSync.',
      },
      {
        id: 'finance',
        icon: 'finance',
        title: 'Saúde Financeira',
        description:
          'Registre facilmente receitas e despesas e acompanhe sua saúde financeira em tempo real com uma gestão simplificada.',
      },
      {
        id: 'security',
        icon: 'security',
        title: 'Segurança de Nível Bancário',
        description:
          'Seus dados de pacientes são criptografados e com backup diário. Conformidade com a LGPD integrada.',
      },
      {
        id: 'support',
        icon: 'support',
        title: 'Suporte Dedicado',
        description:
          'Auxílio na implementação e suporte técnico 24/7 para garantir que sua clínica nunca pare de crescer.',
      },
    ],
  },
  solutions: {
    id: 'solucoes',
    stats: [
      { value: '98%', label: 'Satisfação dos Pacientes' },
      { value: '40%', label: 'Redução de Faltas' },
      { value: '15h+', label: 'Economizadas por Semana' },
      { value: 'Zero', label: 'Prontuários de Papel' },
    ],
  },
  pricing: {
    id: 'precos',
    trialId: 'teste',
    title: 'Pronto para transformar sua clínica?',
    description:
      'Junte-se a milhares de profissionais da odontologia que confiam no SmileSync para gerir seu futuro clínico e financeiro.',
    primaryAction: { label: 'Começar Agora', href: '/cadastre-se' },
    secondaryAction: { label: 'Agendar Demonstração', href: 'cadastre-se' },
    note: 'Sem necessidade de cartão de crédito. Teste grátis por 14 dias.',
  },
  footer: {
    columns: [
      {
        title: 'Produto',
        links: [
          { label: 'Funcionalidades', href: '#funcionalidades' },
          { label: 'Reativação com IA', href: '#funcionalidades' },
          { label: 'Financeiro', href: '#funcionalidades' },
          { label: 'Preços', href: '#precos' },
        ],
      },
      {
        title: 'Empresa',
        links: [
          { label: 'Sobre Nós', href: '#sobre' },
          { label: 'Carreiras', href: '#carreiras' },
          { label: 'Blog', href: '#blog' },
          { label: 'Política de Privacidade', href: '#privacidade' },
        ],
      },
      {
        title: 'Contato',
        links: [
          { label: 'Central de Ajuda', href: '#ajuda' },
          { label: 'Vendas', href: '#vendas' },
        ],
      },
    ],
    phone: { label: '+55 (11) 3030-4321', href: 'tel:+551130304321' },
    social: [
      { id: 'facebook', label: 'Facebook', href: '#facebook' },
      { id: 'instagram', label: 'Instagram', href: '#instagram' },
      { id: 'linkedin', label: 'LinkedIn', href: '#linkedin' },
    ],
    copyright: globalContent.copyright,
  },
}
