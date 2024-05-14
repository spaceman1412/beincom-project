import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextStyle } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../themes/color";

type DateTextBoxProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export const DateTextBox = (props: DateTextBoxProps) => {
  const { date, setDate } = props;
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View style={{ marginTop: 16 }}>
      <TouchableOpacity
        onPress={showMode}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={$text}>Duration</Text>
        <Text>Monday</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <View style={{ height: 1, backgroundColor: colors.gray, marginTop: 8 }} />
    </View>
  );
};

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
};
