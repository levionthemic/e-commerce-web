/* eslint-disable no-useless-catch */
import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

/**
 * Auth APIs
 * @author levi
 */
export const registerUserAPI = async (data) => {
  let response = null
  if (data.access_token) {
    response = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/auth/register/google/callback`,
      data
    )
  } else {
    response = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/auth/register`,
      data
    )
  }
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/auth/verify-account`,
    data
  )
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/auth/refresh-token`
  )
  return response.data
}

export const forgotPasswordAPI = async (data) => {
  try {
    const response = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/auth/forgot-password`,
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
      `${API_ROOT}/v1/auth/otp-verify`,
      data
    )
    return response.data
  } catch (error) {
    throw error
  }
}

// Products APIs
export const getProductsAPI = async (searchPath = '') => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/products${searchPath}`
  )
  return response.data
}

export const getProductsWithFiltersAPI = async (searchPath = '') => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/products/filter${searchPath}`
  )
  return response.data
}

export const getProductDetailsAPI = async (productId) => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/products/${productId}`
  )
  return response.data
}

export const updateProductDetailAPI = async (productId, updateData) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/products/${productId}`,
    updateData
  )
  return response.data
}

// Categories APIs
export const getCategoriesAPI = async () => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/categories`
  )
  return response.data
}

// Orders APIS
export const fetchOrdersAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/orders`)
  return response.data
}

export const addOrderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/order/add`,
    data
  )
  return response.data
}

export const clusterOrderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/order/cluster`,
    data
  )
  return response.data
}

// Review APIs
export const addCommentAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/review/add`,
    data
  )
  return response.data
}
