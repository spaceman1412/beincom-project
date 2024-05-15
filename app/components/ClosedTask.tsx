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

import { Todo, toggleCheckBox } from "../store/todoSlice";
import { useAppDispatch } from "../store/store";
import { getDatesBetween, priorityColors } from "../themes/constant";

type ClosedTaskProps = {
  handleEdit: () => void;
  value: Todo;
};

export const ClosedTask = (props: ClosedTaskProps) => {
  const { handleEdit, value } = props;

  const dispatch = useAppDispatch();

  return (
    <>
      <AnimatedCheckBox
        value={value.isDone}
        onPress={() => {
          dispatch(toggleCheckBox(value.id));
        }}
        style={$checkBox}
      />
      <View style={$taskContainer}>
        <Text style={$text} numberOfLines={1}>
          {value.text}
        </Text>
        {!value.isDone && (
          <Animated.Text
            entering={FadeInUp}
            exiting={FadeOutDown}
            style={[$priorityText, { color: priorityColors[value.priority] }]}
          >
            {value.priority}
          </Animated.Text>
        )}
      </View>

      {!value.isDone && (
        <Animated.View
          entering={FadeInLeft}
          exiting={FadeOutRight}
          style={$endContainer}
        >
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesome name="pencil" size={24} color="black" />
          </TouchableOpacity>
          {getDatesBetween(value.date) > 0 && (
            <Text style={$dateText}>{`About ${getDatesBetween(
              value.date
            )} days`}</Text>
          )}
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
  marginTop: getSize.v(8),
};

const $priorityText: TextStyle = {
  fontSize: 14,
  fontWeight: "400",
  marginTop: getSize.v(8),
};

const $endContainer: ViewStyle = {
  marginRight: 24,
  alignItems: "flex-end",
  justifyContent: "space-between",
};

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
  paddingEnd: 16,
};

const $taskContainer: ViewStyle = {
  marginStart: 20,
  flex: 1,
  justifyContent: "space-between",
};
