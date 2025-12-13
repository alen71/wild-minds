import useStoryContentAnimations from '@/hooks/story/use-story-content-animations'
import { cn } from '@/utils/helper'
import React, { useMemo } from 'react'
import { Text, TextInput, View } from 'react-native'
import Animated from 'react-native-reanimated'

type Props = {
  show: boolean
}

function StoryContent({ show }: Props) {
  const { dateAnimatedStyle, titleAnimatedStyle, descriptionAnimatedStyle } =
    useStoryContentAnimations(show)

  const dateLabel = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    return formatter.format(new Date())
  }, [])

  return (
    <View
      className={cn(
        'absolute top-0 left-0 z-20 h-screen w-screen items-center justify-center bg-[#0000007e] p-6',
        show ? 'flex' : 'hidden'
      )}>
      <Animated.View style={dateAnimatedStyle}>
        <Text
          style={{
            fontFamily: 'poppinsRegular',
            fontSize: 16,
            lineHeight: 24,
            color: '#f7f2ec',
            marginBottom: 16,
          }}>
          {dateLabel}
        </Text>
      </Animated.View>

      <Animated.View style={titleAnimatedStyle}>
        <TextInput
          placeholder="What's on your mind?"
          style={{ fontFamily: 'bitterMedium', fontSize: 28, lineHeight: 32 }}
        />
      </Animated.View>

      <Animated.View style={descriptionAnimatedStyle}>
        <TextInput
          placeholder="Tell us more..."
          style={{ fontFamily: 'poppinsRegular' }}
          className="text-soft-cream mb-3 text-lg"
        />
      </Animated.View>
    </View>
  )
}

export default StoryContent
