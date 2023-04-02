import AddYear from '@components/degree/AddYear'
import Margin from '@components/degree/Margin'
import Year from '@components/degree/Year'
import Main from '@components/Main'
import LookupContext from '@contexts/LookupContext'
import useLookup from '@hooks/useLookup'
import useUser from '@hooks/useUser'

const MyDegree = () => {
  const { user } = useUser()
  const lookup = useLookup()

  if (!user) {
    return <Main>Loading...</Main>
  }

  return (
    <LookupContext.Provider value={lookup}>
      <Main>
        <Year year={2022} />
        <Margin y={4} />
        <AddYear />
      </Main>
    </LookupContext.Provider>
  )
}

export default MyDegree
