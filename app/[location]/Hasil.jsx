import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, Camera } from "expo-camera";
import Header from '../../components/Header';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import ItemIcon from '../../components/ItemIcon';
import { router, usePathname } from 'expo-router';
import api from '../../utils/api';
import { useGlobalContext } from '../../context/GlobalProvider';
import ModalConfirmation from '../../components/ModalConfirmation';

export default function Hasil() {
  const [warehouse, setWarehouse] = useState([]);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const location = usePathname().split('/')[1];
  const { authInfo, userToken,setIsLoading } = useGlobalContext();
  console.log(location,authInfo);
  const [selectedProductCode, setSelectedProductCode] = useState({});
  const syncHistoryLocation = async () => {
    setIsLoading(true)
    const response = await api.historyLocation({ token: authInfo.TaskToken, userToken, location });

    setWarehouse(response);
    setIsLoading(false)
  }

  const handleOpenModalDelete = (ProductCode) => {
    setSelectedProductCode(ProductCode);
    setModalDeleteVisible(true);
  }

  const handleDeleteProduct = async () => {
    setIsLoading(true)
    try {
      const response = await api.deleteOpname({ location, token: authInfo.TaskToken, userToken, id: selectedProductCode });

      setModalDeleteVisible(false);

      syncHistoryLocation();

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false)
  

  }

  useEffect(() => {
    syncHistoryLocation();
  }, []);
  


  return (

    <SafeAreaView className="bg-[#F0F0F0] flex-1 h-full">
      <View className="h-40">
      <Header title="Location" subtitle={location} withDetail={true} backButton={true} onBackPress={() => router.push('/Warehouse')} />
      </View>
      <View contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 32 }} className="py-4 px-4 flex-1">
        

        <View className={`flex-1 justify-center px-4 py-5 bg-white rounded-xl mb-4`}>
          <Text className="text-primary text-lg font-pbold">Detail Task</Text>
          <Text className="text-primary text-sm mt-3 mb-8">Pilih sesuai nama Anda</Text>
          <ScrollView className="w-full h-full ">
            {warehouse ? warehouse.map((item, index) => (
              <View key={index} className="w-full p-4 border border-gray-300 rounded-xl my-2">
                <View className="w-full flex flex-row justify-between">
                  <View className="flex-1 justify-between">
                  <Text className="text-primary font-psemibold text-xl">{item.ProductName}</Text>
                  <Text className="text-primary text-sm text-gray-600">{item.ProductCode}</Text>
                  </View>
                  {item.Operator == authInfo?.Operator ? <TouchableOpacity onPress={() => handleOpenModalDelete(item.Id)}><Ionicons name="trash-outline" size={26} color="black" /></TouchableOpacity> : null}
                </View>
                <View className="w-full flex flex-row justify-between mt-4 border-b border-dotted border-b-[#D4DFED] pb-4">
                  <View className="flex gap-2 justify-start">
                    <View className="flex flex-row align-middle items-center">
                      <Text className="text-sm font-pbold text-[#3364A7] rounded-full bg-[#D4DFED] px-2 py-0.5 text-center mr-2">
                        {item.WholeQty}
                      </Text>
                      <Text>Whole</Text>
                    </View>
                    <View className="flex flex-row align-middle items-center">
                      <Text className="text-sm font-pbold text-[#3364A7] rounded-full bg-[#D4DFED] px-2 py-0.5 text-center mr-2">
                        {item.LooseQty}
                      </Text>
                      <Text>Loose</Text>
                    </View>
                    
                  </View>
                  {item.ExpDate ? <Text>Exp. {item.ExpDate}</Text> : null}
                  
                </View>
                <View className="w-full flex flex-row items-center mt-4">
                  <Ionicons name="checkmark-circle-outline" size={26} color="#8CC152" />
                  <Text className="text-primary text-sm ml-2">{item.Operator}</Text>
                </View>
              </View>
            )) : null}
          </ScrollView>
        </View>
      </View>

      <StatusBar style="light" />
      
      <ModalConfirmation visible={modalDeleteVisible} setVisible={setModalDeleteVisible} title="Hapus Task" description="Apakah Anda yakin ingin menghapus task ini?" handleConfirm={handleDeleteProduct} />
      
    </SafeAreaView>
  );
}