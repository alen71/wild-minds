import { ImagePickerAsset } from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useState } from 'react'
import { Alert, InteractionManager, View } from 'react-native'
import { captureRef } from 'react-native-view-shot'

interface UseSaveToGalleryParams {
  selectedAsset: ImagePickerAsset | null
  mediaWrapperRef: React.RefObject<View | null>
}

function useSaveToGallery({ selectedAsset, mediaWrapperRef }: UseSaveToGalleryParams) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveToGallery = async () => {
    if (!selectedAsset) {
      Alert.alert('No media', 'Please select an image or video first')
      return
    }

    setIsSaving(true)

    try {
      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to save media to your gallery.')
        setIsSaving(false)
        return
      }

      const isVideo = selectedAsset.type === 'video'
      let mediaUri: string

      if (isVideo) {
        // For videos, use the video URI directly
        // Note: Videos won't include the overlay (title, description, date)
        // The overlay would need video processing to composite it onto the video
        mediaUri = selectedAsset.uri
      } else {
        // For images, capture the view with overlay (title, description, date)
        if (!mediaWrapperRef.current) {
          Alert.alert('Error', 'Media wrapper ref is not available')
          setIsSaving(false)
          return
        }

        // Wait for the view to be fully laid out before capturing
        // This ensures the view is ready and prevents "No view found with reactTag" errors
        await new Promise<void>((resolve) => {
          InteractionManager.runAfterInteractions(() => {
            // Additional delay to ensure view is fully rendered and laid out
            setTimeout(resolve, 200)
          })
        })

        mediaUri = await captureRef(mediaWrapperRef, {
          format: 'png',
          quality: 1,
        })
      }

      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(mediaUri)

      // Create album if it doesn't exist (optional - you can customize the album name)
      const albumName = 'Social Sharing'
      let album = await MediaLibrary.getAlbumAsync(albumName)
      if (!album) {
        album = await MediaLibrary.createAlbumAsync(albumName, asset, false)
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
      }

      Alert.alert('Success', 'Media saved to gallery!')
    } catch (error: any) {
      console.error('Error saving to gallery:', error)
      Alert.alert('Save failed', 'Failed to save media to gallery')
    } finally {
      setIsSaving(false)
    }
  }

  return { handleSaveToGallery, isSaving }
}

export default useSaveToGallery
