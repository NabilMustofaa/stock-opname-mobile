import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Landing() {
  return (
    <SafeAreaView className=" bg-black h-full">
    <ScrollView contentContainerStyle={{ height: '100%' }}>
      <View className="justify-center items-center w-full min-h-[85vh] px-4 ">
        <Text className="text-white text-3xl font-ppbold">Landing Page</Text>
      </View>
    </ScrollView>
    <StatusBar style="light" />
  </SafeAreaView>
  )
}