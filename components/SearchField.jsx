import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function SearchField({title,value,placeholder,handleChange,otherStyles,keyboardType}) {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="border-1 border-grey-700 w-full h-12 px-2 rounded-full bg-gray-700 focus:border-secondary-100 flex flex-row relative items-center">
      <Ionicons name="search-outline" size={24} color="white" />
        <TextInput
          className="flex-1 text-white text-base font-ppregular mx-4" 
          value={value}
          placeholder={placeholder}
          placeholderTextColor="white"
          onChangeText={handleChange}
          keyboardType={keyboardType}
        />
        
      </View>
    </View>
  )
}