import React, { useState } from "react";
import { StyleSheet, View, Button, SafeAreaView } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value, {
      duration,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          console.log(height.value);
        }}
        style={styles.wrapper}
      >
        <Item />
        {children}
      </View>
    </Animated.View>
  );
}

function Item() {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.box} />
  );
}

function Parent({ open }) {
  return (
    <View style={styles.parent}>
      <AccordionItem isExpanded={open} viewKey="Accordion">
        {open && <Item />}
      </AccordionItem>
    </View>
  );
}

export default function TestApp() {
  const [open, setOpen] = useState(false);
  const onPress = () => {
    setOpen((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Click me" />
      </View>

      <View style={styles.content}>
        <Parent open={open} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 24,
  },
  buttonContainer: {
    flex: 1,
    paddingBottom: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  parent: {
    width: 200,
  },
  wrapper: {
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
  },
  box: {
    height: 120,
    width: 120,
    color: "#f8f9ff",
    backgroundColor: "#b58df1",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});