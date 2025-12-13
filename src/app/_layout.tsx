import '../style/global.css'
import { useColorScheme } from '@/hooks/use-color-scheme'
import useLoadFonts from '@/hooks/use-load-fonts'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

export const unstable_settings = {
  anchor: 'index',
}

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const fontsLoaded = useLoadFonts()

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden')
  }, [])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
