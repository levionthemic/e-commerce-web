import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis/authApis'
import Loader from '~/components/Loader/Loader'

function AccountVerification() {
  const [isVerified, setVerified] = useState(false)

  const [searchParams] = useSearchParams()
  const { email, token, role } = Object.fromEntries([...searchParams])

  useEffect(() => {
    if (email && token && role) {
      verifyUserAPI({ email, token, role }).then(() => setVerified(true))
    }
  }, [email, token, role])

  if (!email || !token) {
    return <Navigate to='/404' />
  }

  if (!isVerified) {
    return <Loader caption={'Đang xác thực...'} />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
