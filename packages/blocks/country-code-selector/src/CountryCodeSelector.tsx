import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

interface Props {
  navigation: any;
  id: string;
  placeHolder: string;
  style: any;
  disable: boolean;
  allowPropChange: boolean;
  value: any;
}

interface S {
  dataSource: any[];
  countryCodeSelected: string;
  placeHolder: string;
  disable: boolean;
}

interface SS {}

export default class CountryCodeSelector extends BlockComponent<Props, S, SS> {
  static defaultProps = {
    allowPropChange: false
  };

  currentPlaceHolderText: string;

  constructor(props: Props) {
    super(props);

    this.subScribedMessages = [getName(MessageEnum.CountryCodeMessage)];
    this.receive = this.receive.bind(this);
    this.currentPlaceHolderText = props.placeHolder;
    this.state = {
      dataSource: [],
      countryCodeSelected: "",
      placeHolder: this.props.placeHolder,
      disable: this.props.disable
    };
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      this.setState({
        placeHolder: message.getData(getName(MessageEnum.CountyCodeDataMessage))
      });
    }
  }

  onPress = () => {
    if (!this.state.disable) {
      runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
      this.props.navigation.navigate("CountryCodeSelectorTable");
    }
  };

  render() {
    if (this.currentPlaceHolderText !== this.props.placeHolder) {
      this.currentPlaceHolderText = this.props.placeHolder;
      this.setState({ placeHolder: this.props.placeHolder });
    }

    return (
      <TouchableOpacity style={this.props.style} onPress={this.onPress}>
        <Text>{this.state.placeHolder}</Text>
      </TouchableOpacity>
    );
  }
}
