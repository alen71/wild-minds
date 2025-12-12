import { Asset } from 'expo-asset'
import * as ImagePicker from 'expo-image-picker'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'

function usePickMedia() {
  const [selectedAsset, setSelectedAsset] =
    useState<ImagePicker.ImagePickerAsset | null>(null)
  const [imageUri, setImageUri] = useState<string | null>(null)

  const pickMedia = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Allow photo access to choose a background.'
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 1,
      videoMaxDuration: 30,
    })

    if (!result.canceled) {
      const pickedAsset = result.assets[0]
      setSelectedAsset(pickedAsset)

      // Get localUri similar to Asset.fromModule pattern
      const asset = Asset.fromURI(pickedAsset.uri)
      await asset.downloadAsync()
      setImageUri(asset.localUri || null)
    }
  }, [])

  return { pickMedia, selectedAsset, imageUri }
}

export default usePickMedia
