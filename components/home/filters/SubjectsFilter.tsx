import { useContext, useEffect, useState } from 'react'
import subjectsData, { Subject } from '@utils/subjects'
import SubjectsInput from './SubjectsInput'
import SelectedSubjects from './SelectedSubjects'
import SearchContext from '@contexts/SearchContext'

const SubjectsFilter = () => {
  const { subjects, setSubjects } = useContext(SearchContext)

  return (
    <>
      <SubjectsInput subjects={subjects} setSubjects={setSubjects} />
      <SelectedSubjects subjects={subjects} setSubjects={setSubjects} />
    </>
  )
}

export default SubjectsFilter
