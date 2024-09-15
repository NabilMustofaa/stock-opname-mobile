import { View, Text } from 'react-native'
import React from 'react'

export default function CardInformation({ title, subtitle, otherStyle }) {
  return (
    <View className={` ${otherStyle} w-full`} >


    <View className={` flex justify-center px-4 py-5  bg-white rounded-xl z-10`}>
          <Text className="text-primary text-lg font-pbold">{title}</Text>
          <Text className="text-primary text-sm mt-3">{subtitle}</Text>
        </View>
        </View>
  )
}