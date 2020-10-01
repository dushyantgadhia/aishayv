import React, { FunctionComponent } from "react";
import { Text, GestureResponderEvent, TextStyle } from "react-native";

export type Props = {
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  fontSize?: number;
  color?: string;
  background?: string;
  style?: TextStyle;
  numberOfLines?: number | undefined;
  align?: string;
  isUpperCase?: boolean;
  fontFamily?: string;
  onPress?: (event: GestureResponderEvent) => void;
  fontWeight?: number | string;
  lineHeight?: number | string;
  id?: string;
  underline?: boolean;
};

const GenericLabel: FunctionComponent<Props> = (props) => {
  const {
    fontSize,
    color,
    background,
    children,
    numberOfLines,
    align,
    isUpperCase,
    fontFamily,
    underline,
    onPress,
    fontWeight,
    lineHeight,
    mt,
    mb,
    ml,
    mr,
    pt,
    pb,
    pl,
    pr,
    style
  } = props;
  const textStyles = [];
  textStyles.push({
    marginRight: mr || 0,
    marginTop: mt || 0,
    marginBottom: mb || 0,
    marginLeft: ml || 0,
    paddingTop: pt || 0,
    paddingBottom: pb || 0,
    paddingLeft: pl || 0,
    paddingRight: pr || 0,
  });
  if (background) {
    textStyles.push({ backgroundColor: background });
  }
  if (fontSize) {
    textStyles.push({ fontSize });
  }
  if (color) {
    textStyles.push({ color });
  }
  if (align) {
    textStyles.push({ textAlign: align });
  }
  if (fontFamily) {
    textStyles.push({ fontFamily: fontFamily });
  }
  if (fontWeight) {
    textStyles.push({ fontWeight });
  }
  if (lineHeight) {
    textStyles.push({ lineHeight });
  }
  if (underline) {
    textStyles.push({ textDecorationLine: underline ? "underline" : "none" });
  }
  const content =
    typeof children === "string" && isUpperCase
      ? children.toUpperCase()
      : children;
  return (
    <Text
      style={[textStyles, style]}
      numberOfLines={numberOfLines}
      onPress={(e) => (onPress ? onPress(e) : null)}
    >
      {content}
    </Text>
  );
};

GenericLabel.defaultProps = {
  mt: 0,
  mb: 0,
  ml: 0,
  mr: 0,
  pt: 0,
  pb: 0,
  pl: 0,
  pr: 0,
  fontSize: 14,
  color: "rgb(46, 58, 89)",
  numberOfLines: undefined,
  align: "left",
  isUpperCase: false,
  underline: false,
  style: {}
};

export default GenericLabel;
