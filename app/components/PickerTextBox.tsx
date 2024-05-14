import { useRef, useState } from "react";
import { TouchableOpacity, View, Text, TextStyle } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { colors } from "../themes/color";

export const PickerTextBox = () => {
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

const $text: TextStyle = {
  fontSize: 16,
  fontWeight: "500",
};
