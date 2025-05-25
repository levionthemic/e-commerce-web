import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis/authApis'
import Loader from '~/components/Loader/Loader'
import { RoleValue } from '~/types/role'

function AccountVerification() {
  const [isVerified, setVerified] = useState(false)

  const [searchParams] = useSearchParams()
  const { email, token, role } = Object.fromEntries([...searchParams])

  const roleValue: RoleValue = role as RoleValue

  useEffect(() => {
    if (email && token && roleValue) {
      verifyUserAPI({ email, token, role: roleValue }).then(() =>
        setVerified(true)
      )
    }
  }, [email, token, roleValue])

  if (!email || !token) {
    return <Navigate to='/404' />
  }

  if (!isVerified) {
    return <Loader caption={'Đang xác thực...'} />
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
