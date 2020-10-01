import React, { FunctionComponent, ElementType } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

import GenericLabel from "./GenericLabel";

interface Props {
  onPress: () => void;
  children: ElementType | string;
  fontSize?: number;
  disabled?: boolean;
}

const GenericButton: FunctionComponent<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress} disabled={props.disabled}>
      <GenericLabel fontSize={props.fontSize} color="#FFF">
        {props.children}
      </GenericLabel>
    </TouchableOpacity>
  );
};

export default GenericButton;

GenericButton.defaultProps = {
  fontSize: 18,
  onPress: () => {}
};

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
