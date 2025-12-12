import usePickMedia from '@/hooks/story/use-pick-media'
import useShareToInstagram from '@/hooks/story/use-share-to-instagram'
import { Image } from 'expo-image'
import { useVideoPlayer, VideoView } from 'expo-video'
import { useMemo, useRef, useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'

export default function StoryScreen() {
  const { pickMedia, selectedAsset, imageUri } = usePickMedia()
  const mediaWrapperRef = useRef<View | null>(null)

  const [title, setTitle] = useState('Affirmation')
  const [description, setDescription] = useState(
    "I explore my inner landscape with curiosity and trust,\nknowing that every discovery reveals more of who I'm becoming."
  )

  const { handleShareToInstagram, isSharing } = useShareToInstagram({
    selectedAsset,
    imageUri,
    mediaWrapperRef,
  })

  const dateLabel = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    return formatter.format(new Date())
  }, [])

  const renderMedia = () => {
    if (!selectedAsset) {
      return (
        <Pressable
          className="bg-base-brown h-96 flex-1 items-center justify-center"
          onPress={pickMedia}>
          <Text className="text-soft-cream font-rounded text-lg">Tap to choose image or video</Text>
        </Pressable>
      )
    }

    if (selectedAsset.type === 'video') {
      const player = useVideoPlayer(selectedAsset.uri, (player) => {
        player.loop = true
        player.play()
        player.muted = true
      })

      return <VideoView player={player} className="h-96 w-full" />
    }

    // Use imageUri (localUri) if available, otherwise fall back to original URI
    const uri = imageUri || selectedAsset.uri
    return <Image source={{ uri }} contentFit="cover" className="h-96 w-full" />
  }

  return (
    <View className="bg-base-brown flex-1">
      <ScrollView className="p-5 pb-10">
        <Text className="text-soft-cream font-rounded mb-3 text-2xl">Create Story</Text>

        <Pressable onPress={pickMedia}>
          <View
            ref={mediaWrapperRef}
            className="bg-base-brown relative mb-4 overflow-hidden rounded-3xl">
            <View className="h-96 w-full">{renderMedia()}</View>
            <View className="absolute right-0 bottom-0 left-0 justify-end bg-black/25 p-6">
              <Text className="text-soft-cream font-rounded mb-3 text-2xl">{dateLabel}</Text>
              <Text className="text-soft-cream mb-3 font-serif text-4xl font-bold">
                {title || 'Your title'}
              </Text>
              <Text className="text-soft-cream font-rounded mb-3 text-lg">
                {description || 'Add a description...'}
              </Text>
            </View>
          </View>
        </Pressable>

        <View className="mt-8">
          <Text className="text-soft-cream font-rounded mb-3 text-lg">Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Story title"
            className="border-soft-cream/20 text-soft-cream rounded-xl border-2 bg-black/5 p-3"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          <Text className="text-soft-cream font-rounded mb-3 text-lg">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
            className="border-soft-cream/20 text-soft-cream rounded-xl border-2 bg-black/5 p-3"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
        </View>

        <Pressable onPress={handleShareToInstagram} disabled={!selectedAsset || isSharing}>
          <Text>{isSharing ? 'Sharing...' : 'Share to Instagram Story'}</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
