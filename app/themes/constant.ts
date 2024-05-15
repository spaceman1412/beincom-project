import { Dimensions } from "react-native";
import { useEffect, useRef } from "react";
import { Todo } from "../store/todoSlice";
import { colors } from "./color";

const { height, width, fontScale, scale } = Dimensions.get("window");

export class AppDims {
  static width: number = width;
  static height: number = height;
  static fontScale: number = fontScale;
  static scale: number = scale;

  static get DESIGN_WIDTH() {
    return 421;
  }

  static get DESIGN_HEIGHT() {
    return 935;
  }
}

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const getFormattedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}/${month}/${year}`;

  return currentDate;
};

export const getDatesBetween = (day: string) => {
  const date = new Date(day);
  const currentDate = new Date();
  // Calculating the time difference
  // of two dates
  let Difference_In_Time = date.getTime() - currentDate.getTime();

  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  return Difference_In_Days > 0 ? Difference_In_Days : 0;
};

export const priorityColors = {
  High: colors.strongGreen,
  Medium: colors.yellow,
  Low: colors.red,
};

export const getSortedTodoList = (todoLists: Todo[]) => {
  let sortedArray = todoLists.concat();
  const getPoint = (priority: string) => {
    if (priority === "High") return 2;
    else if (priority === "Medium") return 1;
    else if (priority === "Low") return 0;
    else return 0;
  };

  return sortedArray.sort(function (x, y) {
    if (getPoint(x.priority) > getPoint(y.priority)) {
      return -1;
    }
    if (getPoint(x.priority) < getPoint(y.priority)) {
      return 1;
    }
    return 0;
  });
};
