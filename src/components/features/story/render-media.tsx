import { ImagePickerAsset } from 'expo-image-picker'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect } from 'react'
import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  pickMedia: () => void
  selectedAsset: ImagePickerAsset | null
}

function VideoPlayer({ uri, height }: { uri: string; height: number }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true
    player.play()
    player.muted = true
  })

  return (
    <VideoView player={player} contentFit="cover" className="h-full w-full" style={{ height }} />
  )
}

function RenderMedia({ pickMedia, selectedAsset }: Props) {
  const { height, width } = useWindowDimensions()
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

  if (!selectedAsset) {
    return (
      <Animated.View
        style={[
          placeholderAnimatedStyle,
          { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}>
        <Pressable className="w-full items-center justify-center" onPress={pickMedia}>
          <Text
            style={{
              fontFamily: 'poppinsRegular',
              fontSize: 18,
              lineHeight: 24,
              color: '#f7f2ec',
              width: '100%',
              textAlign: 'center',
            }}>
            Tap to choose image or video
          </Text>
        </Pressable>
      </Animated.View>
    )
  }

  if (selectedAsset.type === 'video') {
    return <VideoPlayer uri={selectedAsset.uri} height={height} />
  }

  return (
    <View className="h-screen w-screen">
      <Image
        source={{ uri: selectedAsset.uri }}
        resizeMode="cover"
        className="h-full w-full"
        style={{ height, width }}
      />
    </View>
  )
}

export default RenderMedia
