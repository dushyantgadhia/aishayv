import React, { FunctionComponent, ElementType } from "react";
import { StyleSheet, View, GestureResponderEvent } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome";

import GenericLabel from "./GenericLabel";

interface Props {
  activeIndex: number;
}

const DOT_COLOR = "rgb(197, 206, 224)";

const GenericButton: FunctionComponent<Props> = ({ activeIndex }) => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <View style={styles.icon}>
          <FontAwesome5
            name={activeIndex >= 1 ? "check-circle" : "circle"}
            color={activeIndex >= 1 ? "#000" : DOT_COLOR}
            size={activeIndex >= 1 ? 16 : 12}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.icon}>
          <FontAwesome5
            name={activeIndex >= 2 ? "check-circle" : "circle"}
            color={activeIndex >= 2 ? "#000" : DOT_COLOR}
            size={activeIndex >= 2 ? 16 : 12}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.icon}>
          <FontAwesome5
            name={activeIndex >= 3 ? "check-circle" : "circle"}
            color={activeIndex >= 3 ? "#000" : DOT_COLOR}
            size={activeIndex >= 3 ? 16 : 12}
          />
        </View>
      </View>
      <View style={styles.labelsContainer}>
        <View style={styles.labelWrapper}>
          <GenericLabel align="center">Book Appointment</GenericLabel>
        </View>
        <View style={styles.labelWrapper}>
          <GenericLabel>Payment</GenericLabel>
        </View>
        <View style={styles.labelWrapper}>
          <GenericLabel>Finished</GenericLabel>
        </View>
      </View>
    </View>
  );
};

export default GenericButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingBottom: 12
  },
  indicatorContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 30,
    paddingHorizontal: 48,
    paddingVertical: 16,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "rgb(197, 206, 224)",
    flex: 1,
  },
  icon: {
    width: 24,
    alignItems: "center",
    paddingHorizontal: 4,
  },
  labelsContainer: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: 16
  },
  labelWrapper: {
    flex: 1,
    alignItems: "center",
  },
});
