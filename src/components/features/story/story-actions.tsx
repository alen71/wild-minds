import { Instagram } from 'lucide-react-native'
import React, { useEffect } from 'react'
import { Pressable, PressableProps, Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

type Props = PressableProps & {
  handleShareToInstagram: () => void
  isSharing: boolean
  handleSaveToGallery: () => void
  isSaving: boolean
}

function StoryActions({ handleShareToInstagram, isSharing, handleSaveToGallery, isSaving }: Props) {
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(
      400,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.ease),
      })
    )
  }, [opacity])

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View className="absolute right-0 bottom-0 left-0 z-40 px-5 pb-10">
      <Animated.View
        style={[containerAnimatedStyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        {/* Save button */}
        <Pressable
          onPress={handleSaveToGallery}
          disabled={isSaving}
          className="flex-1 items-center justify-center">
          <Text className="text-soft-cream ml-2 text-lg">{isSaving ? 'Saving...' : 'Save'}</Text>
        </Pressable>

        {/* Share to Stories button */}
        <Pressable
          onPress={handleShareToInstagram}
          disabled={isSharing}
          className="bg-soft-cream w-1/2 flex-row items-center justify-center rounded-full py-4">
          <Instagram size={19} />
          <Text
            style={{ fontFamily: 'poppinsMedium', fontSize: 14, lineHeight: 24, marginLeft: 6 }}>
            {isSharing ? 'Sharing...' : 'Share to Stories'}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}

export default StoryActions
