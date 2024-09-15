import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function FormField({title,value,placeholder,handleChange,otherStyles,keyboardType}) {
  const [fieldFocus, setFieldFocus] = React.useState(false)
  return (
    <View className={` ${otherStyles} relative`}>
      
      <View className="border border-[#E5E5E5] w-full h-16 px-4 rounded-lg focus:border-[#007BFF]">
        <TextInput
          className="flex-1 text-black text-base "
          value={value}
          placeholder={placeholder}
          onChangeText={handleChange}
          keyboardType={keyboardType}
          secureTextEntry={ title === 'Password'}
          onFocus={() => setFieldFocus(true)}
          onBlur={() => setFieldFocus(false)}
        />
        <Text className={`${fieldFocus ? 'text-[#007BFF]' : 'text-[#7B7B8B]'} text-base absolute -top-4 left-4 bg-white px-4`}>{title}</Text>
      </View>
    </View>
  )
}