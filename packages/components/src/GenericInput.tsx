import React, { FunctionComponent } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface Props {
  onChange: (value: string) => void;
  value: string;
  editable?: boolean;
}

const GenericInput: FunctionComponent<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={props.onChange}
        value={props.value}
        style={styles.input}
        editable={props.editable}
      />
    </View>
  );
};

export default GenericInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderBottomColor: "rgb(244, 244, 244)",
    borderBottomWidth: 1,
    color: "#000",
  },
});
