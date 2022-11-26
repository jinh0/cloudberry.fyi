import { Children } from '@typing'

interface Props {
  className?: string
  children?: Children
}

const Pill = ({ className, children }: Props) => {
  return (
    <div
      className={`flex flex-row w-fit items-center px-4 py-1 rounded-full mr-2  ${className}`}
    >
      {children}
    </div>
  )
}

export default Pill
