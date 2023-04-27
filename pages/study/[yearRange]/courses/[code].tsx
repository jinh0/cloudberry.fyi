import Code from '@components/Code'
import { getPaths, getStaticProps } from '@utils/[code].server'

export const getStaticPaths = getPaths(2021)

export { getStaticProps }

export default Code
