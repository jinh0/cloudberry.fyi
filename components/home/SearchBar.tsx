import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import useSearchInput from '@hooks/useSearchInput'

const SearchBar = () => {
  const { input, setInput, onSubmit } = useSearchInput()

  return (
    <form
      className='mb-2 text-xl md:text-3xl py-2 flex flex-row items-center text-gray-600'
      onSubmit={onSubmit}
    >
      <MagnifyingGlassIcon className='w-6 h-6 mr-2 text-gray-400' />
      <input
        value={input}
        onChange={evt => setInput(evt.target.value)}
        className='outline-none w-full px-2 text-black'
        placeholder='Search for a course...'
        autoFocus
        autoCorrect='off'
      />
    </form>
  )
}

export default SearchBar
