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
import { editTodo, Todo } from "../store/todoSlice";
import { useAppDispatch } from "../store/store";

type TaskProps = {
  isOpen: boolean;
  value: Todo;
};

export const Task = (props: TaskProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const dispatch = useAppDispatch();

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(props.value.isDone),
      [0, 1],
      [colors.background, colors.green]
    );
    const colorValue = withTiming(color, { duration: 400 });

    return {
      backgroundColor: colorValue,
    };
  });

  const changeStatus = () => {
    setIsOpen((currentOpen) => !currentOpen);
  };

  const handleDone = (todo: Todo) => {
    dispatch(editTodo(todo));
    changeStatus();
  };

  return (
    <Animated.View
      exiting={FadeOutDown}
      style={[$openContainer, trackAnimatedStyle]}
    >
      {isOpen ? (
        <OpenTask
          handleCancel={() => changeStatus()}
          handleDone={handleDone}
          value={props.value}
        />
      ) : (
        <ClosedTask handleEdit={changeStatus} value={props.value} />
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
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  alignItems: "center",
};
