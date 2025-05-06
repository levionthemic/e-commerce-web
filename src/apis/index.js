/* eslint-disable no-useless-catch */
import authorizedAxiosInstance from '~/utils/authorizedAxios'

/**
 * Auth APIs
 * @author levi
 */
export const registerUserAPI = async (data) => {
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

// Products APIs
export const getProductsAPI = async (searchPath = '') => {
  const response = await authorizedAxiosInstance.get(`/products${searchPath}`)
  return response.data
}

export const getProductsWithFiltersAPI = async (searchPath = '') => {
  const response = await authorizedAxiosInstance.get(
    `/products/filter${searchPath}`
  )
  return response.data
}

export const getProductDetailsAPI = async (productId) => {
  const response = await authorizedAxiosInstance.get(`/products/${productId}`)
  return response.data
}

export const updateProductDetailAPI = async (productId, updateData) => {
  const response = await authorizedAxiosInstance.put(
    `/products/${productId}`,
    updateData
  )
  return response.data
}

// Categories APIs
export const getCategoriesAPI = async () => {
  const response = await authorizedAxiosInstance.get('/categories')
  return response.data
}

// Orders APIS
export const fetchOrdersForBuyerAPI = async () => {
  const response = await authorizedAxiosInstance.get('/order/get-all')
  return response.data
}

export const fetchOrdersForSellerAPI = async () => {
  const response = await authorizedAxiosInstance.get('/order/seller/get-all')
  return response.data
}

export const addOrderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/order/add', data)
  return response.data
}

export const clusterOrderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/order/cluster', data)
  return response.data
}

// Review APIs
export const addCommentAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/review/add', data)
  return response.data
}
