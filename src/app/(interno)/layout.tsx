import { internalContent } from '@/mocks/internal'
import { newPatientContent, patientsContent } from '@/mocks/patients'
import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'
import { PatientsProvider } from '@/modules/patients/state/PatientsProvider'

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PatientsProvider content={patientsContent} formContent={newPatientContent}>
      <InternalTemplate content={internalContent}>{children}</InternalTemplate>
    </PatientsProvider>
  )
}
