import type { Metadata } from 'next'
import { SchedulePage } from '@/modules/schedule/containers/SchedulePage'

export const metadata: Metadata = {
  title: 'Agendamentos | SmileSync',
  description:
    'Agenda da clínica com consultas da semana, lembretes de WhatsApp e lista de espera.',
}

export default function Agendamentos() {
  return <SchedulePage />
}
