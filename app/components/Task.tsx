import { ViewStyle } from "react-native";
import React, { useState } from "react";

import Animated, {
  FadeOutDown,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { colors } from "../themes/color";

import { ClosedTask } from "./ClosedTask";
import { OpenTask } from "./OpenTask";

export const Task = () => {
  const [isDone, setIsDone] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(isDone),
      [0, 1],
      [colors.background, colors.green]
    );
    const colorValue = withTiming(color, { duration: 400 });

    return {
      backgroundColor: colorValue,
    };
  });

  return (
    <Animated.View
      exiting={FadeOutDown}
      style={[$openContainer, trackAnimatedStyle]}
    >
      {isEdit ? (
        <OpenTask
          handleDone={() => {
            setIsEdit((prev) => !prev);
          }}
        />
      ) : (
        <ClosedTask
          handleEdit={() => {
            setIsEdit((prev) => !prev);
          }}
          isDone={isDone}
          handleCheckBox={() => {
            setIsDone((prev) => !prev);
          }}
        />
      )}
    </Animated.View>
  );
};

const $openContainer: ViewStyle = {
  backgroundColor: colors.green,
  borderRadius: 15,
  flexDirection: "row",
  paddingHorizontal: 24,
  paddingVertical: 16,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  alignItems: "center",
};
