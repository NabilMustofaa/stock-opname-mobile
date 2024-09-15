import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Header from '../components/Header';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import ItemIcon from '../components/ItemIcon';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import api from '../utils/api';
import Loader from '../components/Loader';
import ModalScanner from '../components/ModalScanner';

export default function Warehouse() {
  const [warehouse, setWarehouse] = useState([
  ]);
  const { userToken,authInfo,isLoading,setIsLoading,setError,isLoggedIn } = useGlobalContext();
  const [location, setLocation] = useState('');

  const handleSubmitLocation = async () => {
    return router.push(`${location}/Opname`);
  }

  

  

 

  const [modalVisible, setModalVisible] = useState(false);



  const syncLocations = async () => {
    setIsLoading(true)
    try {
      console.log(authInfo, userToken,'syncLocations');
      const response = await api.getLocations({ token: authInfo.TaskToken, userToken });
      console.log(response);
      setWarehouse(response);
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    isLoggedIn();
    syncLocations();
  }, []);



  if (!userToken) {
    return (
      <Redirect href="/" />
    )
  }

  
  return (
    <SafeAreaView className="bg-[#F0F0F0] flex-1 h-full">
      <View className="h-40">
      <Header title="Stock Opname" subtitle="Aplikasi Stock Opname" authed={true} />
      </View>
      <View contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 32 }} className="py-4 px-4 flex-1">
        <View className={`flex justify-center px-4 py-5 bg-white rounded-xl mb-4`}>
          <Text className="text-primary text-lg font-pbold">Pilih Lokasi</Text>
          <Text className="text-primary text-sm mt-3">Input / Scan Barcode untuk Kode Gudang</Text>
          <View className="w-full flex flex-row items-center justify-between mt-8">
            <View className="flex-1 mr-4">
              <FormField title="Kode Gudang" otherStyles="" value={location} handleChange={setLocation} />
            </View>
            <TouchableOpacity
              className="w-16 h-16 border border-[#E5E5E5] rounded-lg items-center justify-center"
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="scan-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CustomButton title="Submit" handlePress={() => { handleSubmitLocation() }} containerStyles="mt-8" textStyles="text-[#007BFF]" />
        </View>

        <View className={`flex-1 justify-center px-4 py-5 bg-white rounded-xl `}>
          <Text className="text-primary text-lg font-pbold">Detail Task</Text>
          <Text className="text-primary text-sm mt-3 mb-8">Pilih sesuai nama Anda</Text>
          <ScrollView className="w-full flex-1 gap-4 h-full">
            {warehouse.map((item, index) => (
              <TouchableOpacity key={index} className="w-full px-4" onPress={() => router.push(`${item.BinLoc}/Opname`)}>
                <ItemIcon icon="logo-dropbox" title={item.BinLoc} subtitle={item.TotalWholeQty} iconColor="#007BFF" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <StatusBar style="light" />
      <ModalScanner modalVisible={modalVisible} setModalVisible={setModalVisible} data={location} setData={setLocation} />
      

      
      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
}
