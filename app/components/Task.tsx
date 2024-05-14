import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";

import { FontAwesome } from "@expo/vector-icons";

import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { getSize } from "../themes/responsive";
import { AnimatedCheckBox } from "./AnimatedCheckBox";
import { colors } from "../themes/color";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import ModalSelector from "react-native-modal-selector";

export const Task = () => {
  const [isOn, setIsOn] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
      {/* <ClosedTask isOn={isOn} handlePress={handlePress} /> */}

      <OpenTask />
    </Animated.View>
  );
};

interface DateTextBoxProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateTextBox = (props: DateTextBoxProps) => {
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

const PickerTextBox = () => {
  const [text, setText] = useState("High");
  const modalRef = useRef<ModalSelector>(null);

  let index = 0;
  const data = [
    { key: index++, label: "High" },
    { key: index++, label: "Medium" },
    { key: index++, label: "Low" },
  ];

  return (
    <ModalSelector
      ref={modalRef}
      data={data}
      onChange={(option) => {
        if (option.label) {
          setText(option.label);
        }
      }}
      customSelector={
        <TouchableOpacity onPress={() => modalRef.current?.open()}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={$text}>Priority</Text>
            <Text>{text}</Text>
          </View>

          <View
            style={{ height: 1, backgroundColor: colors.gray, marginTop: 8 }}
          />
        </TouchableOpacity>
      }
      style={{ marginTop: 16 }}
    />
  );
};

const OpenTask = () => {
  const [text, onChangeText] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <Animated.View exiting={FadeOutUp} style={$closeContainer}>
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

      <TouchableOpacity style={$confirmButton}>
        <Text style={[{ color: colors.background }, $text]}>Done</Text>
      </TouchableOpacity>
    </Animated.View>
  );
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

const ClosedTask = ({ isOn, handlePress }) => {
  return (
    <>
      <AnimatedCheckBox value={isOn} onPress={handlePress} style={$checkBox} />
      <View style={$taskContainer}>
        <Text style={$text}>aa</Text>
        {!isOn && (
          <Animated.Text
            entering={FadeInUp}
            exiting={FadeOutDown}
            style={[$priorityText]}
          >
            High
          </Animated.Text>
        )}
      </View>

      {!isOn && (
        <Animated.View
          entering={FadeInLeft}
          exiting={FadeOutRight}
          style={$endContainer}
        >
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <Text style={$dateText}>{`Còn  ngày`}</Text>
        </Animated.View>
      )}
    </>
  );
};

const $closeContainer: ViewStyle = {
  flex: 1,
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
