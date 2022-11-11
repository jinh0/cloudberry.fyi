import { ChevronDownIcon } from '@heroicons/react/24/outline'

const Filter = ({ name }: { name: string }) => {
  return (
    <button className="px-3 py-1 rounded-full mr-2 border flex flex-row text-gray-700">
      <p>{name}</p>
      <ChevronDownIcon className="w-6 h-6 ml-2" />
    </button>
  )
}

const Filters = () => {
  return (
    <div className="flex flex-row">
      <Filter name="Subject" />
      <Filter name="Semester" />
    </div>
  )
}

export default Filters
