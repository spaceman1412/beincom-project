import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./themes/color";
1;
import { getSize } from "./themes/responsive";
import { Task } from "./components/Task";

export const App = () => {
  return (
    <SafeAreaView style={$mainContainer}>
      <StatusBar style="auto" />

      <Text style={$titleText}>To Do List</Text>
      <Task />
    </SafeAreaView>
  );
};

const $mainContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: getSize.m(24),
};

const $titleText: TextStyle = {
  fontSize: getSize.font(28),
  fontWeight: "bold",
  marginTop: getSize.v(24),
};
