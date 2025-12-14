import React, { useEffect, useRef, useState } from 'react'
import { Platform, TextInput as RNTextInput, Text, TextInputProps, View } from 'react-native'

type IOSTextInputProps = TextInputProps

/**
 * Custom TextInput component that uses a custom implementation for iOS
 * with line wrapping detection and standard TextInput for Android
 */
function TextInput(props: IOSTextInputProps) {
  const { style, value, onChangeText, onContentSizeChange, ...restProps } = props

  // Extract lineHeight from style for line calculation
  const lineHeight =
    (style && typeof style === 'object' && 'lineHeight' in style
      ? (style as any).lineHeight
      : null) || 20

  const [containerWidth, setContainerWidth] = useState(0)
  const [textValue, setTextValue] = useState(value || '')
  const previousLineCountRef = useRef(1)

  // Sync internal state with external value prop (for controlled components)
  useEffect(() => {
    if (value !== undefined) {
      setTextValue(value)
    }
  }, [value])

  const handleTextChange = (text: string) => {
    setTextValue(text)
    onChangeText?.(text)
  }

  const handleContentSizeChange = (event: any) => {
    const { height } = event.nativeEvent.contentSize
    const calculatedLines = Math.max(1, Math.ceil(height / lineHeight))

    previousLineCountRef.current = calculatedLines
    onContentSizeChange?.(event)
  }

  if (Platform.OS === 'ios') {
    // Custom iOS implementation with line wrapping detection
    return (
      <View
        style={{ width: '100%' }}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          setContainerWidth(width)
        }}>
        {/* Hidden Text component to measure text wrapping */}
        {containerWidth > 0 && (
          <Text
            pointerEvents="none"
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout

              const calculatedLines = Math.max(1, Math.ceil(height / lineHeight))

              previousLineCountRef.current = calculatedLines
            }}
            style={[
              style,
              {
                position: 'absolute',
                opacity: 0,
                width: containerWidth,
                zIndex: -1,
              },
            ]}>
            {textValue || ' '}
          </Text>
        )}
        <RNTextInput
          {...restProps}
          value={textValue}
          onChangeText={handleTextChange}
          onContentSizeChange={handleContentSizeChange}
          style={style}
        />
      </View>
    )
  }

  // Standard TextInput for Android
  return <RNTextInput {...props} />
}

export default TextInput
