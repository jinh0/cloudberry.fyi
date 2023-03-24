import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()
  console.log('connected')

  await prisma.course.create({
    data: {
      code: 'COMP-330',
      title: 'Theory of Computation',
      year: 2022,
      terms: [
        {
          term: 'fall',
          instructors: ['Prakash Panagaden'],
        },
      ],
      description:
        'Finite automata, regular languages, context-free languages, push-down automata, models of computation, computability theory, undecidability, reduction techniques.',
      faculty: 'Science',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async e => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
