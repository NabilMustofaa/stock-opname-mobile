import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { BarCodeScanner } from 'expo-barcode-scanner'
import CustomButton from './CustomButton'
import { useGlobalContext } from '../context/GlobalProvider'



export default function ModalScanner({ modalVisible, setModalVisible,  data, setData }){
  const { setIsLoading,setError } = useGlobalContext();
  const [hasPermission, setHasPermission] = useState(null);
  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
  };
  const [scanned, setScanned] = useState(false);
  const [showManualButton, setShowManualButton] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        setHasPermission(false);
        setError(error)
        
      }
    };
    setIsLoading(true)
    if (modalVisible) {
      getCameraPermissions();
      setShowManualButton(false);
      const timer = setTimeout(() => {
        if (!scanned) {
          setShowManualButton(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
    setIsLoading(false)
    
  }, [modalVisible]);

  return (
    <>
    <View className={modalVisible ? "absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" : "hidden"}>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 w-full items-center justify-end">
          <View className="w-full px-6 bg-white rounded-lg py-4 justify-between">
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="text-primary text-lg font-pbold">Scan Barcode</Text>
              <TouchableOpacity
                className="w-8 h-8 border border-[#E5E5E5] rounded-lg items-center justify-center"
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className="w-full rounded-lg flex justify-center items-center my-4 bg-black">
              <BarCodeScanner
                  onBarCodeScanned={handleBarcodeScanned}
                  style={{  width: "90%",height: "75%" }}
                />
            </View>

            <View>
            {scanned && <CustomButton title={`Barcode Data : ${data}` } containerStyles=" border border-[#007BFF] my-2" textStyles="text-[#007BFF]" />}
            {showManualButton && !scanned && <CustomButton title="Barcode Tidak Terdeteksi, Anda Dapat Menginput Manual" containerStyles=" border border-red-500 my-2" textStyles="text-red-500" handlePress={() => setModalVisible(false)} />}
            </View>
          </View>
        </View>
      </Modal>
      </>
  )
}