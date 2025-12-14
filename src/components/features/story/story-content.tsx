import TextInput from '@/components/shared/text-input'
import useStoryContentAnimations from '@/hooks/story/animations/use-story-content-animations'
import { cn, formatDate } from '@/utils/helper'
import React, { useMemo } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native'
import Animated from 'react-native-reanimated'

type Props = {
  show: boolean
}

function StoryContent({ show }: Props) {
  const { dateAnimatedStyle, titleAnimatedStyle, descriptionAnimatedStyle } =
    useStoryContentAnimations(show)

  const dateLabel = useMemo(formatDate, [])

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className={cn(
        'absolute top-0 left-0 z-20 h-screen w-screen bg-[#0000007e]',
        show ? 'flex' : 'hidden'
      )}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[dateAnimatedStyle]}>
          <Text
            style={{
              fontFamily: 'poppinsRegular',
              fontSize: 16,
              lineHeight: 24,
              color: '#f7f2ec',
              marginBottom: Platform.OS === 'ios' ? 30 : 20,
              textAlign: 'center',
            }}>
            {dateLabel}
          </Text>
        </Animated.View>

        <Animated.View style={[titleAnimatedStyle, { width: '100%' }]}>
          <TextInput
            placeholderTextColor="#f7f2ecca"
            placeholder="What's on your mind?"
            multiline={true}
            style={{
              fontFamily: 'bitterMedium',
              textAlign: 'center',
              fontSize: 26,
              lineHeight: 32,
              marginBottom: Platform.OS === 'ios' ? 20 : 0,
              color: '#f7f2ec',
            }}
          />
        </Animated.View>

        <Animated.View style={[descriptionAnimatedStyle]}>
          <TextInput
            placeholder="Tell us more..."
            placeholderTextColor="#f7f2ecca"
            multiline={true}
            style={{
              fontFamily: 'poppinsRegular',
              color: '#f7f2ec',
              textAlign: 'center',
              fontSize: 16,
              lineHeight: 24,
            }}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default StoryContent
