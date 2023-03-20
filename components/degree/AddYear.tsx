import { PlusIcon } from '@heroicons/react/24/solid'
import { Select, Option } from '@mui/joy'
import { useState } from 'react'
import Button from './Button'

const AddYear = () => {
  const [opened, setOpened] = useState(false)

  if (!opened)
    return (
      <Button onClick={() => setOpened(true)} className='mt-8'>
        <div>
          <PlusIcon className='w-6 h-6' />
        </div>
        <div>Add a year</div>
      </Button>
    )

  return (
    <Select className='mt-8' placeholder='Select a year...' autoFocus={true}>
      <Option value={2021}>2021 - 2022</Option>
      <Option value={2020}>2020 - 2021</Option>
      <Option value={2019}>2019 - 2020</Option>
      <Option value={2018}>2018 - 2019</Option>
    </Select>
  )
}

export default AddYear
