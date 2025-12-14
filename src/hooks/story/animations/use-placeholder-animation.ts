import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

function usePlaceholderAnimation(selectedAsset: unknown) {
  const placeholderOpacity = useSharedValue(0)
  const placeholderTranslateY = useSharedValue(12)

  useEffect(() => {
    if (!selectedAsset) {
      // Reset then play a subtle luxury fade/slide-in
      placeholderOpacity.value = 0
      placeholderTranslateY.value = 12

      placeholderOpacity.value = withDelay(
        120,
        withTiming(1, { duration: 520, easing: Easing.out(Easing.ease) })
      )

      placeholderTranslateY.value = withDelay(
        120,
        withTiming(0, { duration: 520, easing: Easing.out(Easing.ease) })
      )
    }
  }, [selectedAsset, placeholderOpacity, placeholderTranslateY])

  const placeholderAnimatedStyle = useAnimatedStyle(() => ({
    opacity: placeholderOpacity.value,
    transform: [{ translateY: placeholderTranslateY.value }],
  }))

  return placeholderAnimatedStyle
}

export default usePlaceholderAnimation
