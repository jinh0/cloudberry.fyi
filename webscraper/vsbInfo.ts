import { getCourse } from '../utils/vsbScraper'
import fs from 'fs'

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getVSBInfo = async () => {
  const data = require('./output-coursetitles.json')
  const codes = Object.keys(data)

  let courses = []

  // Loop through all courses and get relevant data
  for (let i = 0; i < codes.length; i++) {
    let code = codes[i]
    let course = await getCourse(code)

    if (course.isOk) {
      console.log(code, ' fetched')
      courses.push(course.result)
    }

    // Save every 100 courses
    if (i % 100 == 0) {
      fs.writeFileSync('output-vsbinfo.json', JSON.stringify(courses, null, 2))
    }

    await sleep(100)
  }

  fs.writeFileSync('output-vsbinfo.json', JSON.stringify(courses, null, 2))
}

getVSBInfo()
