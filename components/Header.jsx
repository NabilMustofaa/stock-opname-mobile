import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useGlobalContext } from '../context/GlobalProvider'
import { Redirect, router } from 'expo-router';

export default function Header({title, subtitle, backButton,onBackPress,authed, withDetail}) {

  const { logout,authInfo } = useGlobalContext();

  const handleBack = () => {
    console.log("Back Pressed");
    router.back();
  }

  return (
    <View className={`absolute top-0 left-0 w-full ${authed ? 'h-60' : 'h-48'} ${backButton ? 'items-start' : 'items-center'} rounded-xl z-0`}>
              
              <View className="absolute top-0 left-0 w-full h-full rounded-b-xl z-0">
              <Image
                source={require('../assets/images/header-background.jpg')}
                className="absolute top-0 left-0 w-full h-full rounded-b-xl z-0"
              />
              <View className="absolute top-0 left-0 w-full h-full bg-[#4A89DC] opacity-[0.96] rounded-b-xl z-0" />
            </View>
            {authed && (
              <View className={"absolute top-10 left-0 px-4 flex flex-row justify-between items-start gap-4 w-full"}>
              <View>
                <Text className="text-white">Selamat Bekerja,</Text>
                <Text className="text-white font-pbold text-lg">{authInfo.Operator}</Text>
                <Text className="text-white text-sm mt-8">Task</Text>
                <Text className="text-white font-psemibold">{authInfo.Description}</Text>
              </View>
              
              
              <TouchableOpacity className="py-2" onPress={() => logout()}>
                <Ionicons name="log-out-outline" size={24} color="white"  />
              </TouchableOpacity>
              </View>
            )}
            
            {backButton &&  (
              <View className={backButton ? "absolute top-10 left-0 px-4 flex flex-row align-middle items-center gap-4" : "hidden"}>
                <Pressable className="py-2" onPress={onBackPress}>
                <Ionicons name="arrow-back-outline" size={24} color="white"  />
                </Pressable>
                <Text className="text-white font-pbold text-xl">{title}</Text>
              </View>
            )}
            { withDetail && (
              <View className="flex px-4">
                <Text className="text-white text-sm mt-32">{title}</Text>
                <Text className="text-white font-psemibold">{subtitle}</Text>
              </View>
             
            )
            }
            {!authed && !backButton && (
             <>
             <Text className="text-white font-pbold text-xl mt-12">{title}</Text>
             <Text className="text-white font-ppregular text-sm">{subtitle}</Text>
           </>
            )}
            
            
          </View>
  )
}