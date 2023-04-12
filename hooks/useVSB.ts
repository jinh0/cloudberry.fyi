// import { useQuery } from '@tanstack/react-query'
import { VSBCourse } from '@typing'

const useVSB = (vsb: VSBCourse) => {
  // const fetchVSB = async () => {
  //   const res = await fetch(`/api/vsb/${vsb.code}`)
  //
  //   if (res.status === 400) throw new Error('Something went wrong.')
  //   return res.json()
  // }
  //
  // const { data: course } = useQuery<VSBCourse>({
  //   queryKey: ['vsb', vsb && vsb.code],
  //   queryFn: fetchVSB,
  //   initialData: vsb,
  // })
  //
  return { course: vsb }
}

export default useVSB
