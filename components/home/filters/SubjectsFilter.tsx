import { useContext } from 'react'
import SubjectsInput from './SubjectsInput'
import SelectedSubjects from './SelectedSubjects'
import SearchContext from '@contexts/SearchContext'

const SubjectsFilter = () => {
  const search = useContext(SearchContext)

  return (
    <>
      <SubjectsInput {...search} />
      <SelectedSubjects {...search} />
    </>
  )
}

export default SubjectsFilter
