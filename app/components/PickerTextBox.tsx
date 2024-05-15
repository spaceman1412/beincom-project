import { useRef } from "react";
import { TouchableOpacity, View, Text, TextStyle } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { colors } from "../themes/color";
import { priority } from "../store/todoSlice";
import { priorityColors } from "../themes/constant";

type PickerTextBoxProps = {
  priority: priority;
  handlePriority: (priority: priority) => void;
};

export const PickerTextBox = (props: PickerTextBoxProps) => {
  const { priority, handlePriority } = props;
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
        if (
          option.label === "High" ||
          option.label === "Medium" ||
          option.label === "Low"
        ) {
          handlePriority(option.label);
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
            <Text style={{ color: priorityColors[priority] }}>{priority}</Text>
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
