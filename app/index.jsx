import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import CardInformation from '../components/CardInformation'
import { Ionicons } from '@expo/vector-icons';
import ButtonBig from '../components/ButtonBig'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'

export default function Landing() {
  const {userToken} = useGlobalContext();
  console.log(userToken)
  if (userToken) {
    return (
      <Redirect href="/Warehouse" />
    )
  }
  
  return (
    <SafeAreaView className=" bg-[#F0F0F0] h-full relative">
    <Header title="Stock Opname" subtitle="Aplikasi Stock Opname" />
    <ScrollView contentContainerStyle={{ height: '100%' }} className="absolute top-32 w-full" >
      
      <View className="items-center w-full min-h-[85vh] px-4 relative">
        <CardInformation title="Role" subtitle="Pilih salah satu menu sesuai dengan role Anda" otherStyle={""}/>
        <View className="w-full flex flex-row justify-center py-5 px-4 gap-6">
          <View className="w-1/2">
          <ButtonBig icon ="settings" title="Admin" subtitle="Click to View" color="#4A89DC" otherStyle={"bg-white py-6 px-11"} onPress={() => {router.push("/(auth)/UserSelect")}} />
          </View>
          <View className="w-1/2">
            <ButtonBig icon ="person" title="User" subtitle="Click to View" color="#4A89DC" otherStyle={"bg-white py-6 px-11"} onPress={() => {router.push("/(auth)/UserSelect")}} />
          </View>
          
        </View>
      
      </View>
    </ScrollView>
    <StatusBar style="light" />
  </SafeAreaView>
  )
}