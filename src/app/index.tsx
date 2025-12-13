import RenderMedia from '@/components/modules/story/render-media'
import StoryActions from '@/components/modules/story/story-actions'
import StoryContent from '@/components/modules/story/story-content'
import usePickMedia from '@/hooks/story/use-pick-media'
import useShareToInstagram from '@/hooks/story/use-share-to-instagram'
import { X } from 'lucide-react-native'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ViewShot from 'react-native-view-shot'

export default function StoryScreen() {
  const safeAreaInsets = useSafeAreaInsets()

  const { pickMedia, selectedAsset, clearMedia } = usePickMedia()

  const { handleShareToInstagram, isSharing, mediaWrapperRef } = useShareToInstagram({
    selectedAsset,
  })

  return (
    <View className="bg-base-brown flex-1">
      {/* Clear story button */}
      {selectedAsset && (
        <Pressable
          style={{ top: safeAreaInsets.top + 20, right: 20, zIndex: 30, position: 'absolute' }}
          onPress={clearMedia}>
          <X size={26} color="white" />
        </Pressable>
      )}

      {/* Media wrapper */}
      <ViewShot ref={mediaWrapperRef} style={{ flex: 1 }}>
        {/* Story content */}
        <StoryContent show={!!selectedAsset} />

        {/* Render media */}
        <RenderMedia pickMedia={pickMedia} selectedAsset={selectedAsset} />
      </ViewShot>
      {/* Story actions */}
      <StoryActions handleShareToInstagram={handleShareToInstagram} isSharing={isSharing} />
    </View>
  )
}
