import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { FontAwesome } from "@expo/vector-icons";

import Animated, {
  FadeOutDown,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { getSize } from "../themes/responsive";
import { AnimatedCheckBox } from "./AnimatedCheckBox";
import { colors } from "../themes/color";

export const Task = () => {
  const [isOn, setIsOn] = useState(false);

  const handlePress = () => {
    setIsOn((prev) => !prev);
  };

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(isOn),
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
      <AnimatedCheckBox value={isOn} onPress={handlePress} style={$checkBox} />
      <View style={$taskContainer}>
        <Text style={$text}>aa</Text>
        {!isOn && <Text style={[$priorityText]}>High</Text>}
      </View>

      {!isOn && (
        <View style={$endContainer}>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <Text style={$dateText}>{`Còn  ngày`}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const $checkBox: ViewStyle = {
  width: getSize.v(30),
  height: getSize.v(30),
  borderRadius: getSize.v(10),
  padding: getSize.v(7),
};

const $dateText: TextStyle = {
  fontSize: 12,
  fontWeight: "400",
};

const $priorityText: TextStyle = {
  fontSize: 14,
  fontWeight: "400",
  color: "green",
};

const $endContainer: ViewStyle = {
  marginRight: 24,
  alignItems: "flex-end",
  justifyContent: "space-between",
};

const $taskContainer: ViewStyle = {
  marginStart: 20,
  flex: 1,
  justifyContent: "space-between",
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

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
};
