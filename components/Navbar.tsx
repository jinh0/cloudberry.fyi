import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowRightIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { getAuth } from 'firebase/auth'
import app from '@utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const NavItem = ({
  title,
  href,
  active,
}: {
  title: string
  href: string
  active?: boolean
}) => {
  return (
    <Link href={href}>
      <div
        className={
          'first:pl-0 text-base lg:text-lg font-medium px-4 lg:px-6 cursor-pointer py-2 hover:text-black transition duration-200 rounded-full ' +
          (active ? 'text-black' : 'text-slate-600')
        }
      >
        {title}
      </div>
    </Link>
  )
}

const Navbar = () => {
  const { pathname } = useRouter()
  const auth = getAuth(app)
  const [user, loading] = useAuthState(auth)

  const path = pathname.split('/')

  return (
    <div className='flex flex-row sticky top-0 z-50 bg-white bg-opacity-60 backdrop-blur-md w-full px-6 lg:px-20 py-3 border-b items-center select-none justify-between truncate transition-all'>
      <div className='flex flex-row items-center'>
        <Link href='/'>
          <div className='flex flex-row items-center cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-8 h-8 text-mcgill mr-4 lg:mr-2'
            >
              <path d='M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z' />
              <path d='M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z' />
              <path d='M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z' />
            </svg>

            <p className='hidden lg:inline-block text-xl font-bold text-mcgill pr-4 border-r mr-4'>
              CloudBerry
            </p>
          </div>
        </Link>

        <div className='hidden md:flex md:flex-row md:items-center'>
          <NavItem
            title='Course Search'
            href='/'
            active={pathname === '/' || path[1] === 'courses'}
          />
          {/* <NavItem
          title='My Courses'
          href='/my-courses'
          active={pathname === '/my-courses'}
        /> */}
          <NavItem
            title='Schedule Builder'
            href='/schedule'
            active={pathname === '/schedule'}
          />
          <NavItem
            title='My Degree'
            href='/my-degree'
            active={pathname === '/my-degree'}
          />
        </div>
      </div>

      <div className='w-fit flex flex-row items-center'>
        {loading ? (
          <></>
        ) : user ? (
          <Link href='/user'>
            <div>
              <UserCircleIcon className='w-8 h-8' />
            </div>
          </Link>
        ) : (
          <Link href='/signin'>
            <div className='flex flex-row items-center'>
              <div className='font-medium rounded-full cursor-pointer bg-yellow-100 hover:bg-yellow-200 transition px-6 py-2 text-yellow-700 flex flex-row items-center'>
                <ArrowRightIcon className='w-5 h-5 mr-4' />
                <p>Sign in with McGill</p>
              </div>
            </div>
          </Link>
        )}

        {/* {auth.currentUser && <div className="ml-4">Sign out</div>} */}
      </div>
    </div>
  )
}

export default Navbar
