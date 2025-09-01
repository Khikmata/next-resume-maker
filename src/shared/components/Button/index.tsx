import { ComponentProps } from 'react'

export type ButtonColor = 'primary' | 'secondary'

interface ButtonProps extends ComponentProps<'button'> {
  color?: ButtonColor
  text?: string
}

const buttonColor: {
  [K in ButtonColor]: ComponentProps<'button'>['className']
} = {
  primary: 'bg-neutral-200 text-neutral-800  hover:bg-neutral-50',
  secondary: 'border border-neutral-700 hover:border-neutral-500',
}

export const Button = ({
  text,
  color = 'primary',
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${buttonColor[color]} duration-300  rounded-sm min-w-40 p-2 cursor-pointer ${className}`}
      {...rest}
    >
      {rest.children ?? text}
    </button>
  )
}
