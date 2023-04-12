import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex flex-row items-center w-full -mt-16 h-16 px-6 lg:px-20 border-t bg-gray-50 text-gray-600 opacity-100 clear-both gap-6 transition'>
      <Link href='https://www.github.com/jinh0/cloudberry'>
        <div className='flex flex-row items-center hover:text-gray-800'>
          <FontAwesomeIcon icon={faGithub} className='w-5 h-5 mr-2' />
          GitHub
        </div>
      </Link>

      <Link href='/about'>
        <div className='flex flex-row items-center hover:text-gray-800'>
          <FontAwesomeIcon icon={faInfo} className='w-4 h-4 mr-2' />
          About
        </div>
      </Link>
    </footer>
  )
}

export default Footer
