import { createContext } from 'react'

const LookupContext = createContext<{
  lookup: Record<Uppercase<string>, string>
  isLoading: boolean
}>(null)

export default LookupContext
