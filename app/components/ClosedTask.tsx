import {
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import { AnimatedCheckBox } from "./AnimatedCheckBox";
import Animated, {
  FadeInLeft,
  FadeInUp,
  FadeOutDown,
  FadeOutRight,
} from "react-native-reanimated";
import { getSize } from "../themes/responsive";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

type ClosedTaskProps = {
  handleEdit: () => void;
};

export const ClosedTask = (props: ClosedTaskProps) => {
  const [isDone, setIsDone] = useState(false);

  const { handleEdit } = props;

  return (
    <>
      <AnimatedCheckBox
        value={isDone}
        onPress={() => {
          setIsDone(false);
        }}
        style={$checkBox}
      />
      <View style={$taskContainer}>
        <Text style={$text}>aa</Text>
        {!isDone && (
          <Animated.Text
            entering={FadeInUp}
            exiting={FadeOutDown}
            style={$priorityText}
          >
            High
          </Animated.Text>
        )}
      </View>

      {!isDone && (
        <Animated.View
          entering={FadeInLeft}
          exiting={FadeOutRight}
          style={$endContainer}
        >
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesome name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <Text style={$dateText}>{`Còn  ngày`}</Text>
        </Animated.View>
      )}
    </>
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

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
};

const $taskContainer: ViewStyle = {
  marginStart: 20,
  flex: 1,
  justifyContent: "space-between",
};
