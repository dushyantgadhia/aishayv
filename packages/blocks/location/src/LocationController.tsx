import React from "react";
import * as _ from "lodash";
import fetch from "react-native-cancelable-fetch";
import Geolocation from "@react-native-community/geolocation";

import { calculateDelta } from "../../../framework/src/Helpers";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");
const defaultDeltaCoords = calculateDelta();
const defaultRegion = {
  latitude:0,
  longitude:0,
  ...defaultDeltaCoords,
  type: 'current',
  place_id: "currentAddress",
  structured_formatting: {
    secondary_text: '',
    main_text: ''
  }
}

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  predictions: any;
  region: object;
  searchText: string;
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LocationController extends BlockComponent<
  Props,
  S,
  SS
> {
  addresses = [
    { label: "Test Home Address", type: "Home", id: 1 },
    { label: "Test Work Address", type: "Work", id: 1 },
  ];

  // Customizable Area Start
  _map:any;
  bs:any = React.createRef();
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    //this.subScribedMessages = [getName(MessageEnum.AccoutLoginSuccess)];

    this.state = {
      predictions:[],
      region: defaultRegion,
      searchText: "",
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false
    };

    this._request = _.debounce(this._request, configJSON.debounceDuration);
    // Customizable Area End
    //runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.getCurrentLocation();
    this.subScribedMessages = [getName(MessageEnum.NavigationPayLoadMessage)];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived LocationController", message);
  }

  // Customizable Area Start

  clearSearchText = () => {
    this.setState({searchText:''});
  }

  fetchAddressForLocation = async(location: any, type:string = '') => {
    let { latitude, longitude } = location;
    const address = await fetch(
      `${configJSON.REVRSE_GEO_CODE_URL}?key=${configJSON.apiKey}&latlng=${latitude},${longitude}`,
      null,
      this,
    )
      .then((res: any) => res.json())
      .then((data: any) => {
        let { results } = data;
        if (results.length > 0) {
          let { formatted_address, address_components, place_id } = results[0];
          console.log('formatted_address', formatted_address);
          console.log('results[0]', results[0]);
          return {
            type: type,
            ...results[0],
            structured_formatting: {
              secondary_text: formatted_address,
              main_text: address_components[0].long_name
            }
          };
        }else{
          return {};
        }
      });
      return address;
  }

  getCurrentLocation = () => {
    let predectionArray:any = [];
    Geolocation.getCurrentPosition(async(info) => {
      //console.log('getCurrentPosition',info);
      const coords = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        ...defaultDeltaCoords
      }
      const address = await this.fetchAddressForLocation(coords, 'current');
      //console.log('getCurrentPosition2',address);
      //address ? predectionArray.push({...coords, ...address}) : '';
      this.setState({region: {...coords, ...address}});
      //setRegion(info.coords);      
    });
  };

  onSearchChange = (text:any) => {
    this._request(text);
    this.setState({searchText: text});
  }

  _onPressClear = () => {
    this.setState({searchText: "", predictions: []});
    this._abortRequest();
  }

  _abortRequest = () => {
    fetch.abort(this);
  };

  _setRegion = (region:any, animate = true) => {
    const regionObj = {...this.state.region, ...region};
    if (animate) this._map.animateToRegion(regionObj);
  }

  _request = (text:string) => {
    this._abortRequest();
    const url = `${configJSON.AUTOCOMPLETE_URL}?input=${encodeURIComponent(text)}&key=${
      configJSON.apiKey
    }`;
    if (text.length >= 1) {
      fetch(url, null, this)
        .then((res:any) => res.json())
        .then((data:any) => {
          let {predictions} = data;
          console.log("predictions", predictions.length, JSON.stringify(predictions));
          this.setState({predictions});
        })
        .catch((error:any) => {
          console.log("error", error);
        })
    } else {
      this.setState({predictions: []});
    }
  }

  _onPlaceSelected = (placeId:string, type:string = '') => {
    //this._input.blur();
    if(type == 'current'){
      this.updateAddress(this.state.region);
    } else {
      fetch(
        `${configJSON.PLACE_DETAIL_URL}?key=${
        configJSON.apiKey
        }&placeid=${placeId}`
      )
        .then((response: any) => response.json())
        .then(async(data: any) => {
          let region = (({ lat, lng }) => ({ latitude: lat, longitude: lng }))(
            data.result.geometry.location
          );
          console.log("_onPlaceSelected", JSON.stringify(region));
          const address = await this.fetchAddressForLocation(region);
          this.updateAddress(address);
          //this._setRegion(region);
        });
    }
  }

  updateAddress = (data:any) => {
    let city = "";
    let street:any = [];
    const { navigation, route } = this.props;
    console.log("updateAddress", route);
    const fromRegistrationFlag = false;
    const {fromScreenToLocation} = route.params;
    const { address_components } = data;
    data &&
    data.address_components.forEach((component:any) => {

        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("floor")) {
          street.push(component.long_name);
        }
        if (component.types.includes("street_number")) {
          street.push(component.long_name);
        }
        if (component.types.includes("route")) {
          street.push(component.long_name);
        }
        if (component.types.includes("sublocality")) {
          street.push(component.long_name);
        }
        if (component.types.includes("establishment")) {
          street.push(component.long_name);
        }
        if (component.types.includes("postal_code")) {
          street.push(component.long_name);
        }
      });
    const location = data &&
    data.geometry && data.geometry.location || {};
    street = (street.length > 0 && street.map((data:any) => data).join(", ")) || "";
    let addressObj = {
      address: street + " " + city,
      formatted_address: data.formatted_address,
      street,
      city,
      location
    };
    console.log("addressObj", addressObj);
    //navigation.goBack();
    if (fromScreenToLocation) {
      navigation.navigate(fromScreenToLocation, { addressObj });
    }
  };

  onSelectAddress = (address: object) => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationAppointmentManagementMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.AddressSelectionMessage), address);
    this.send(msg);
    this.unsubscribeMessages();
  };

  mapProps = () => {
    return {
      addresses: this.addresses,
      showCurrentLocation: true,
      onSelectAddress: this.onSelectAddress,
    };
  };

  subscribeMessages = () => {
    this.unsubscribeMessages();
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  };

  unsubscribeMessages = () => {
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  };

  // Customizable Area End
}
