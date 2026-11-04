'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { newPatientContent } from '@/mocks/patients'
import { PatientBreadcrumb } from '@/modules/patients/components/PatientBreadcrumb'
import { PatientsToolbar } from '@/modules/patients/components/PatientsToolbar'
import type {
  InternalContent,
  InternalIcon,
} from '@/modules/internal/types/internal'

type InternalTemplateProps = {
  content: InternalContent
  children: ReactNode
}

function ToothIcon() {
  return (
    <svg viewBox='0 0 640 640' aria-hidden='true' className='h-5 w-5'>
      <path
        fill='currentColor'
        d='M241 69.7L320 96L399 69.7C410.3 65.9 422 64 433.9 64C494.7 64 544 113.3 544 174.1L544 242.6C544 272 534.5 300.7 516.8 324.2L515.7 325.7C502.8 342.9 494.4 363.1 491.4 384.4L469.7 535.9C466.4 558.9 446.7 576 423.5 576C400.7 576 381.2 559.5 377.5 537L357.3 415.6C354.3 397.4 338.5 384 320 384C301.5 384 285.8 397.4 282.7 415.6L262.5 537C258.7 559.5 239.3 576 216.5 576C193.3 576 173.6 558.9 170.3 535.9L148.6 384.5C145.6 363.2 137.2 343 124.3 325.8L123.2 324.3C105.5 300.7 96 272.1 96 242.7L96 174.2C96 113.3 145.3 64 206.1 64C218 64 229.7 65.9 241 69.7z'
      />
    </svg>
  )
}

function NavIcon({ name }: { name: InternalIcon }) {
  const className = 'h-5 w-5'
  const common = {
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
  }

  if (name === 'panel') {
    return (
      <svg {...common}>
        <rect x='3.5' y='3.5' width='7' height='7' rx='1.5' />
        <rect x='13.5' y='3.5' width='7' height='7' rx='1.5' />
        <rect x='3.5' y='13.5' width='7' height='7' rx='1.5' />
        <rect x='13.5' y='13.5' width='7' height='7' rx='1.5' />
      </svg>
    )
  }

  if (name === 'calendar') {
    return (
      <svg {...common}>
        <rect x='3.5' y='5' width='17' height='15' rx='2' />
        <path strokeLinecap='round' d='M8 3.5v3M16 3.5v3M3.5 10h17' />
      </svg>
    )
  }

  if (name === 'patients') {
    return (
      <svg {...common}>
        <circle cx='9' cy='8.5' r='2.6' />
        <path strokeLinecap='round' d='M4.5 18.5c.6-2.8 2.4-4.2 4.5-4.2s3.9 1.4 4.5 4.2' />
        <circle cx='16.2' cy='9' r='2.1' />
        <path strokeLinecap='round' d='M15 14.4c1.6-.3 3.2.3 4.3 1.8.6.8.9 1.6 1 2.3' />
      </svg>
    )
  }

  if (name === 'finance') {
    return (
      <svg {...common}>
        <rect x='3.5' y='6' width='17' height='12' rx='2' />
        <path strokeLinecap='round' d='M3.5 10h17M7 14.5h4' />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 3.5 13.4 8l4.6.2-3.6 2.9 1.3 4.4L12 13.2 8.3 15.5 9.6 11 6 8.2 10.6 8 12 3.5Z'
      />
      <path strokeLinecap='round' d='M5 19.5h4M15 19.5h4' />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 9.2a6 6 0 1 1 12 0c0 4.2 1.4 5.6 2 6.8H4c.6-1.2 2-2.6 2-6.8Z'
      />
      <path strokeLinecap='round' d='M10 18.2a2 2 0 0 0 4 0' />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      {open ? (
        <path strokeLinecap='round' d='M6 6l12 12M18 6 6 18' />
      ) : (
        <path strokeLinecap='round' d='M4 7h16M4 12h16M4 17h16' />
      )}
    </svg>
  )
}

function SidebarToggleIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.7'
    >
      <rect x='3.5' y='4.5' width='17' height='15' rx='2' />
      <path d='M9 4.5v15' />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path strokeLinecap='round' d='M10 7V5.5A1.5 1.5 0 0 1 11.5 4h6A1.5 1.5 0 0 1 19 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 10 18.5V17' />
      <path strokeLinecap='round' strokeLinejoin='round' d='M13 12H4m0 0 2.5-2.5M4 12l2.5 2.5' />
    </svg>
  )
}

function UserAvatar({ initials }: { initials: string }) {
  return (
    <span className='relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#d5e4ea]'>
      <svg viewBox='0 0 80 80' aria-hidden='true' className='h-full w-full'>
        <circle cx='40' cy='40' r='40' fill='#e4eef2' />
        <path d='M14 74c3-18 12-28 26-28s23 10 26 28' fill='#12343c' />
        <circle cx='40' cy='34' r='13' fill='#f0cbbd' />
        <path
          d='M24 38c1-18 8-26 16-26 9 0 15 8 17 22-4 3-9 6-17 6s-13-2-16-2Z'
          fill='#2c2624'
        />
        <path d='M30 36c2 6 6 9 10 9s8-3 10-9' fill='#f0cbbd' />
      </svg>
      <span className='sr-only'>{initials}</span>
    </span>
  )
}

const iconButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export function InternalTemplate({ content, children }: InternalTemplateProps) {
  const pathname = usePathname() ?? ''
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const current =
    content.navigation.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    ) ?? content.navigation[0]
  const isPatientList = pathname === '/pacientes'
  const isNewPatient = pathname === '/pacientes/novo'
  const isEditPatient = /^\/pacientes\/[^/]+\/editar$/.test(pathname)
  const patientHeader = isPatientList ? (
    <PatientsToolbar />
  ) : isNewPatient || isEditPatient ? (
    <PatientBreadcrumb
      items={isNewPatient ? newPatientContent.breadcrumb : newPatientContent.editBreadcrumb}
    />
  ) : null

  return (
    <div className='min-h-screen bg-[#f3f5f7] text-ink'>
      {mobileOpen ? (
        <button
          type='button'
          aria-label='Fechar menu'
          className='fixed inset-0 z-30 bg-ink/40 lg:hidden'
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div className='lg:flex'>
        <aside
          id='menu-interno'
          className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-[248px] shrink-0 flex-col overflow-hidden bg-primary text-white transition-transform lg:sticky lg:top-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          } ${collapsed ? 'lg:hidden' : 'lg:translate-x-0'}`}
        >
          <div className='px-5 pb-4 pt-6'>
            <Link
              href={content.navigation[0]?.href ?? '/painel'}
              className='inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary'
              onClick={() => setMobileOpen(false)}
            >
              <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary'>
                <ToothIcon />
              </span>
              <span className='text-xl font-bold tracking-tight text-white'>
                {content.brandName}
              </span>
            </Link>
          </div>

          <nav aria-label='Menu da clínica' className='min-h-0 flex-1 space-y-1 overflow-y-auto px-3'>
            {content.navigation.map((item) => {
              const active = item.href === current?.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                    active
                      ? 'bg-secondary font-semibold text-primary'
                      : 'text-white/85 hover:bg-white/10'
                  }`}
                >
                  <NavIcon name={item.icon} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className='shrink-0 px-3 pb-5'>
            <div className='rounded-xl bg-black/15 p-3.5'>
              <div className='flex items-center justify-between gap-2'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70'>
                  {content.plan.name}
                </p>
                <span className='rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-primary'>
                  {content.plan.badge}
                </span>
              </div>
              <div
                className='mt-3 h-1.5 overflow-hidden rounded-full bg-white/20'
                role='meter'
                aria-label={content.plan.usageLabel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={content.plan.usedPercent}
              >
                <span
                  className='block h-full rounded-full bg-secondary'
                  style={{ width: `${content.plan.usedPercent}%` }}
                />
              </div>
              <p className='mt-2 text-xs text-white/70'>{content.plan.usageLabel}</p>
            </div>

            <Link
              href={content.logout.href}
              className='mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'
            >
              <LogoutIcon />
              {content.logout.label}
            </Link>
          </div>
        </aside>

        <div className='flex min-w-0 flex-1 flex-col'>
          <header className='sticky top-0 z-20 flex items-center justify-between gap-4 bg-[#f3f5f7]/95 px-4 py-5 backdrop-blur sm:px-6 lg:px-8'>
            <div className='min-w-0 flex-1'>
              {patientHeader ?? (
                <>
                  <h1 className='truncate text-xl font-bold tracking-tight text-primary sm:text-2xl'>
                    {current?.title}
                  </h1>
                  {current?.description ? (
                    <p className='mt-0.5 truncate text-sm text-slate-500'>
                      {current.description}
                    </p>
                  ) : null}
                </>
              )}
            </div>

            <div className='flex shrink-0 items-center gap-2 sm:gap-3'>
              {isPatientList ? null : (
              <>
              <div className='relative'>
                <button
                  type='button'
                  className='relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                  aria-expanded={notificationsOpen}
                  aria-controls='painel-notificacoes'
                  onClick={() => setNotificationsOpen((open) => !open)}
                >
                  <span className='sr-only'>{content.notifications.label}</span>
                  <BellIcon />
                  {content.notifications.items.length > 0 ? (
                    <span className='absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#f3f5f7]' />
                  ) : null}
                </button>
                {notificationsOpen ? (
                  <div
                    id='painel-notificacoes'
                    className='absolute right-0 top-12 z-30 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)]'
                  >
                    <ul className='space-y-2'>
                      {content.notifications.items.map((item) => (
                        <li key={item.id} className='rounded-lg bg-surface px-3 py-2.5'>
                          <p className='text-sm font-semibold text-ink'>{item.title}</p>
                          <p className='mt-0.5 text-xs text-slate-500'>{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <span className='hidden h-8 w-px bg-slate-200 sm:block' aria-hidden='true' />

              <div className='hidden items-center gap-2.5 sm:flex'>
                <UserAvatar initials={content.user.initials} />
                <div className='leading-tight'>
                  <p className='text-sm font-semibold text-ink'>{content.user.name}</p>
                  <p className='text-xs text-slate-500'>{content.user.role}</p>
                </div>
              </div>
              </>
              )}

              <button
                type='button'
                className={`${iconButtonClass} lg:hidden`}
                aria-expanded={mobileOpen}
                aria-controls='menu-interno'
                onClick={() => setMobileOpen((open) => !open)}
              >
                <span className='sr-only'>{mobileOpen ? 'Fechar menu' : 'Abrir menu'}</span>
                <MenuIcon open={mobileOpen} />
              </button>
              <button
                type='button'
                className={`${iconButtonClass} hidden lg:inline-flex`}
                aria-expanded={!collapsed}
                aria-controls='menu-interno'
                onClick={() => setCollapsed((value) => !value)}
              >
                <span className='sr-only'>
                  {collapsed ? 'Expandir menu' : 'Recolher menu'}
                </span>
                <SidebarToggleIcon />
              </button>
            </div>
          </header>

          <div className='flex-1 px-4 pb-6 sm:px-6 lg:px-8'>{children}</div>
        </div>
      </div>
    </div>
  )
}
