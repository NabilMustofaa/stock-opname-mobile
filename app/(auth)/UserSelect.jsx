import { View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { Redirect, router } from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import SelectField from '../../components/SelectField';
import api from '../../utils/api';
import CardDetailTask from '../../components/CardDetailTask';
import { useGlobalContext } from '../../context/GlobalProvider';
import Loader from '../../components/Loader';




export default function UserSelect() {
  const [token, setToken] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [task, setTask] = useState({});
  

  const {userToken,setError,setIsLoading,isLoading} = useGlobalContext();
 
  async function handleSubmitToken( ) {
    setIsLoading(true)

    try {
      
      const response = await api.checkToken({ token });
      setTask(response);
      setIsTokenValid(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false)
    }

  }

  console.log(userToken,"UserSelect")
  if (userToken) {
    return (
      <Redirect href="/Warehouse" />
    )
  }
  

  return (
    <SafeAreaView className="bg-[#F0F0F0] flex-1">
      
      <Header title="Stock Opname" subtitle="Aplikasi Stock Opname" backButton={true} onBackPress={() => { router.push("/") }} />
      
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 32 }} className="mt-28">
        <View className={`flex justify-center px-4 py-5 bg-white rounded-xl mb-4`}>
          <Text className="text-primary text-lg font-pbold">Token Task</Text>
          <Text className="text-primary text-sm mt-3">Masukkan Task</Text>
          <FormField title="Token" otherStyles="mt-12" value={token} handleChange={setToken} />
          <CustomButton title="Submit" handlePress={handleSubmitToken} containerStyles="mt-8" textStyles="text-[#007BFF]" />
        </View>

        <CardDetailTask isTokenValid={isTokenValid} token={token} {...task} />

      </ScrollView>

      <StatusBar style="light" />

    </SafeAreaView>
  );
}
