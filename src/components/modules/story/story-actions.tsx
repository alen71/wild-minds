import { Instagram } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { Pressable, PressableProps, Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type Props = PressableProps & {
  handleShareToInstagram: () => void
  isSharing: boolean
}

function StoryActions({ handleShareToInstagram, isSharing }: Props) {
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 450,
      easing: Easing.out(Easing.ease),
    })
  }, [opacity])

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View className="absolute right-0 bottom-0 left-0 z-40 px-5 pb-10">
      <Animated.View
        style={[containerAnimatedStyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        {/* Save button */}
        <Pressable className="flex-1 items-center justify-center">
          <Text className="font-rounded text-soft-cream ml-2 text-xl">Save</Text>
        </Pressable>

        {/* Share to Stories button */}
        <Pressable
          onPress={handleShareToInstagram}
          disabled={isSharing}
          className="bg-soft-cream flex-row items-center rounded-full px-5 py-3">
          <Instagram size={20} />
          <Text className="text-base-brown font-rounded ml-2 text-lg">
            {isSharing ? 'Sharing...' : 'Share to Stories'}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}

export default StoryActions
