import NotOffered from '@components/NotOffered'
import Pill from '@components/Pill'
import { XCircleIcon } from '@heroicons/react/24/outline'

const LoadingCourse = () => {
  return (
    <div className='border-b py-6 text-lg group text-transparent select-none animate-pulse duration-100'>
      <div className='mb-4 flex flex-row items-center'>
        <h1 className='text-2xl cursor-pointer w-fit bg-gray-100 rounded-xl'>
          <span className='font-medium'>
            COMP 250: Intro to Computer Science
          </span>
        </h1>
      </div>

      <div className='mb-4'>
        <div className='flex flex-row text-base'>
          <Pill className='bg-gray-100'>
            <XCircleIcon className='w-5 h-5 mr-2' />
            Not Offered
          </Pill>
        </div>
      </div>
      <p className='mt-2 w-fit bg-gray-100 rounded-xl text-transparent'>
        Computer Science (Sci) : Mathematical tools (binary numbers, induction,
        recurrence relations, asymptotic complexity, establishing correctness of
        programs), Data structures (arrays, stacks, queues, linked lists, trees,
        binary trees, binary search trees, heaps, hash tables), Recursive and
        non-recursive algorithms (searching and sorting, tree and graph
        traversal). Abstract data types, inheritance. Selected topics.
      </p>
    </div>
  )
}

export default LoadingCourse
