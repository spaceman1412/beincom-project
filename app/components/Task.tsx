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
import { Todo } from "../store/todoSlice";

type TaskProps = {
  isOpen: boolean;
  handleCancel: () => void;
  handleDone: () => void;
  handleEdit: () => void;
  value: Todo;
};

export const Task = (props: TaskProps) => {
  const { isOpen, handleCancel, handleDone, handleEdit, value } = props;

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(value.isDone),
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
      {isOpen ? (
        <OpenTask
          handleCancel={handleCancel}
          handleDone={handleDone}
          value={value}
        />
      ) : (
        <ClosedTask handleEdit={handleEdit} value={value} />
      )}
    </Animated.View>
  );
};

const $openContainer: ViewStyle = {
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
