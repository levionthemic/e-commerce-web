/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
  const [isPageLoading, setPageLoading] = useState(false)
  const [isDataLoading, setDataLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isPageLoading, setPageLoading, isDataLoading, setDataLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}