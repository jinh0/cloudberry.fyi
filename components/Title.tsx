import { Children } from '@typing'

/**
 * Generic title component
 */
const Title = ({ children }: { children: Children }) => {
  return (
    <div>
      <div className='text-2xl md:text-4xl font-semibold mt-4 mb-4 flex flex-row items-center'>
        {children}
      </div>
    </div>
  )
}

export default Title
