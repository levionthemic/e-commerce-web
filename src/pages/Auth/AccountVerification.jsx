import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import Loader from '~/components/Loader/Loader'

function AccountVerification() {
  const [isVerified, setVerified] = useState(false)

  const [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to='/404' />
  }

  if (!isVerified) {
    return <Loader caption={'Đang xác thực...'} />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification