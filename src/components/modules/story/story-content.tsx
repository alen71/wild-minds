import { cn } from '@/utils/helper'
import React, { useEffect, useMemo, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  show: boolean
}

function StoryContent({ show }: Props) {
  const [content, setContent] = useState({
    title: '',
    description: '',
  })

  // Animation values
  const dateOpacity = useSharedValue(0)
  const titleOpacity = useSharedValue(0)
  const descriptionOpacity = useSharedValue(0)

  const dateLabel = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    return formatter.format(new Date())
  }, [])

  useEffect(() => {
    if (show) {
      // Date label animation - starts immediately
      dateOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease),
      })

      // Title animation - 150ms delay
      titleOpacity.value = withDelay(
        150,
        withTiming(1, {
          duration: 800,
          easing: Easing.out(Easing.ease),
        })
      )

      // Description animation - 300ms delay
      descriptionOpacity.value = withDelay(
        300,
        withTiming(1, {
          duration: 800,
          easing: Easing.out(Easing.ease),
        })
      )
    } else {
      // Reset animations when hidden
      dateOpacity.value = 0
      titleOpacity.value = 0
      descriptionOpacity.value = 0
    }
  }, [show, dateOpacity, titleOpacity, descriptionOpacity])

  const dateAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dateOpacity.value,
  }))

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }))

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: descriptionOpacity.value,
  }))

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
          placeholder="Your title"
          onChangeText={(text) => setContent({ ...content, title: text })}
          className="text-soft-cream font-serif text-3xl font-bold"
        />
      </Animated.View>

      <Animated.View style={descriptionAnimatedStyle}>
        <TextInput
          value={content.description}
          placeholder="Your description"
          onChangeText={(text) => setContent({ ...content, description: text })}
          className="text-soft-cream font-rounded mb-3 text-lg"
        />
      </Animated.View>
    </View>
  )
}

export default StoryContent
