import { View, Text, TouchableOpacity, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'


export default function ButtonBig({ icon, title, subtitle,color, otherStyle, onPress }) {
  return (
    <TouchableOpacity className={`rounded-lg items-center justify-between flex ${otherStyle}`} activeOpacity={0.7} onPress={onPress}>
            <Ionicons name={icon} size={50} color={color} />
            <Text className="text-lg font-pbold mt-2">{title}</Text>
            <Text className="text-sm font-pthin mt-6">{subtitle}</Text>
          </TouchableOpacity>
  )
}