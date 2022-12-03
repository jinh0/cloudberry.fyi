import { useContext, useEffect, useState } from 'react'
import subjectsData, { Subject } from '@utils/subjects'
import SubjectsInput from './SubjectsInput'
import SelectedSubjects from './SelectedSubjects'
import SearchContext from '@contexts/SearchContext'

const SubjectsFilter = () => {
  const { subjects, setSubjects } = useContext(SearchContext)

  return (
    <div className='flex flex-row flex-wrap gap-y-2'>
      <SubjectsInput subjects={subjects} setSubjects={setSubjects} />
      <SelectedSubjects subjects={subjects} setSubjects={setSubjects} />
    </div>
  )
}

export default SubjectsFilter
