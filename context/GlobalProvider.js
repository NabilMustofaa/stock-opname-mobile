import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../utils/api'

const GlobalContext = createContext();
export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [authInfo, setAuthInfo] = useState(null)
  const [showTabs, setShowTabs] = useState(true)
  const [error, setError] = useState(null)



  const login = async (operator, token) => {
    setIsLoading(true)

    try {
      const response = await api.login({ Operator: operator, Token: token })
      setAuthInfo(response)
      setUserToken(response.Token)
      AsyncStorage.setItem('userToken', response.Token)
      console.log(response, 'login',authInfo)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setIsLoading(true)
    setUserToken(null)
    setAuthInfo(null)
    AsyncStorage.removeItem('userToken')
    setIsLoading(false)
  }
  
  const isLoggedIn = async () => {
    
    try {
      setIsLoading(true)
      let userToken = await AsyncStorage.getItem('userToken')
      if (!userToken) {
        setIsLoading(false)
        return
      }
      let authInfo = await api.getCurrentUser({ userToken: userToken })
      console.log(authInfo,userToken,'isLoggedIn')
      if (authInfo) {
        setAuthInfo(authInfo)
        setUserToken(userToken)
      }
      
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])


  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        userToken,
        authInfo,
        login,
        logout,
        showTabs,
        setShowTabs,
        error,
        setError,
        setIsLoading,
        isLoggedIn
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider