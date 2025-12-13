import useStoryContentAnimations from '@/hooks/story/use-story-content-animations'
import { cn } from '@/utils/helper'
import React, { useMemo } from 'react'
import { Platform, Text, TextInput, View } from 'react-native'
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
            marginBottom: Platform.OS === 'ios' ? 30 : 20,
          }}>
          {dateLabel}
        </Text>
      </Animated.View>

      <Animated.View style={titleAnimatedStyle}>
        <TextInput
          placeholderTextColor="#f7f2ecca"
          placeholder="What's on your mind?"
          style={{
            fontFamily: 'bitterMedium',
            fontSize: 26,
            lineHeight: 32,
            marginBottom: Platform.OS === 'ios' ? 20 : 0,
            color: '#f7f2ec',
          }}
        />
      </Animated.View>

      <Animated.View style={descriptionAnimatedStyle}>
        <TextInput
          placeholder="Tell us more..."
          placeholderTextColor="#f7f2ecca"
          style={{
            fontFamily: 'poppinsRegular',
            color: '#f7f2ec',
            marginBottom: 10,
            fontSize: 16,
            lineHeight: 24,
          }}
        />
      </Animated.View>
    </View>
  )
}

export default StoryContent
