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
