import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { financeContent } from '@/mocks/finance'
import { internalContent } from '@/mocks/internal'
import { newPatientContent, patientsContent } from '@/mocks/patients'
import { scheduleContent } from '@/mocks/schedule'
import { RequireSession, SessionPending } from '@/modules/auth/components/RequireSession'
import { accessTokenStorageKey } from '@/modules/auth/session'
import { FinanceProvider } from '@/modules/finance/state/FinanceProvider'
import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'
import { PatientsProvider } from '@/modules/patients/state/PatientsProvider'
import { ScheduleProvider } from '@/modules/schedule/state/ScheduleProvider'

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PatientsProvider content={patientsContent} formContent={newPatientContent}>
      <ScheduleProvider content={scheduleContent}>
        <FinanceProvider content={financeContent}>
          <Suspense fallback={<SessionPending>{children}</SessionPending>}>
            <AuthenticatedInternalLayout>{children}</AuthenticatedInternalLayout>
          </Suspense>
        </FinanceProvider>
      </ScheduleProvider>
    </PatientsProvider>
  )
}

async function AuthenticatedInternalLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(accessTokenStorageKey)?.value

  return (
    <RequireSession token={token ?? null}>
      <InternalTemplate content={internalContent}>{children}</InternalTemplate>
    </RequireSession>
  )
}
