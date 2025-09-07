import { cn } from '@/shared/utils'
import React from 'react'

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'primary'
  | 'secondary'
  | 'large'
  | 'muted'
  | 'inline'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant
  children: React.ReactNode
  className?: string
}

const variantComponents: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  primary: 'p',
  secondary: 'p',
  large: 'div',
  muted: 'p',
  inline: 'code',
}

const variantClassNames: Record<TypographyVariant, string> = {
  h1: 'scroll-m-0 text-4xl font-extrabold tracking-tight text-balance',
  h2: 'scroll-m-0 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-0 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-0 text-xl font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  primary: 'text text-m text-shadow-neutral-800',
  secondary: 'text text-sm text-shadow-neutral-600',
  large: 'text-lg font-semibold',
  muted: 'text-muted-foreground text-sm',
  inline:
    'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant, children, className, ...props }, ref) => {
    const TypographyWrapper = variantComponents[variant]
    const baseClassName = variantClassNames[variant]

    return (
      <TypographyWrapper
        className={cn(baseClassName, className)}
        ref={ref}
        {...props}
      >
        {children}
      </TypographyWrapper>
    )
  }
)

Typography.displayName = 'Typography'
