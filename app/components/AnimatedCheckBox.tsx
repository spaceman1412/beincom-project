import React from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { AntDesign } from "@expo/vector-icons";
import { getSize } from "../themes/responsive";
import { colors } from "../themes/color";

type AnimatedCheckBoxProps = {
  value: boolean;
  onPress: () => void;
  style: ViewStyle;
  duration?: number;
  trackColors?: {
    on: string;
    off: string;
  };
};

export const AnimatedCheckBox = ({
  value,
  onPress,
  style,
  duration = 400,
  trackColors = { on: colors.purple, off: colors.orange },
}: AnimatedCheckBoxProps) => {
  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(value),
      [0, 1],
      [trackColors.off, trackColors.on]
    );
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
    };
  });

  const derivedWidth = useDerivedValue(() =>
    withTiming(22 * Number(value), {
      duration,
    })
  );

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: derivedWidth.value,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[style, trackAnimatedStyle]}>
        <Animated.View style={thumbAnimatedStyle}>
          <AntDesign name="check" size={getSize.v(17)} color="white" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};
