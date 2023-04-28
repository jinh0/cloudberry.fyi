import Head from 'next/head'
import Footer from './Footer'
import Navbar from './Navbar'

/**
 * Wrapper container for every page. Contains <title>, <meta> data, and Navbar.
 */
const Main = ({
  year = 2022,
  title = '',
  content = '',
  children,
}: {
  year?: number
  title?: string
  content?: string
  children?: Array<JSX.Element | string> | JSX.Element | string
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
          <Navbar year={year} />
          <div className='px-6 lg:px-20 py-4 md:py-6 overflow-auto flex-grow flex flex-col'>
            {children}
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Main
