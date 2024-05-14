import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  TextStyle,
} from "react-native";
import Animated, { FadeOutUp } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { getSize } from "../themes/responsive";
import { colors } from "../themes/color";
import { DateTextBox } from "./DateTextBox";
import { PickerTextBox } from "./PickerTextBox";
import { Todo } from "../store/todoSlice";

type OpenTaskProps = {
  handleDone: () => void;
  handleCancel: () => void;
};

export const OpenTask = (props: OpenTaskProps) => {
  const { handleDone, handleCancel } = props;

  const [text, onChangeText] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <View style={$mainContainer}>
      <View
        style={{
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handleCancel}>
          <Text style={$text}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={text}
        autoFocus
        onChangeText={onChangeText}
        style={{
          borderBottomWidth: 1,
          fontSize: getSize.font(18),
          fontWeight: "500",
          paddingVertical: 4,
        }}
      />

      <DateTextBox date={date} setDate={setDate} />

      <PickerTextBox />

      <TouchableOpacity onPress={handleDone} style={$confirmButton}>
        <Text style={[{ color: colors.background }, $text]}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const $mainContainer: ViewStyle = {
  flex: 1,
};

const $confirmButton: ViewStyle = {
  width: getSize.s(100),
  height: getSize.v(35),
  borderRadius: 20,
  backgroundColor: colors.strongGreen,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginTop: 16,
};

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
};
