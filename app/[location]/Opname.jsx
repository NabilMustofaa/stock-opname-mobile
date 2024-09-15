import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Header from '../../components/Header';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import ItemIcon from '../../components/ItemIcon';
import { useNavigation } from '@react-navigation/native';
import SearchField from '../../components/SearchField';
import CardProduct from '../../components/CardProduct';
import { router, usePathname } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import api from '../../utils/api';
import ModalScanner from '../../components/ModalScanner';

export default function Opname() {


  const location = usePathname().split('/')[1];
  console.log(location);
  const [products, setProducts] = useState([]);
  const { authInfo, userToken,setIsLoading } = useGlobalContext();
  const [selectedProductCode, setSelectedProductCode] = useState({});

  const [productOpname, setProductOpname] = useState({
    WholeQty: 0,
    LooseQty: 0,
    ExpDate: '',
    Operator: authInfo?.Operator
  });


  useEffect(() => {
    console.log(productOpname);
  })

  const backToWarehouse = () => {
    console.log('backToWarehouse');
    return router.push('/Warehouse');
  }

  const handleToogleProduct = (ProductCode) => {
    setSelectedProductCode(ProductCode);
  }

  const handleSelectProduct = async() => {
    setIsLoading(true)
    const response = await api.checkProduct({ location, token: authInfo.TaskToken, userToken });
    
    let check = response.find(product => product.ProductCode === selectedProductCode);
    if (response.length > 0 ) {
      if (!check) {
        throw new Error('Product not found');
      }
    }

    let product = products.find(product => product.ProductCode === selectedProductCode);
      if (product) {
        setProductOpname(prevState => ({
          ...prevState,
          ...product
        }));
      }
      setModalProductVisible(false);
      setIsLoading(false)
  }

  const handleSubmitProduct = async() => {
    setIsLoading(true)
    const response = await api.storeOpname({ location,token: authInfo.TaskToken, userToken, data: productOpname });
    console.log(response);
    if (response) {
      setProductOpname({
        ProductCode: '',
        ProductName: '',
        WholeQty: 0,
        LooseQty: 0,
        ExpDate: '',
        Operator: ''
      });
      alert(response);
    }
    setIsLoading(false)
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalCameraVisible, setModalCameraVisible] = useState(false);
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => { 
    if (modalCameraVisible) {
      const getCameraPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      };

      getCameraPermissions();
    }
  }, [modalCameraVisible]);



  const searchProduct =  async() => {
    setIsLoading(true)
    try {
      
      // Perform the product search
      const response = await api.searchProduct({ token: authInfo.TaskToken, userToken: userToken, query: keyword });
      
      // Set the products list and ensure the modal becomes visible
      setProducts(response);
      setModalProductVisible(true);
      console.log(response,products,modalCameraVisible,modalProductVisible);
  
    } catch (error) {
      console.error("Error searching for products", error);
    } finally {
      setIsLoading(false)
    }
  }

  const {setShowTabs,showTabs} = useGlobalContext();
  //hide bottom tab
  useEffect(() => {
    setShowTabs( !modalProductVisible)
  },[modalProductVisible])

  useEffect(() => {
    setShowTabs( !modalCameraVisible)
  },[modalCameraVisible] )

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setKeyword(data);
    alert(`Barcode scanned with code: ${data}`);
  };


  console.log(showTabs,modalCameraVisible,modalProductVisible);

  return (
    <SafeAreaView className="bg-[#F0F0F0] flex-1">
      <Header title="Location" subtitle={location} withDetail={true} backButton={true} onBackPress={backToWarehouse} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 32 }} className="mt-36">
        <View className={`flex justify-center px-4 py-5 bg-white rounded-xl mb-4`}>
          <Text className="text-primary text-lg font-pbold">Cari Produk</Text>
          <Text className="text-primary text-sm mt-3">Input / Scan Barcode untuk mencari produk</Text>
          <View className="w-full flex flex-row items-center justify-between mt-12">
            <View className="flex-1 mr-4">
              <FormField title="Cari Produk" value={keyword} handleChange={setKeyword} />
            </View>
            <TouchableOpacity
              className="w-16 h-16 border border-[#E5E5E5] rounded-lg items-center justify-center"
              onPress={() => setModalCameraVisible(true)}
            >
              <Ionicons name="scan-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CustomButton title="Submit" handlePress={() => { searchProduct() }} containerStyles="mt-8" textStyles="text-[#007BFF]" />
        </View>
        <View className={productOpname?.ProductCode ? 'flex justify-center px-4 py-5 bg-white rounded-xl mb-4' : 'hidden'}>
          <Text className="text-primary text-lg font-pbold">Opname  Produk</Text>
          <Text className="text-primary text-sm">Masukkan jumlah produk</Text>

          <View className="w-full flex flex-row mt-8 items-center">
            <Ionicons name="archive-outline" size={36} color="#007BFF" />
            <View className="ml-4">
              <Text className=" text-sm font-psemibold">{productOpname?.ProductName}</Text>
              <Text className=" text-xs">{productOpname?.ProductCode}</Text>
            </View>
          </View>
          <View className="w-full flex flex-row items-center justify-between mt-12">
            <View className="flex-1 mr-4">
              <FormField title="Whole" value={productOpname?.LooseQty} handleChange={(value) => setProductOpname({ ...productOpname, LooseQty: value})} />
            </View>
            <View className="flex-1">
              <FormField title="Loose" value={productOpname?.WholeQty} handleChange={ (value) => setProductOpname({ ...productOpname, WholeQty: value })} />
            </View>
          </View>
          <FormField title="Expired Date" value={productOpname?.ExpDate} handleChange={ (value) => setProductOpname({ ...productOpname, ExpDate: value})} otherStyles={"mt-6"} keyboardType={"date"} />
          <CustomButton title="Submit" handlePress={() => { handleSubmitProduct() }} containerStyles="mt-8" textStyles="text-[#007BFF]" />
        </View>

        
      </ScrollView>

      <StatusBar style="light" />

    <ModalScanner modalVisible={modalCameraVisible} setModalVisible={setModalCameraVisible} data={keyword} setData={setKeyword} />

      <View className={modalProductVisible ? "absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 w-full h-full" : "hidden"}></View>
<Modal
  animationType="slide"
  transparent={true}
  visible={modalProductVisible}
  onRequestClose={() => setModalProductVisible(false)}
>

  <View className="flex-1 w-full h-full items-center justify-end py-4 px-4">
    <View className="w-full h-full px-6 bg-white rounded-lg py-4 justify-between">
      <View className="w-full flex flex-row justify-between items-center px-2">
        <Text className="text-primary text-2xl font-pbold">Cari Produk</Text>
      </View>
      <SearchField title="Cari Produk" value={keyword} placeholder="Cari Produk" handleChange={setKeyword} otherStyles="py-6 px-4" keyboardType="default" />
      
      <ScrollView className="w-full flex px-4">
        {products && products.map((product) => (
          <View key={product.ProductCode} className="w-full my-2">
            <CardProduct {...product} selected={selectedProductCode === product.ProductCode} handleSelect={handleToogleProduct}/>
          </View>
        ))}
      </ScrollView>
      
      <View className="w-full flex flex-row justify-center items-center py-2 px-4">
        <View className="flex-1 mr-2">
          <CustomButton title="Close" handlePress={() => setModalProductVisible(false)} containerStyles=" border border-[#007BFF]" textStyles="text-[#007BFF]" />
        </View>
        <View className="flex-1">
          <CustomButton title="Select" handlePress={() => handleSelectProduct()} containerStyles=" bg-[#007BFF]" textStyles="text-white" />
        </View>
      </View>
    </View>
  </View>
</Modal>

      
      
    </SafeAreaView>
  );
}
