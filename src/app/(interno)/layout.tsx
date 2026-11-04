import { internalContent } from '@/mocks/internal'
import { newPatientContent, patientsContent } from '@/mocks/patients'
import { scheduleContent } from '@/mocks/schedule'
import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'
import { PatientsProvider } from '@/modules/patients/state/PatientsProvider'
import { ScheduleProvider } from '@/modules/schedule/state/ScheduleProvider'

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PatientsProvider content={patientsContent} formContent={newPatientContent}>
      <ScheduleProvider content={scheduleContent}>
        <InternalTemplate content={internalContent}>{children}</InternalTemplate>
      </ScheduleProvider>
    </PatientsProvider>
  )
}
