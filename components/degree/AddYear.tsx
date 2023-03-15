import { PlusIcon } from '@heroicons/react/24/solid'
import Button from './Button'

const AddYear = () => {
  const addYear = () => {}

  return (
    <Button onClick={addYear} className='mt-8'>
      <div>
        <PlusIcon className='w-6 h-6' />
      </div>
      <div>Add a year</div>
    </Button>
  )
}

export default AddYear
