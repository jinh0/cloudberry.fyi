/**
 * @file vsb_scraper.ts: Scrapes VSB API for course data
 */

import { Safe, VSBBlock, VSBCourse } from '@typing'
import { JSDOM } from 'jsdom'

// Weird time anti-bot thing VSB does
const nWindow = () => {
  let f8b0 = ['\x26\x74\x3D', '\x26\x65\x3D']
  let t = Math.floor(new Date().getTime() / 60000) % 1000
  let e = (t % 3) + (t % 19) + (t % 42)
  return f8b0[0] + t + f8b0[1] + e
}

/**
 * Get course data from VSB
 */
export const getCourse = async (
  courseCode: string
): Promise<Safe<VSBCourse>> => {
  // Converts current time to milliseconds
  let currTime = new Date().getTime()
  let term = 202301

  let url = `https://vsb.mcgill.ca/vsb/getclassdata.jsp?term=${term}&course_1_0=${courseCode}&rq_1_0=null${nWindow()}&nouser=1&_=${currTime}`

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Inr4tel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
    },
  })

  const text = await response.text()

  const dom = new JSDOM(text, { contentType: 'text/xml' })
  const doc = dom.window.document

  // If there exists at least one error, then early return not ok
  if (doc.querySelectorAll('error').length > 0) {
    return { isOk: false }
  }

  // Parsing starts here:
  const code = doc.querySelector('course').getAttribute('key')

  const uselections = Array.from(doc.querySelectorAll('uselection'))
  const parsedBlocks: VSBBlock[] = uselections.flatMap(uselection => {
    const selection = uselection.querySelector('selection')
    const blocks = Array.from(selection.querySelectorAll('block'))

    const blockData: Array<VSBBlock & { timeblockids: string[] }> = blocks.map(
      block => ({
        type: block.getAttribute('type'),
        teachers: block.getAttribute('teacher').split(';'),
        locations: block.getAttribute('location').split(';'),
        campus: block.getAttribute('campus'),
        section: block.getAttribute('secNo'),
        crn: block.getAttribute('key'),
        timeblockids: block.getAttribute('timeblockids').split(','),
        remainingSeats: Number(block.getAttribute('os')),
        waitlistRem: Number(block.getAttribute('ws')),
        waitlistCap: Number(block.getAttribute('wc')),
        schedule: [],
      })
    )

    // Fill in the schedule data
    const timeblocks = Array.from(uselection.querySelectorAll('timeblock'))

    timeblocks.forEach(timeblock => {
      const timeblockId = timeblock.getAttribute('id')

      const formattedTime = {
        id: timeblockId,
        day: timeblock.getAttribute('day'),
        t1: Number(timeblock.getAttribute('t1')),
        t2: Number(timeblock.getAttribute('t2')),
      }

      // Find the block for which this timeblock is a part of
      const matchingBlock = blockData.find(block =>
        block.timeblockids.includes(timeblockId)
      )

      // Remove the ID of the timeblock before adding it into our block
      matchingBlock.schedule.push({
        day: formattedTime.day,
        t1: formattedTime.t1,
        t2: formattedTime.t2,
      })
    })

    // Remove timeblockids from every block (since it's unnecessary data)
    // before returning them
    const finalBlocks = blockData.map(data => {
      const { timeblockids, ...block } = data
      return block
    })

    return finalBlocks
  })

  const uniqueBlocks: VSBBlock[] = []
  const crns = new Set()
  parsedBlocks.forEach(block => {
    if (!crns.has(block.crn)) {
      uniqueBlocks.push(block)
    }

    crns.add(block.crn)
  })

  const course = {
    code: code,
    blocks: uniqueBlocks,
  }

  return { isOk: true, result: course }
}

async function main() {
  const data = await getCourse('MATH-340')

  if (data.isOk) console.log(data.result)
  else console.log('not found')
}

main()

export {}
