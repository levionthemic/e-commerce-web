import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

// Auth APIs
export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/auth/register`, data)
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/auth/verify-account`, data)
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/auth/refresh-token`)
  return response.data
}

// Products APIs
export const getProductsAPI = async (searchPath = '') => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/products${searchPath}`)
  return response.data
}

export const getProductDetailsAPI = async (productId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/products/${productId}`)
  return response.data
}

export const updateProductDetailAPI = async (productId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/products/${productId}`, updateData)
  return response.data
}

// Categories APIs
export const getCategoriesAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/categories`)
  return response.data
}