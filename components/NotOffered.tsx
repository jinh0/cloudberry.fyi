import { XCircleIcon } from '@heroicons/react/24/outline'
import Pill from './Pill'

const NotOffered = () => {
  return (
    <Pill className='bg-slate-100 text-slate-700'>
      <XCircleIcon className='w-5 h-5 mr-2' />
      Not Offered
    </Pill>
  )
}

export default NotOffered
