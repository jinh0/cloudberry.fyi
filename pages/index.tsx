import CourseList from '@components/home/CourseList'
import Main from '@components/Main'
import Search from '@components/home/Search'
import Title from '@components/Title'

export default function Home() {
  return (
    <Main>
      <Search />
      <CourseList />
    </Main>
  )
}
