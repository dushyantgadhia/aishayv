import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { getProfileData, logoutUser } from "../../../framework/src/Helpers";

// Customizable Area Start
import StorageProvider from "../../../framework/src/StorageProvider";
//import { imgLogoPath } from "./assets";
// Customizable Area End

const user = {
  "id": 2,
  "email": "customer2@yopmail.com",
  "authentication_token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjAxNzkzNzUwfQ.LTEyrbyZsmZirm3uPVa255wtykkkLGll5q5ijJ83hSk",
  "is_customer": true,
  "profile": {
      "id": 2,
      "fullname": "satish sehgal",
      "mobile": "+919999999999",
      "date_of_birth": "2000-08-21T00:00:00.000Z"
  },
  "addresses": [
      {
          "id": 2,
          "name": "Ashok nagar new delhi 11002"
      }
  ]
}

//export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  userData: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class ProfilesController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  resendConfirmationApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.state = {
      userData: null
    };
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.setProfileData();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    console.log('PC->receive', message);
    
    // Customizable Area Start
    setTimeout(() => {this.setProfileData();},2000);
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

  setProfileData = async() => {
    const profileData = await getProfileData() || null;
    console.log('PC->setProfileData', profileData);
    if(profileData){
      this.setState({userData:profileData});
    }
  }

  navigateToScreen = (route:string) => {
		if(route){
      route == 'AccountInformationScreen' ?
      this.props.navigation.navigate(route, {profileData: this.state.userData}) :
      this.props.navigation.navigate(route);
		}
	}

	signOut = async() => {
    await logoutUser();
    //this.navigateToScreen('EmailLoginScreen');
	}
}
