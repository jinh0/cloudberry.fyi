import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const GoBack = () => {
  const router = useRouter()
  const goBack = () => {
    router.push('/')
  }

  return (
    <button
      className='flex flex-row items-center text-gray-600 mb-6 text-sm'
      onClick={goBack}
    >
      <div className='mr-2'>
        <ArrowLeftIcon className='w-5 h-5' />
      </div>
      <p>Go Back</p>
    </button>
  )
}

export default GoBack
