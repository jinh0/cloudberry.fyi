import { Children } from '@typing'

interface Props {
  hasBorder?: boolean
  className?: string
  children?: Children
}

const Pill = ({ className, hasBorder = false, children }: Props) => {
  return (
    <div
      className={`flex flex-row w-fit items-center px-4 py-1 rounded-full mr-2 ${className} ${
        hasBorder ? 'border' : 'border-transparent'
      }`}
    >
      {children}
    </div>
  )
}

export default Pill
