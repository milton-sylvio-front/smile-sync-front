'use client'

import { AppointmentDialog } from '@/modules/schedule/components/AppointmentDialog'
import { ScheduleCalendar } from '@/modules/schedule/components/ScheduleCalendar'
import { ScheduleSidebar } from '@/modules/schedule/components/ScheduleSidebar'
import { useSchedule } from '@/modules/schedule/state/ScheduleProvider'

export function SchedulePage() {
  const { composerOpen } = useSchedule()

  return (
    <>
      <div className='grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_320px]'>
        <ScheduleCalendar />
        <ScheduleSidebar />
      </div>
      {composerOpen ? <AppointmentDialog /> : null}
    </>
  )
}
