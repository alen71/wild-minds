import usePlaceholderAnimation from '@/hooks/story/animations/use-placeholder-animation'
import { ImagePickerAsset } from 'expo-image-picker'
import { useVideoPlayer, VideoView } from 'expo-video'
import React from 'react'
import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native'
import Animated from 'react-native-reanimated'

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
  const placeholderAnimatedStyle = usePlaceholderAnimation(selectedAsset)

  if (!selectedAsset) {
    return (
      <Animated.View
        style={[
          placeholderAnimatedStyle,
          { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}>
        <Pressable className="h-full w-full items-center justify-center" onPress={pickMedia}>
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
