import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { financeContent } from '@/mocks/finance'
import { internalContent } from '@/mocks/internal'
import { newPatientContent, patientsContent } from '@/mocks/patients'
import { scheduleContent } from '@/mocks/schedule'
import { RequireSession } from '@/modules/auth/components/RequireSession'
import { accessTokenStorageKey } from '@/modules/auth/session'
import { FinanceProvider } from '@/modules/finance/state/FinanceProvider'
import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'
import { PatientsProvider } from '@/modules/patients/state/PatientsProvider'
import { ScheduleProvider } from '@/modules/schedule/state/ScheduleProvider'

export default async function InternalLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(accessTokenStorageKey)?.value

  if (!token) {
    redirect('/entrar')
  }

  return (
    <RequireSession token={token}>
      <PatientsProvider content={patientsContent} formContent={newPatientContent}>
        <ScheduleProvider content={scheduleContent}>
          <FinanceProvider content={financeContent}>
            <InternalTemplate content={internalContent}>{children}</InternalTemplate>
          </FinanceProvider>
        </ScheduleProvider>
      </PatientsProvider>
    </RequireSession>
  )
}
