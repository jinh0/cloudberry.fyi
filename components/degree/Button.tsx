import { ReactNode } from 'react'

const Button = ({
  onClick,
  className,
  children,
}: {
  onClick?: () => void
  className?: string
  children: ReactNode | ReactNode[]
}) => {
  return (
    <button
      onClick={onClick}
      className={
        'border border-dashed transition hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-xl flex flex-row justify-center items-center gap-x-2' +
        ' ' +
        className
      }
    >
      {children}
    </button>
  )
}

export default Button
