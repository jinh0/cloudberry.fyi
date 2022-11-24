import { Ok, VSBType } from '@typing'
import { fstat } from 'fs'
import { get } from 'http'
import { type } from 'os'
import { getCourse } from '../utils/vsbScraper'
const fs = require('fs')

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getVSBInfo = async () => {
  const data = require('./output-coursetitles.json')
  const codes = Object.keys(data)

  let courseVSBInfo = []

  // Loop through all courses and get relevant data
  for (let i = 0; i < codes.length; i++) {
    let code = codes[i]

    let courseInfo = await getCourse(code)

    let courseData = {
      code: '',
      type: '',
      section: '',
      location: '',
      schedule: [],
    }

    if (courseInfo.isOk) {
      courseData.code = courseInfo.result.code
      courseData.type = courseInfo.result.type
      courseData.section = courseInfo.result.section
      courseData.location = courseInfo.result.location
      courseData.schedule = courseInfo.result.schedule
      courseVSBInfo.push(courseData)
    } else {
      console.log('error', code)
    }

    await sleep(100)

    // console.log(courseData)

    if (i % 100 == 0) {
      fs.writeFileSync(
        'output-vsbinfo.json',
        JSON.stringify(courseVSBInfo, null, 2)
      )
    }
  }

  // courseVSBInfo is our list
  fs.writeFileSync(
    'output-vsbinfo.json',
    JSON.stringify(courseVSBInfo, null, 2)
  )
}

getVSBInfo()
