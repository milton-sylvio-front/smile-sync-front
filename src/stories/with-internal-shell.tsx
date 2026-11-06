import type { Decorator } from '@storybook/nextjs-vite'
import { financeContent } from '@/mocks/finance'
import { internalContent } from '@/mocks/internal'
import { newPatientContent, patientsContent } from '@/mocks/patients'
import { scheduleContent } from '@/mocks/schedule'
import { FinanceProvider } from '@/modules/finance/state/FinanceProvider'
import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'
import { PatientsProvider } from '@/modules/patients/state/PatientsProvider'
import { ScheduleProvider } from '@/modules/schedule/state/ScheduleProvider'

export const withInternalShell: Decorator = (Story) => (
  <PatientsProvider content={patientsContent} formContent={newPatientContent}>
    <ScheduleProvider content={scheduleContent}>
      <FinanceProvider content={financeContent}>
        <InternalTemplate content={internalContent}>
          <Story />
        </InternalTemplate>
      </FinanceProvider>
    </ScheduleProvider>
  </PatientsProvider>
)

export function internalParameters(
  pathname: string,
  segments?: Array<string | [string, string]>,
) {
  return {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname,
        segments,
      },
    },
  }
}
