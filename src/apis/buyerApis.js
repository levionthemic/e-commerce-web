/* eslint-disable no-useless-catch */
import authorizedAxiosInstance from '~/utils/authorizedAxios'

/**
 * Products APIs
 * @author levi
 */
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

/**
 * Categories APIs
 * @author levi
 */
export const getCategoriesAPI = async () => {
  const response = await authorizedAxiosInstance.get('/categories')
  return response.data
}

/**
 * Review APIs
 * @author levi
 */
export const addCommentAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/review/add', data)
  return response.data
}

/**
 * Review APIs
 * @author taiki and levi
 */
export const fetchOrdersAPI = async () => {
  const response = await authorizedAxiosInstance.get('/order/get-all')
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
