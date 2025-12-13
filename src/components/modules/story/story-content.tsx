import useStoryContentAnimations from '@/hooks/story/use-story-content-animations'
import { cn } from '@/utils/helper'
import React, { useMemo, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import Animated from 'react-native-reanimated'

type Props = {
  show: boolean
}

function StoryContent({ show }: Props) {
  const [content, setContent] = useState({
    title: '',
    description: '',
  })

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
        <Text className="text-soft-cream font-rounded mb-6 text-lg">{dateLabel}</Text>
      </Animated.View>

      <Animated.View style={titleAnimatedStyle}>
        <TextInput
          value={content.title}
          placeholder="What's on your mind?"
          onChangeText={(text) => setContent({ ...content, title: text })}
          className="text-soft-cream font-serif text-3xl font-bold"
        />
      </Animated.View>

      <Animated.View style={descriptionAnimatedStyle}>
        <TextInput
          value={content.description}
          placeholder="Tell us more..."
          onChangeText={(text) => setContent({ ...content, description: text })}
          className="text-soft-cream font-rounded mb-3 text-lg"
        />
      </Animated.View>
    </View>
  )
}

export default StoryContent
