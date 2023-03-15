import AddYear from '@components/degree/AddYear'
import Margin from '@components/degree/Margin'
import Year from '@components/degree/Year'
import Main from '@components/Main'

const MyDegree = () => {
  return (
    <Main>
      <Year year={2022} />
      <Margin y={4} />
      <AddYear />
    </Main>
  )
}

export default MyDegree
