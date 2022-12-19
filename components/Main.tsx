import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import Footer from './Footer'
import Navbar from './Navbar'

/**
 * Wrapper container for every page. Contains <title>, <meta> data, and Navbar.
 */
const Main = ({
  title = '',
  content = '',
  children,
}: {
  title?: string
  content?: string
  children?: JSX.Element | JSX.Element[] | string
}) => {
  return (
    <>
      <Head>
        <title>{title === '' ? 'Cloudberry' : title}</title>

        {/* Metadata for link previews */}
        <meta
          name='description'
          content={
            content === ''
              ? 'Cloudberry is the modern all-in-one course catalog for McGill University.'
              : content
          }
        />
        <meta property='og:image:width' content='300'></meta>
        <meta property='og:image:height' content='300'></meta>
        <meta
          name='og:image'
          content='https://www.mcgill.ca/sites/all/themes/moriarty/images/mcgill_crest.png'
        ></meta>
        <meta
          name='twitter:image'
          content='https://www.mcgill.ca/sites/all/themes/moriarty/images/mcgill_crest.png'
        ></meta>
      </Head>

      <div className='w-screen h-full'>
        <div className='min-h-screen pb-16 flex flex-col'>
          <Navbar />
          <div className='px-6 lg:px-20 py-4 md:py-6 overflow-auto flex-grow flex'>
            {children}
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Main
