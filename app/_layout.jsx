import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import ModalAlert from '../components/ModalAlert'; // Your custom modal component
import { NativeWindStyleSheet } from "nativewind";
import GlobalProvider from '@/context/GlobalProvider';

NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // Show splash screen until fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Global Fallback UI for ErrorBoundary

  // Ensure that the splash screen logic doesn't interfere with rendering
  if (!fontsLoaded) {
    return null;  // Render nothing until fonts are loaded
  }

  

  return (
    <GlobalProvider>
      {/* ErrorBoundary wraps the entire stack to catch errors globally */}

        <Stack className="relative z-0">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Warehouse" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="[location]" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
    </GlobalProvider>
  );
}
