/* eslint-disable no-useless-catch */
import authorizedAxiosInstance from '~/utils/authorizedAxios'

/**
 * Auth APIs
 * @author levi
 */
export const registerUserAPI = async (data) => {
  try {
    let response = null
    if (data.access_token) {
      response = await authorizedAxiosInstance.post(
        '/auth/register/google/callback',
        data
      )
    } else {
      response = await authorizedAxiosInstance.post('/auth/register', data)
    }
    return response.data
  } catch (error) {
    throw error
  }
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(
    '/auth/verify-account',
    data
  )
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get('/auth/refresh-token')
  return response.data
}

export const forgotPasswordAPI = async (data) => {
  try {
    const response = await authorizedAxiosInstance.post(
      '/auth/forgot-password',
      data
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const verifyOtpAPI = async (data) => {
  try {
    const response = await authorizedAxiosInstance.post(
      '/auth/otp-verify',
      data
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const resetPasswordAPI = async (data) => {
  try {
    const response = await authorizedAxiosInstance.put(
      '/auth/reset-password',
      data
    )
    return response.data
  } catch (error) {
    throw error
  }
}
