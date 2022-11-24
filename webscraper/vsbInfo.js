import { get } from 'http'
import { type } from 'os'
import { getCourse } from '../utils/vsb_scraper'


const getVSBInfo = async () => {
  const data = require('./output-coursetitles.json')

  const keys = Object.keys(data)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    // console.log(key)

    let courseInfo = await getCourse(key)
    // console.log(courseInfo)

    // data[key] = courseInfo


  }

 
  // getCourse(keys[0])

}

getVSBInfo()


