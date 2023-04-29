import Code from '@components/Code'
import { getStaticProps } from '@utils/[code].server'

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export { getStaticProps }

export default Code
