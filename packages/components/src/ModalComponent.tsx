import React, { Component } from "react";
import { View } from "react-native";
import { Overlay } from "react-native-elements";


interface Props {
  close: Function;
  visible: boolean;
  transparent: boolean;
  position: string;
  paddingTop: string|number;
  customStyles: object|Array<any>;
  height: string|number; // height
  width: string|number; //
  children: any;
}


export default class ModalComponent  extends Component <Props> {

  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const {
      visible, // hide/show
      position, // bottom/top/middle
      height, // height
      width, //
      transparent,
      children,
      paddingTop,
      close,
      customStyles
    } = this.props;
    return (
      <Overlay
        animationType="none"
        isVisible={visible}
        onRequestClose={() => close}
        onBackdropPress={() => close}
        onDismiss={() => close}
        transparent
        //style={customStyles || {}}
        overlayStyle={customStyles || {}}
      >
        <View>{children}</View>
      </Overlay>
    )
  }
  static defaultProps = {
    children: null,
    visible: false, // hide/show
    position: null, // bottom/top/middle
    height: null, // height
    width: null, //
    transparent: false,
    paddingTop: 10,
    close: () => { }
  };
}


