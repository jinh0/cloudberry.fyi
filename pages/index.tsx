import CourseList from '@components/home/CourseList'
import Main from '@components/Main'
import Search from '@components/home/Search'
import Title from '@components/Title'
import SearchContext from '@contexts/SearchContext'
import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')

  return (
    <Main>
      <SearchContext.Provider value={{ query, setQuery }}>
        <Search />
        <CourseList />
      </SearchContext.Provider>
    </Main>
  )
}
