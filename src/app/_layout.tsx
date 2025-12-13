import '../style/global.css'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

export const unstable_settings = {
  anchor: 'index',
}

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden')
  }, [])

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
