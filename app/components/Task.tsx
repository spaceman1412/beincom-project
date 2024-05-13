import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";

import Animated, { FadeOutDown, useSharedValue } from "react-native-reanimated";

import { getSize } from "../themes/responsive";
import { AnimatedCheckBox } from "./AnimatedCheckBox";

export const Task = () => {
  const isOn = useSharedValue(false);

  const handlePress = () => {
    isOn.value = !isOn.value;
  };

  return (
    <Animated.View exiting={FadeOutDown} style={$openContainer}>
      <AnimatedCheckBox value={isOn} onPress={handlePress} style={$checkBox} />
      <View style={$taskContainer}>
        <Text style={$text}>aa</Text>
        <Text style={[$priorityText]}>High</Text>
      </View>
      <View style={$endContainer}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <Text style={$dateText}>{`Còn  ngày`}</Text>
      </View>
    </Animated.View>
  );
};

const $checkBox: ViewStyle = {
  width: getSize.v(35),
  height: getSize.v(35),
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
  backgroundColor: "white",
  borderRadius: 15,
  flexDirection: "row",
  paddingHorizontal: 24,
  paddingVertical: 32,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
};
