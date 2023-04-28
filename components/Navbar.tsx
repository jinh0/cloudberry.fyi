import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowRightIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { getAuth } from 'firebase/auth'
import app from '@utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import NavbarYears from './NavbarYears'

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
          'first:pl-0 text-base lg:text-lg font-medium px-4 lg:px-6 cursor-pointer py-2 hover:text-black transition duration-200 ' +
          (active ? 'text-black' : 'text-slate-600')
        }
      >
        {title}
      </div>
    </Link>
  )
}

const Navbar = ({ year }: { year: number }) => {
  const { pathname } = useRouter()
  const auth = getAuth(app)
  const [user, loading] = useAuthState(auth)

  const path = pathname.split('/')

  const homePath = year === 2022 ? '/' : `/study/${year}-${year + 1}`

  return (
    <>
      <div className='flex flex-row sticky top-0 z-50 bg-white bg-opacity-60 backdrop-blur-md w-full px-6 lg:px-20 py-2.5 border-b items-center select-none justify-between truncate transition-all'>
        <div className='flex flex-row items-center'>
          <Link href={homePath}>
            <div className='flex flex-row items-center cursor-pointer gap-x-2 md:pr-4 md:border-r md:mr-4'>
              {/* <AcademicCapIcon className='w-8 h-8 text-mcgill mr-4 lg:mr-2' /> */}
              <img
                src='/cloudberry-final.svg'
                className='w-10 h-10 mr-2 lg:mr-0'
                alt='Logo'
              />
              <p className='hidden lg:inline-block text-xl font-bold text-mcgill'>
                Cloudberry
              </p>
              {/* <p className='text-xl text-gray-600'>
              {year}-{year + 1}
            </p> */}
            </div>
          </Link>

          <div className='hidden md:flex md:flex-row md:items-center'>
            <NavItem
              title='Course Search'
              href={homePath}
              active={
                pathname === '/' || path[1] === 'courses' || path[1] === 'study'
              }
            />
            <NavItem
              title='My Degree'
              href='/my-degree'
              active={pathname === '/my-degree'}
            />
            <NavItem
              title='Schedule Builder'
              href='/schedule'
              active={pathname === '/schedule'}
            />
          </div>
        </div>

        <div className='w-fit flex flex-row items-center gap-x-4'>
          {/* <div className='hidden lg:inline-block text-slate-600'>
            Fall {year} - Summer {year + 1}
          </div> */}

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
        </div>
      </div>
      <NavbarYears currentYear={year} />
    </>
  )
}

export default Navbar
