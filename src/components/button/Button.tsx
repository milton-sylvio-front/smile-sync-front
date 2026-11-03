import Link from 'next/link'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

type ButtonStyleProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsButton = ButtonStyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: never
    ref?: Ref<HTMLButtonElement>
  }

type ButtonAsAnchor = ButtonStyleProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'className' | 'children' | 'href'
  > & {
    href: string
    ref?: Ref<HTMLAnchorElement>
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary:
    'border border-slate-300 bg-white text-ink hover:border-primary hover:text-primary',
  outline: 'border-2 border-primary bg-white text-primary hover:bg-primary/5',
  ghost: 'bg-transparent text-primary hover:bg-primary/5',
  link: 'bg-transparent text-primary underline-offset-2 hover:underline',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 rounded-lg px-4 text-sm',
  md: 'rounded-lg px-5 py-3 text-sm',
  lg: 'h-12 rounded-lg px-5 text-sm',
  icon: 'h-11 w-11 rounded-lg p-0',
}

function isAnchor(props: ButtonProps): props is ButtonAsAnchor {
  return typeof props.href === 'string'
}

function isAppRoute(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: Pick<ButtonStyleProps, 'variant' | 'size' | 'fullWidth' | 'className'>) {
  const inline = variant === 'link'

  return [
    'inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    inline ? '' : sizes[size],
    !inline && fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

export function Button(props: ButtonProps) {
  if (isAnchor(props)) {
    const {
      href,
      variant,
      size,
      fullWidth,
      className,
      children,
      ref,
      ...rest
    } = props
    const classes = buttonClassName({ variant, size, fullWidth, className })

    if (isAppRoute(href)) {
      return (
        <Link ref={ref} href={href} className={classes} {...rest}>
          {children}
        </Link>
      )
    }

    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const {
    type = 'button',
    variant,
    size,
    fullWidth,
    className,
    children,
    ref,
    ...rest
  } = props

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...rest}
    >
      {children}
    </button>
  )
}
