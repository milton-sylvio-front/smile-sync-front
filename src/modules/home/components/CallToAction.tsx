import { Button } from '@/components/button/Button'
import type { HomeContent } from '@/modules/home/types/home'

type CallToActionProps = {
  pricing: HomeContent['pricing']
}

export function CallToAction({ pricing }: CallToActionProps) {
  return (
    <section
      id={pricing.id}
      className='bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24'
    >
      <div
        id={pricing.trialId}
        className='mx-auto max-w-4xl rounded-3xl bg-cream px-6 py-12 text-center sm:px-12 sm:py-16'
      >
        <h2 className='text-3xl font-bold tracking-tight text-primary sm:text-4xl'>
          {pricing.title}
        </h2>
        <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted'>
          {pricing.description}
        </p>
        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            href={pricing.primaryAction.href}
            className='w-full sm:w-auto'
          >
            {pricing.primaryAction.label}
          </Button>
          <Button
            href={pricing.secondaryAction.href}
            variant='secondary'
            className='w-full sm:w-auto'
          >
            {pricing.secondaryAction.label}
          </Button>
        </div>
        <p className='mt-5 text-xs text-muted'>{pricing.note}</p>
      </div>
    </section>
  )
}
