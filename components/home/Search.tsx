// Honestly, this is a little useless right now, but
// as the filters get more complicated, it might be more helpful?

import Filters from './Filters'
import SearchBar from './SearchBar'

const Search = () => {
  return (
    <div>
      <SearchBar />
      <Filters />
    </div>
  )
}

export default Search
