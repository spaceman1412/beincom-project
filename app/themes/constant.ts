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
