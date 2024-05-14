import Animated, { FadeOutDown } from "react-native-reanimated";
import { OpenTask } from "./OpenTask";
import { ViewStyle } from "react-native";
import { colors } from "../themes/color";

type AddTaskProps = {
  handleCancel: () => void;
  handleDone: () => void;
};

export const AddTask = ({ handleCancel, handleDone }: AddTaskProps) => {
  return (
    <Animated.View exiting={FadeOutDown} style={$openContainer}>
      <OpenTask handleCancel={handleCancel} handleDone={handleDone} />
    </Animated.View>
  );
};

const $openContainer: ViewStyle = {
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
  backgroundColor: colors.background,
};
