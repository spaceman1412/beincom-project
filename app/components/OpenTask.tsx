import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  TextStyle,
  Alert,
} from "react-native";
import { getSize } from "../themes/responsive";
import { colors } from "../themes/color";
import { DateTextBox } from "./DateTextBox";
import { PickerTextBox } from "./PickerTextBox";
import { priority, Todo } from "../store/todoSlice";

type OpenTaskProps = {
  handleDone: (todo: Todo) => void;
  handleCancel: () => void;
  value: Todo;
};

export const OpenTask = (props: OpenTaskProps) => {
  const { handleDone, handleCancel, value } = props;

  const [text, onChangeText] = useState(value.text);
  const [date, setDate] = useState(new Date(value.date));
  const [priority, setPriority] = useState(value.priority);

  const currentTodo: Todo = {
    text,
    date: date.toISOString(),
    priority: priority,
    id: value.id,
    isDone: false,
  };

  const checkError = () => {
    // Check title is empty or not
    if (text === "" || text === undefined) {
      return true;
    }
  };

  const handleOnDone = () => {
    if (checkError()) {
      Alert.alert("Please enter text");
      return;
    }
    handleDone(currentTodo);
  };

  const handlePriority = (priority: priority) => {
    setPriority(priority);
  };

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
        multiline={false}
      />

      <DateTextBox date={date} setDate={setDate} />

      <PickerTextBox priority={priority} handlePriority={handlePriority} />

      <TouchableOpacity onPress={handleOnDone} style={$confirmButton}>
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
