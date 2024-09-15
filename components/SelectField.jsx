import { View, Text } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';


export default function SelectField({title,options,otherStyles,value,handleChange}) {
  return (
    <View className={` ${otherStyles} relative`}>
      
      <View className="border-2 border-[#E5E5E5] w-full h-16 py-2 rounded-lg justify-center">
      <Dropdown
          data={options}
          labelField="label"
          valueField="value"
          className="text-base text-black bg-white px-4"
          placeholder="Select One"
          placeholderStyle={{ color: '#7B7B8B' }}
          value={value}
          onChange={handleChange}
        
        />
        <Text className="text-base absolute -top-4 left-4 bg-white px-4">{title}</Text>
      </View>
    </View>
  )
}