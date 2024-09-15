import { View, Text, Modal } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { Ionicons } from '@expo/vector-icons'

export default function ModalAlert({title, description,visible, setVisible,state='danger' }) {
  return (
    <>
      <View className={visible ? "absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 w-full h-full" : "hidden"}></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >

        <View className="flex-1 w-full items-center justify-end">
          <View className=" w-full pt-4 px-2 bg-white rounded-lg">
            <View className="w-full flex flex-row justify-center items-center px-2">
              <Text className="text-primary text-2xl font-pbold text-center">{title}</Text>
            </View>
            <View className="w-full justify-center items-center px-2">
              <View className="w-full h-[1px] bg-slate-300 my-2">

              </View>
            </View>

            
            {state === 'success' ? <View className="w-36 h-36 rounded-full bg-[#007BFF] mx-auto items-center justify-center my-4">
              <Ionicons name="checkmark-outline" size={128} color="white" />
            </View> : null} 

            {state === 'danger' ? <View className="w-36 h-36 rounded-full bg-red-500 mx-auto items-center justify-center my-4">
              <Ionicons name="close-outline" size={128} color="white" />
            </View> : null}            

            <View className="w-full flex flex-row justify-center items-center px-2">
              <Text className="text-primary font-pregular text-center">{description}</Text>
            </View>
            <View className="w-full justify-center items-center px-2">
              <View className="w-full h-[1px] bg-slate-300 my-2">

              </View>
            </View>
            <View className="w-full flex flex-row justify-center items-center py-2 px-4">
              <View className="flex-1 mr-2">
                <CustomButton title="Cancel" handlePress={setVisible} containerStyles={state === 'success' ? ' border border-[#007BFF]' : ' border border-red-500'} textStyles={state === 'success' ? 'text-[#007BFF]' : 'text-red-500'} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      </>
  )
}