import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../framework/src/Message";

const configJSON = require("./config");

interface Props {
  navigation: any;
  id: string;
}

interface S {
  loading: boolean;
  data: any[];
  error: any;
  value: string;
}

interface SS {}

class CountryCodeSelectorTable extends BlockComponent<Props, S, SS> {
  arrayholder: any[];
  countryCodeApiCallId: any;

  constructor(props: Props) {
    super(props);

    this.subScribedMessages = [getName(MessageEnum.RestAPIResponceMessage)];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      loading: false,
      data: [],
      error: null,
      value: ""
    };

    this.arrayholder = [];
  }

  async componentDidMount() {
    this.makeRemoteRequest();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  searchFilterFunction = (text: string) => {
    this.setState({
      value: text
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.attributes.name.toUpperCase()} (${item.id}) +${
        item.attributes.country_code
      }`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder={configJSON.countryPlaceHolderMobile}
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  actionOnRow(item: any) {
    this.props.navigation.pop();
    setTimeout(function() {
      const msg = new Message(getName(MessageEnum.CountryCodeMessage));

      var countryNameCode = ` ${item.attributes.emoji_flag} ${
        item.attributes.name
      } (${item.id}) +${item.attributes.country_code}`;
      msg.addData(getName(MessageEnum.CountyCodeDataMessage), countryNameCode);

      runEngine.sendMessage(getName(MessageEnum.CountryCodeMessage), msg);
    }, 1.0);
  }

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
              <ListItem
                title={` ${item.attributes.emoji_flag} ${
                  item.attributes.name
                } (${item.id})`}
                rightTitle={`+${item.attributes.country_code}`}
              />
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          stickyHeaderIndices={[0]}
        />
      </View>
    );
  }

  async receive(from: String, message: Message) {
    runEngine.debugLog("Country Code", message);

    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.countryCodeApiCallId != null &&
      this.countryCodeApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson && !responseJson.errors && responseJson.data) {
        this.setState({
          data: responseJson.data,
          error: null,
          loading: false
        });
        this.arrayholder = responseJson.data;
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
  }

  makeRemoteRequest = () => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.countryCodeApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.apiEndPointGetCountryCodes
    );

    const header = {
      "Content-Type": configJSON.contentTypeApiGetCountryCodes
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiGetCountryCodesType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
}

export default CountryCodeSelectorTable;
