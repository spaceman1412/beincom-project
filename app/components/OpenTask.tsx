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

type OpenTaskProps = {
  handleDone: () => void;
};

export const OpenTask = (props: OpenTaskProps) => {
  const { handleDone } = props;

  const [text, onChangeText] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <Animated.View exiting={FadeOutUp} style={$mainContainer}>
      <View
        style={{
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <Feather name="trash-2" size={24} color="black" />
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
    </Animated.View>
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
