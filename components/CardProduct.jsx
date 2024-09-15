import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function CardProduct({ ProductName, ProductCode, Brand, Category, AliasCode, selected,handleSelect }) {

  

  return (
    <TouchableOpacity className="w-full flex items-center border border-gray-600 rounded-xl" onPress={() => {handleSelect(ProductCode)}}>
    <View className="w-full flex flex-row justify-between items-center py-2 px-4 gap-6">
      <View className="flex-1">
      <Text className="text-primary font-pbold">{ProductName}</Text>
      <Text className="text-primary text-sm text-gray-600">{ProductCode}</Text>
      </View>
      <View className="w-6 h-6 rounded-full items-center justify-center bg-[#007BFF]">
        {selected && <Ionicons name="checkmark-sharp" size={18} color="white" />}
      </View>
      
    </View>
      <View className="w-full flex py-2 px-6">
        <View className="w-full h-[1px] bg-[#E5E5E5]">
      </View>
      <View className="mt-4">
        <View className="w-full flex flex-row justify-between items-center">
        <Text className="text-sm text-primary text-gray-600">Brand</Text>
        <Text className="text-sm text-primary">{Brand}</Text>
        </View>
        <View className="w-full flex flex-row justify-between items-center">
        <Text className="text-sm text-primary text-gray-600">Category</Text>
        <Text className="text-sm text-primary">{Category}</Text>
        </View>
        <View className="w-full flex flex-row justify-between items-center">
        <Text className="text-sm text-primary text-gray-600">AliasCode</Text>
        <Text className="text-sm text-primary">{AliasCode}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
}