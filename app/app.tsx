import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./themes/color";
1;
import { getSize } from "./themes/responsive";
import { Task } from "./components/Task";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "./store/store";
import { addTodo, Todo } from "./store/todoSlice";

import { AddTask } from "./components/AddTask";
import { getSortedTodoList } from "./themes/constant";
import Animated, { SequencedTransition } from "react-native-reanimated";

export const App = () => {
  const [isAdd, setIsAdd] = useState(false);

  const dispatch = useAppDispatch();
  const todoLists = useAppSelector((state) => state.todoReducer.todoLists);

  const handleAddTask = (todo: Todo) => {
    dispatch(addTodo(todo));
    setIsAdd(false);
  };

  return (
    <SafeAreaView style={$mainContainer}>
      <StatusBar style="auto" />

      <Text style={$titleText}>To Do List</Text>

      {isAdd && (
        <AddTask
          handleCancel={() => {
            setIsAdd(false);
          }}
          handleDone={handleAddTask}
        />
      )}

      <Animated.FlatList
        data={getSortedTodoList(todoLists)}
        keyExtractor={(item) => item.id}
        renderItem={(value) => <Task isOpen={false} value={value.item} />}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        contentContainerStyle={$flatList}
        showsVerticalScrollIndicator={false}
        itemLayoutAnimation={SequencedTransition}
      />

      <FloatingButton
        onClick={() => {
          setIsAdd(true);
        }}
      />
    </SafeAreaView>
  );
};

type FloatingButtonProps = {
  onClick: () => void;
};

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <TouchableOpacity style={$buttonStyle} onPress={onClick}>
      <AntDesign name="plus" size={getSize.v(35)} color="white" />
    </TouchableOpacity>
  );
};

const $flatList: ViewStyle = {
  paddingHorizontal: getSize.v(8),
  paddingTop: getSize.v(8),
  marginTop: getSize.v(16),
  paddingBottom: getSize.v(50),
  flexGrow: 1,
};

const $buttonStyle: ViewStyle = {
  width: getSize.v(70),
  height: getSize.v(70),
  borderRadius: getSize.v(35),
  backgroundColor: colors.purple,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "flex-end",
  position: "absolute",
  bottom: getSize.v(24),
  right: getSize.v(24),
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
