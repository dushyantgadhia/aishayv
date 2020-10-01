import Geolocation from "@react-native-community/geolocation";

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { isEmpty, calculateDelta } from "../../../framework/src/Helpers";

// Customizable Area Start
//import { imgLogoPath } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  address: any;
  currentLocation: any;
  initialRegion: any;
  searchString: string;
  markers: Object | Array <any>;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

const defaultDeltaCoords = calculateDelta();
const defaultCoordinate = {latitude: 24.711689, longitude: 46.670809, ...defaultDeltaCoords};
const markersArray = [
  {latLng:{latitude: 24.712176, longitude: 46.669886}},
  {latLng:{latitude: 24.713901, longitude: 46.672944}},
  {latLng:{latitude: 24.710646, longitude: 46.671517}}
]

export default class NearbyController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  resendConfirmationApiCallId: any;
  _map:any;
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];
    this.receive = this.receive.bind(this);
    //runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.state = {
      address: 'Chicago, Illinois, US.',
      currentLocation: defaultCoordinate,
      initialRegion : defaultCoordinate,
      searchString: '',
      markers: []
    };
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getCurrentLocation();
    this.calculateRegion();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    console.log('NBC->receive', message);
    
    // Customizable Area Start
    if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
      
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId != null) {

        if (apiRequestCallId === this.resendConfirmationApiCallId) {
          if (responseJson && responseJson.success && responseJson.data) {
            this.showAlert('Success', responseJson.message);
            runEngine.unSubscribeFromMessages(this, this.subScribedMessages);            
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          errorReponse ? this.parseApiCatchErrorResponse(errorReponse) : '';
        }
      }
    }
    // Customizable Area End
  }  

  // Customizable Area Start

  onSearchChange = (searchText:string) => {
		console.log('console->onSearchChange', searchText);
		this.setState({ searchString: searchText});
  }
  
  clearSearchText = () => {
    this.setState({ searchString: ''});
  }

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      console.log('getCurrentPosition',info);
      const coords = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        ...defaultDeltaCoords
      }
      this.setState({currentLocation: coords});
      //setRegion(info.coords);      
    });
  };

  backToLocation = () => {
    const {initialRegion} = this.state;
    console.log('backToLocation',initialRegion);
    this.setRegion(initialRegion);
  }

  setRegion = (region:any, animate:boolean = true) => {
    //this.state.region = {...this.state.region, ...region};
    if (animate && this._map) this._map.animateToRegion(region);
  }

  onMapRegionChangeComplete = (region: any) => {
    console.log('onMapRegionChangeComplete',region);
    //setCurrentLocation(defaultCoordinate);
    //setRegion(defaultCoordinate);
    //this._input.fetchAddressForLocation(region);
  }

  calculateRegion = () => {
    var minLat:any=0, minLong:any=0, maxLat:any=0, maxLong:any=0, region:any;
    for(let i = 0; i < markersArray.length; i++){
      let item = {...markersArray[i]};
      let lat = item.latLng.latitude;
      let long = item.latLng.longitude;
      minLat = !minLat ? lat : (minLat && lat < minLat) ? lat : minLat;
      minLong = !minLong ? long : (minLong && long < minLong) ? long : minLong;
      maxLat = !maxLat ? lat : (maxLat && lat > maxLat) ? lat : maxLat;
      maxLong = !maxLong ? long : (maxLong && long > maxLong) ? long : maxLong;
    }
    region = {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLong + maxLong) / 2,
      latitudeDelta: 0,
      longitudeDelta: 0
    };
    region.latitudeDelta = (Math.abs(maxLat - region.latitude) > Math.abs(minLat - region.latitude) ? Math.abs(maxLat - region.latitude) : Math.abs(minLat - region.latitude)) * 5;
    region.longitudeDelta = (Math.abs(maxLong - region.longitude) > Math.abs(minLong - region.longitude) ? Math.abs(maxLong - region.longitude) : Math.abs(minLong - region.longitude)) * 5;
    console.log('console->region', region);
    this.setState({initialRegion: region, markers: markersArray})
  }

}
