import RenderMedia from '@/components/features/story/render-media'
import StoryActions from '@/components/features/story/story-actions'
import StoryContent from '@/components/features/story/story-content'
import usePickMedia from '@/hooks/story/use-pick-media'
import useSaveToGallery from '@/hooks/story/use-save-to-gallery'
import useShareToInstagram from '@/hooks/story/use-share-to-instagram'
import { X } from 'lucide-react-native'
import { Platform, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ViewShot from 'react-native-view-shot'

export default function StoryScreen() {
  const safeAreaInsets = useSafeAreaInsets()

  const { pickMedia, selectedAsset, clearMedia } = usePickMedia()

  const { handleShareToInstagram, isSharing, mediaWrapperRef } = useShareToInstagram({
    selectedAsset,
  })

  const { handleSaveToGallery, isSaving } = useSaveToGallery({
    selectedAsset,
    mediaWrapperRef: mediaWrapperRef as React.RefObject<View | null>,
  })

  const showContent = !!selectedAsset && selectedAsset.type === 'image'

  return (
    <View className="bg-base-brown flex-1">
      {/* Clear story button */}
      {selectedAsset && (
        <Pressable
          style={{
            top: safeAreaInsets.top + 20,
            right: Platform.OS === 'ios' ? 30 : 20,
            zIndex: 30,
            position: 'absolute',
          }}
          onPress={clearMedia}>
          <X size={26} color="white" />
        </Pressable>
      )}

      {/* Media wrapper */}
      <ViewShot ref={mediaWrapperRef} style={{ flex: 1 }}>
        {/* Story content */}
        <StoryContent show={showContent} />

        {/* Render media */}
        <RenderMedia pickMedia={pickMedia} selectedAsset={selectedAsset} />
      </ViewShot>

      {/* Story actions */}
      <StoryActions
        handleShareToInstagram={handleShareToInstagram}
        isSharing={isSharing}
        handleSaveToGallery={handleSaveToGallery}
        isSaving={isSaving}
      />
    </View>
  )
}
