import { auth } from '@utils/firebase'
import { useRouter } from 'next/router'

const SignOut = () => {
  const router = useRouter()

  const signOut = () => {
    auth.signOut()
    router.push('/')
  }

  return (
    <div className='mt-4'>
      <button onClick={signOut} className='border rounded-full px-6 py-2'>
        Sign out
      </button>
    </div>
  )
}

export default SignOut
