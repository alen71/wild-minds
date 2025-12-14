import { useEffect } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

function useStoryContentAnimations(show: boolean) {
  // Animation values
  const dateOpacity = useSharedValue(0)
  const titleOpacity = useSharedValue(0)
  const descriptionOpacity = useSharedValue(0)

  useEffect(() => {
    if (show) {
      // Date label animation - starts immediately
      dateOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      })

      // Title animation - 150ms delay
      titleOpacity.value = withDelay(
        500,
        withTiming(1, {
          duration: 800,
          easing: Easing.out(Easing.ease),
        })
      )

      // Description animation - 300ms delay
      descriptionOpacity.value = withDelay(
        1000,
        withTiming(1, {
          duration: 1000,
          easing: Easing.out(Easing.ease),
        })
      )
    } else {
      // Reset animations when hidden
      dateOpacity.value = 0
      titleOpacity.value = 0
      descriptionOpacity.value = 0
    }
  }, [show, dateOpacity, titleOpacity, descriptionOpacity])

  const dateAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dateOpacity.value,
  }))

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }))

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: descriptionOpacity.value,
  }))

  return {
    dateAnimatedStyle,
    titleAnimatedStyle,
    descriptionAnimatedStyle,
  }
}

export default useStoryContentAnimations
