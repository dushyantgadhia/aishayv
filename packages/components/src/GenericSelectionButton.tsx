import React, { FunctionComponent, ElementType } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

import GenericLabel from "./GenericLabel";

interface Props {
  onPress: (e: GestureResponderEvent) => void;
  children: ElementType | string;
  isSelected: boolean;
}

const GenericSelectionButton: FunctionComponent<Props> = (props) => {
  const buttonStyles = {
    ...styles.container,
    backgroundColor: props.isSelected ? "#000" : "#FFF",
    borderColor: props.isSelected ? "#000" : "rgb(197, 206, 224)",
    borderWidth: 1,
  };

  return (
    <TouchableOpacity style={buttonStyles} onPress={props.onPress}>
      <GenericLabel
        fontSize={12}
        color={props.isSelected ? "#FFF" : "rgb(143, 155, 179)"}
      >
        {props.children}
      </GenericLabel>
    </TouchableOpacity>
  );
};

export default GenericSelectionButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#000",
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
