/**
 * @file vsb_scraper.ts: Scrapes VSB API for course data
 */

import prisma from '@db/client'
import { Safe, VSBBlock, VSBCourse } from '@typing'
import { JSDOM } from 'jsdom'

/**
 * Get course data from VSB
 */
export const getCourse = async (
  code: Uppercase<string>,
  term: string
): Promise<Safe<VSBCourse>> => {
  try {
    // 1. Fetch XML body from VSB API
    const response = await fetchVSB(code, term)

    // 2. Parse XML
    const parsedDoc = await parse(response)
    if (!parsedDoc) return { isOk: false }

    const { blocks, combos } = parsedDoc

    // 3. If nothing is wrong, return the parsed data
    return {
      isOk: true,
      result: {
        blocks: getUnique(blocks),
        code,
        combos,
        year: 2022,
        // TODO: FIX THIS
        semester: 'summer',
      },
    }
  } catch (error) {
    console.log('error', error)
    return { isOk: false }
  }
}

const fetchVSB = async (courseCode: string, term: string) => {
  // Weird time anti-bot thing VSB does
  const nWindow = () => {
    let f8b0 = ['\x26\x74\x3D', '\x26\x65\x3D']
    let t = Math.floor(new Date().getTime() / 60000) % 1000
    let e = (t % 3) + (t % 19) + (t % 42)
    return f8b0[0] + t + f8b0[1] + e
  }

  // Converts current time to milliseconds
  let currTime = new Date().getTime()

  // Produce the API URL
  let url = `https://vsb.mcgill.ca/vsb/getclassdata.jsp?term=${term}&course_1_0=${courseCode}&rq_1_0=null${nWindow()}&nouser=1&_=${currTime}`

  const response = await fetch(url, {
    headers: {
      'Accept-Encoding': '',
      'User-Agent':
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
    },
  })

  const text = await response.text()
  return text
}

const parse = async (
  response: string
): Promise<{ blocks: VSBBlock[]; combos: string[][] }> => {
  const dom = new JSDOM(response, { contentType: 'text/xml' })
  const doc = dom.window.document

  // If there exists at least one error, then early return not ok
  if (doc.querySelectorAll('error').length > 0) {
    console.log('Found error in VSB:', doc.querySelector('error').textContent)
    return null
  }

  // Parsing starts here:
  const uselections = Array.from(doc.querySelectorAll('uselection'))
  const parsed: Array<{ blocks: VSBBlock[]; combo: string[] }> =
    uselections.map(uselection => {
      const selection = uselection.querySelector('selection')
      const blocks = Array.from(selection.querySelectorAll('block'))

      const blockData: Array<VSBBlock & { timeblockids: string[] }> =
        blocks.map(block => ({
          type: block.getAttribute('type'),
          display: block.getAttribute('disp'),
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
        }))

      const combo = blockData.map(block => block.crn)

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

        // For some reason, sometimes there are time blocks that are never shown / used.
        if (matchingBlock)
          // Remove the ID of the timeblock before adding it into our block
          matchingBlock.schedule.push({
            day: formattedTime.day,
            t1: formattedTime.t1,
            t2: formattedTime.t2,
          })
      })

      // Add CRN combinations

      // Remove timeblockids from every block (since it's unnecessary data)
      // before returning them
      const finalBlocks = blockData.map(data => {
        const { timeblockids, ...block } = data
        return block
      })

      return { blocks: finalBlocks, combo }
    })

  return {
    blocks: parsed.flatMap(data => data.blocks),
    combos: parsed.map(data => data.combo),
  }
}

/**
 * Returns the unique blocks by CRN
 */
function getUnique(blocks: VSBBlock[]) {
  const uniqueBlocks: VSBBlock[] = []
  const crns = new Set()
  blocks.forEach(block => {
    if (!crns.has(block.crn)) {
      uniqueBlocks.push(block)
    }

    crns.add(block.crn)
  })

  return uniqueBlocks
}

async function main() {
  const x = [
    'ANAE-301',
    'DENT-320',
    'DENT-309',
    'DENT-323',
    'DENT-583',
    'FMED-301',
    'FMT4-013',
    'FMT4-018',
    'INDS-125J3',
    'INDS-122',
    'INDS-124J3',
    'INDS-125',
    'INDS-222',
    'INDS-224',
    'INDS-224J3',
    'INDS-300',
    'INDS-322',
    'INDS-323',
    'INDS-423J3',
    'INDS-423',
    'PAED-301',
    'PHAR-390',
    'PHAR-598',
  ]

  x.forEach(async (code: Uppercase<string>) => {
    const data = await getCourse(code, '202305')

    if (data.isOk) {
      console.log(data.result)
      await prisma.vsb.upsert({
        create: {
          ...data.result,
          year: 2022,
          semester: 'summer',
        },
        update: {
          ...data.result,
          year: 2022,
          semester: 'summer',
        },
        where: {
          code_year_semester: {
            code,
            year: 2022,
            semester: 'summer',
          },
        },
      })
    } else console.log('not found')
  })
}

// main()

export {}
