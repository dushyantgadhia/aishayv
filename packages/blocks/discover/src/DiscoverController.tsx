import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { getAuthToken, getProfileData, isEmpty } from "../../../framework/src/Helpers";

// Customizable Area Start
import StorageProvider from '../../../framework/src/StorageProvider';
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
  userName: string;
  address: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class DiscoverController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  getProfileApiCallId: any;
  getServicesApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.state = {
      userName: '',
			address: '',
    };
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    const profileData = await getProfileData() || null;
    const authToken = await StorageProvider.get('authToken') || '';
    profileData ? this.setUserDetails(profileData) : this.getProfileDetails(authToken);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    console.log('DC->receive', message);
    
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

        if (apiRequestCallId === this.getProfileApiCallId) {
          if (responseJson && responseJson.data) {
            await StorageProvider.set('profileData', JSON.stringify(responseJson.data));
            this.setUserDetails(responseJson.data);
            //runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
          } else {
            if(responseJson.errors[0].token == "Invalid token"){
              const authToken = await StorageProvider.get('authToken') || '';
              this.getProfileDetails(authToken);
              return
            }
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          errorReponse ? this.parseApiCatchErrorResponse(errorReponse) : '';
        }else if (apiRequestCallId === this.getServicesApiCallId) {
          if (responseJson && responseJson.data) {
            //this.setState({selectedItem: null});
            //runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
          } else {
            if(responseJson && responseJson.errors[0].token == "Invalid token"){
              //this.state.selectedItem ? this.getServicesOfServiceProvider(this.state.selectedItem):'';
              return;
            }
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

  setUserDetails = (userDataObj:object) => {
    //@ts-ignore
		const uName = !isEmpty(userDataObj) && !isEmpty(userDataObj.attributes) && !isEmpty(userDataObj.attributes.name) && userDataObj.attributes.name || "";
    //@ts-ignore
		const uAddress = !isEmpty(userDataObj) && !isEmpty(userDataObj.attributes) && !isEmpty(userDataObj.attributes.address) && userDataObj.attributes.address || "";
		this.setState({
			userName: uName,
			address: uAddress
		})
  }

  setProfileData = async() => {
    const profileData = await getProfileData() || null;
    console.log('DC->setProfileData', profileData);
    if(profileData){
      this.setUserDetails(profileData);
    }
  }
  
  getProfileDetails = (authToken:string) => {
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    const header = {
      "Content-Type": configJSON.loginApiContentType,
      token: authToken
    };

    const httpBody = {
      token: authToken
    };

    this.getProfileApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getProfileAPiEndPoint
    );

    // requestMessage.addData(
    //   getName(MessageEnum.RestAPIRequestBodyMessage),
    //   JSON.stringify(httpBody)
    // );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getProfileAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getServicesOfServiceProvider = async(item:any) => {
    const token = await getAuthToken();
    if(!token){
      return;
    }

    const header = {
      "Content-Type": configJSON.getServicesApiContentType,
      "token": `${token}`
    };

    const attrs = {
      service_provider_id: item.service_provider_id
    };
    
    const data = {
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getServicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getServicesAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getServicesAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

	renderDetails = (item:object) => {
    console.log('console->renderDetails', item);
    //this.getServicesOfServiceProvider(item);
		this.props.navigation.navigate('SpecialistDetailsScreen', {selectedSpecialist: item});
  }
  
  renderOffersScreen = () => {
		console.log('console->renderOffersScreen');
		this.props.navigation.navigate('OffersScreen');
	}

	renderOfferDetailScreen = (item:object) => {
		console.log('console->renderOffersScreen', item);
		this.props.navigation.navigate('OfferDetailScreen', {selectedOffer: item});
  }
  
  goToDiscoverAll = () => {
		this.props.navigation.navigate('DiscoverAllScreen');
	}

}
