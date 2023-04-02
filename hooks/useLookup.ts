import { useQuery } from '@tanstack/react-query'

function useLookup() {
  const { data: lookup, isLoading } = useQuery({
    queryKey: ['lookup'],
    queryFn: async (): Promise<Record<Uppercase<string>, string>> => {
      const res = await fetch('/lookup.json')
      return await res.json()
    },
  })

  return { lookup, isLoading }
}

export default useLookup
