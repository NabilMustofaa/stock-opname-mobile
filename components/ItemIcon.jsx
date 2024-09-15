import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function ItemIcon({ icon, title, subtitle, iconColor="black", withBorder=true }) {
  return (
    <>
    <View className="flex flex-row items-center py-1 gap-6">
            <Ionicons name={icon} size={32} color={iconColor} />
            <View className="flex flex-col align-middle justify-center">
              <Text className="text-primary font-pbold">{title}</Text>
              <View className="flex flex-row items-center gap-1">
              <Text className="text-xs text-[#007BFF] bg-blue-300 rounded-full p-0.5 text-center w-5 h-5">{subtitle}</Text>
              <Text className="text-sm text-gray-600">Whole Quantity</Text>
              </View>
            </View>
            
          </View>
    {withBorder ? <View className="w-full h-[1px] mt-3 bg-[#E5E5E5] "/>: null}
    </>
  )
}