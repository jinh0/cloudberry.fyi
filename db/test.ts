import prisma from './client'

async function main() {
  const courses = await prisma.course.findMany({
    where: {
      year: 2022,
      terms: [],
      code: {
        startsWith: 'AGEC',
      },
    },
  })

  console.log(courses.length)
  console.log(courses.map(x => x.code))
}

main()
