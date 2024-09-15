import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import GlobalProvider, { useGlobalContext } from '@/context/GlobalProvider';
import ModalAlert from '@/components/ModalAlert';
import Loader from '@/components/Loader';

const TabBarIcon = ({ name, color, displayName = name, active }) => {
  return (
    <View className={`items-center gap-1 py-3`}>
      <Ionicons size={24} name={name.toLowerCase()} color={color} />
      <Text className="text-xs font-psemibold">{displayName}</Text>
      <View className={`w-20 h-2 rounded-t-full ${active ? 'bg-blue-500' : 'none'}`}></View>
    </View>
  );
};

const TabScreen = ({ name, color, displayName, activeTab }) => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      activeTab(name);
    }
  }, [isFocused]);

  return (
    <TabBarIcon name={name} color={color} displayName={displayName} active={isFocused} />
  );
};

export default function TabsLayout() {
  const [activeTab, setActiveTab] = React.useState('Opname');
  const {showTabs, setShowTabs, error, setError,isLoading,setIsLoading} = useGlobalContext(); // Tambahkan state untuk mengatur visibilitas tabs
  
  const tabBarStyle = showTabs ? {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
    height: 60,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
  } : {
    display: 'none',
    
  };
  return (
    <>
      <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: tabBarStyle,
          }}
        >
          <Tabs.Screen
            name="Opname"
            options={{
              headerShown: false,
              title: 'Opname',
              tabBarIcon: ({ color }) => (
                <TabScreen
                  name="checkmark-circle-outline"
                  color="#8CC152"
                  displayName="Opname"
                  activeTab={setActiveTab}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Hasil"
            options={{
              headerShown: false,
              title: 'Hasil',
              tabBarIcon: ({ color }) => (
                <TabScreen
                  name="list"
                  color="#DA4453"
                  displayName="Hasil"
                  activeTab={setActiveTab}
                />
              ),
            }}
          />
        </Tabs>
        <Loader isLoading={isLoading} />
        <ModalAlert title={'Error'} description={error} visible={error !== null} setVisible={() => setError(null)} />
    </>
  );
}
