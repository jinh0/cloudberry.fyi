import Main from '@components/Main'
import { useRouter } from 'next/router'

const Course = () => {
  const router = useRouter()
  const { years, code } = router.query as { years: string; code: string }

  const year = Number(years?.split('-')[0])

  const format = (code: string) => code?.replace('-', ' ').toUpperCase()

  console.log(year, code)

  return <Main title={`${format(code)} | Cloudberry`}></Main>
}

export default Course
