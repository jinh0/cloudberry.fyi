import VSBContext from '@contexts/course/VSBContext'
import { useContext } from 'react'
import Block from './Block'

const Blocks = () => {
  const { course, comboNum } = useContext(VSBContext)

  return (
    <div>
      {course.blocks
        .filter(block => course.combos[comboNum].includes(block.crn))
        .map(block => (
          <Block code={course.code} block={block} key={block.crn} />
        ))}
    </div>
  )
}

export default Blocks
