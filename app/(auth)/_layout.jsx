import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import GlobalProvider, { useGlobalContext } from '../../context/GlobalProvider';
import ModalAlert from '@/components/ModalAlert';
import Loader from '../../components/Loader';


export default function AuthLayout() {
  const {showTabs, setShowTabs, error, setError, isLoading} = useGlobalContext();

  useEffect(() => {
    setShowTabs(!isLoading)
  },[isLoading])
  return (
    <>
    
      <Stack>
        <Stack.Screen name="UserSelect" options={{ headerShown: false }} />
        <Stack.Screen name="Landing" options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
      </Stack>
      
    <StatusBar style="light" />
    <Loader isLoading={isLoading} />
    <ModalAlert title={'Opss'} description={error} visible={error !== null} setVisible={() => setError(null)} />

    
    </>
  )
}