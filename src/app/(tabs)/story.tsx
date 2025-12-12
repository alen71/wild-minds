import { ResizeMode, Video } from 'expo-av'
import { Image } from 'expo-image'
import { useMemo, useRef, useState } from 'react'
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import { Fonts } from '@/constants/theme'
import usePickMedia from '@/hooks/story/use-pick-media'
import useShareToInstagram from '@/hooks/story/use-share-to-instagram'

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
        <Pressable style={styles.placeholder} onPress={pickMedia}>
          <Text style={styles.placeholderText}>
            Tap to choose image or video
          </Text>
        </Pressable>
      )
    }

    if (selectedAsset.type === 'video') {
      return (
        <Video
          source={{ uri: selectedAsset.uri }}
          style={styles.media}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          isMuted
        />
      )
    }

    // Use imageUri (localUri) if available, otherwise fall back to original URI
    const uri = imageUri || selectedAsset.uri
    return <Image source={{ uri }} contentFit='cover' style={styles.media} />
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>Create Story</Text>

        <Pressable onPress={pickMedia}>
          <View ref={mediaWrapperRef} style={styles.mediaWrapper}>
            <View style={styles.media}>{renderMedia()}</View>
            <View style={styles.overlay}>
              <Text style={styles.date}>{dateLabel}</Text>
              <Text style={styles.title}>{title || 'Your title'}</Text>
              <Text style={styles.description}>
                {description || 'Add a description...'}
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder='Story title'
            style={styles.input}
            placeholderTextColor='rgba(255,255,255,0.5)'
          />
          <Text style={[styles.label, { marginTop: 16 }]}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder='Description'
            multiline
            style={[styles.input, styles.textarea]}
            placeholderTextColor='rgba(255,255,255,0.5)'
          />
        </View>

        <Button
          title={isSharing ? 'Sharing...' : 'Share to Instagram Story'}
          onPress={handleShareToInstagram}
          disabled={!selectedAsset || isSharing}
        />
      </ScrollView>
    </View>
  )
}
const baseBrown = '#4b2a16'
const softCream = '#f7f2ec'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseBrown,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  screenTitle: {
    color: softCream,
    fontSize: 24,
    fontFamily: Fonts.rounded,
    marginBottom: 12,
  },
  mediaWrapper: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#2f1a0f',
    marginBottom: 16,
    position: 'relative',
  },
  media: {
    width: '100%',
    height: 520,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  date: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginBottom: 12,
    fontFamily: Fonts.rounded,
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: Fonts.serif,
  },
  description: {
    color: '#f2e9e0',
    fontSize: 18,
    lineHeight: 26,
    fontFamily: Fonts.rounded,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3a2214',
    height: '100%',
  },
  placeholderText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontFamily: Fonts.rounded,
  },
  form: {
    marginTop: 8,
  },
  label: {
    color: softCream,
    marginBottom: 6,
    fontSize: 16,
    fontFamily: Fonts.rounded,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: softCream,
    fontSize: 16,
    fontFamily: Fonts.rounded,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  textarea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
})
