import { ImagePickerAsset } from 'expo-image-picker'
import { RefObject, useState } from 'react'
import { Alert, View } from 'react-native'
import Share, { ShareSingleOptions, Social } from 'react-native-share'
import { captureRef } from 'react-native-view-shot'

interface UseShareToInstagramParams {
  selectedAsset: ImagePickerAsset | null
  imageUri: string | null
  mediaWrapperRef: RefObject<View | null>
}

function useShareToInstagram({
  selectedAsset,
  imageUri,
  mediaWrapperRef,
}: UseShareToInstagramParams) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShareToInstagram = async () => {
    const appId = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID

    if (!appId) {
      Alert.alert(
        'No app ID',
        'Please set the app ID in the environment variables'
      )
      return
    }

    if (!selectedAsset) {
      Alert.alert('No media', 'Please select an image or video first')
      return
    }

    setIsSharing(true)

    try {
      const isVideo = selectedAsset.type === 'video'
      let mediaUri: string

      if (isVideo) {
        // For videos, use the video URI directly
        // Note: Videos won't include the overlay (title, description, date)
        // The overlay would need video processing to composite it onto the video
        mediaUri = imageUri || selectedAsset.uri
      } else {
        // For images, capture the view with overlay (title, description, date)
        if (!mediaWrapperRef.current) {
          Alert.alert('Error', 'Media wrapper ref is not available')
          setIsSharing(false)
          return
        }

        mediaUri = await captureRef(mediaWrapperRef, {
          format: 'png',
          quality: 1,
        })
      }

      // Share directly to Instagram Stories using react-native-share
      // This opens Instagram Stories editor with the media pre-loaded
      const shareOptions: ShareSingleOptions = {
        social: Social.InstagramStories,
        appId,
      }

      if (isVideo) {
        shareOptions.backgroundVideo = mediaUri
      } else {
        shareOptions.backgroundImage = mediaUri
      }

      await Share.shareSingle(shareOptions)
    } catch (error: any) {
      console.error('Error sharing to Instagram Stories:', error)
      Alert.alert('Sharing failed', 'Failed to share to Instagram Stories')
    } finally {
      setIsSharing(false)
    }
  }

  return { handleShareToInstagram, isSharing }
}

export default useShareToInstagram
