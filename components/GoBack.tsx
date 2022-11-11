import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const GoBack = () => {
  const router = useRouter()
  const goBack = () => router.back()

  return (
    <button
      className="flex flex-row items-center text-gray-600 mt-4"
      onClick={goBack}
    >
      <div className="mr-2">
        <ArrowLeftIcon className="w-5 h-5" />
      </div>
      <p>Go Back</p>
    </button>
  )
}

export default GoBack
