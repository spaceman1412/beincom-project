import { Dimensions } from "react-native";
import { useEffect, useRef } from "react";

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
