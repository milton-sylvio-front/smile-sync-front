import type { ReactNode } from 'react'

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

type TooltipProps = {
  id: string
  open?: boolean
  position?: TooltipPosition
  children: ReactNode
  content: ReactNode
}

const positionClasses: Record<TooltipPosition, { panel: string; arrow: string }> = {
  top: {
    panel: 'bottom-full right-0 mb-2',
    arrow: '-bottom-1 right-2',
  },
  right: {
    panel: 'left-full top-1/2 ml-2 -translate-y-1/2',
    arrow: 'top-1/2 -left-1 -translate-y-1/2',
  },
  bottom: {
    panel: 'top-full right-0 mt-2',
    arrow: '-top-1 right-2',
  },
  left: {
    panel: 'right-full top-1/2 mr-2 -translate-y-1/2',
    arrow: 'top-1/2 -right-1 -translate-y-1/2',
  },
}

export function Tooltip({
  id,
  open = false,
  position = 'top',
  children,
  content,
}: TooltipProps) {
  const placement = positionClasses[position]

  return (
    <div className='group relative'>
      {children}
      <div
        id={id}
        role='tooltip'
        className={`absolute z-10 w-56 rounded-md bg-primary px-3 py-2 text-xs leading-4 text-white shadow-lg transition-opacity ${placement.panel} ${
          open
            ? 'visible opacity-100'
            : 'invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'
        }`}
      >
        {content}
        <span
          aria-hidden='true'
          className={`absolute h-2 w-2 rotate-45 bg-primary ${placement.arrow}`}
        />
      </div>
    </div>
  )
}
