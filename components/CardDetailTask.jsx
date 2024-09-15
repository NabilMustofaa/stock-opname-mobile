import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SelectField from './SelectField'
import CustomButton from './CustomButton'
import { useGlobalContext } from '../context/GlobalProvider'
import { router } from 'expo-router'

export default function CardDetailTask({ isTokenValid, description, location, startDate, endDate, operators=[],token }) {
  const [operator, setOperator] = useState({});

  const {login} = useGlobalContext();
  const handleChangeOperator = (value) => {
    setOperator(value);
  }
  const handleSubmitOperator = () => {
    login(operator.value, token)
  }
  
  return (
    <View className={ isTokenValid ? `flex justify-center px-4 py-5 bg-white rounded-xl mb-4` : `hidden`}>
          <Text className="text-primary text-lg font-pbold">Detail Task</Text>
          <Text className="text-primary text-sm mt-3 mb-8">Pilih sesuai nama Anda</Text>
          <View className="w-full flex flex-row items-center py-2 px-4 gap-6">
            <Ionicons name="clipboard-outline" size={26} color="black" />
            <View className="flex flex-col">
              <Text className="text-primary font-pbold">Description </Text>
              <Text className="text-primary text-sm">{description}</Text>
            </View>
          </View>
          <View className="w-full flex flex-row items-center py-2 px-4 gap-6">
            <Ionicons name="map-outline" size={26} color="black" />
            <View className="flex flex-col">
              <Text className="text-primary font-pbold">Location</Text>
              <Text className="text-primary text-sm">{location}</Text>
            </View>
          </View>
          <View className="w-full flex flex-row items-center py-2 px-4 gap-6">
            <Ionicons name="calendar-outline" size={26} color="black" />
            <View className="flex flex-col">
              <Text className="text-primary font-pbold">Date</Text>
              <Text className="text-primary text-sm">{startDate} - {endDate}</Text>
            </View>
          </View>
          <SelectField title="Operator" otherStyles="mt-12" options={operators.map(operator => ({ label: operator, value: operator }))} handleChange={handleChangeOperator} value={operator} />
          <CustomButton title="Kirim" handlePress={handleSubmitOperator} containerStyles="mt-8 bg-[#007BFF]" textStyles="text-white" />
        </View>
  )
}