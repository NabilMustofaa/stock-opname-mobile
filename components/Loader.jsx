import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loader({isLoading}) {

  return (
    isLoading && (
      <>
    <View className={ "absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 w-full h-full" }></View>
    <View className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center">
      <ActivityIndicator animating={isLoading} color="white" size={80} />
      <Text className="text-white text-lg font-pbold animate-bounce">Loading...</Text>
    </View>

    </>
    )
  )
}