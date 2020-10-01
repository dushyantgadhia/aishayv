import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { getAuthToken, isEmpty } from "../../../framework/src/Helpers";

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
  userName: string;
  address: string;
  selectedItem: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class DiscoverAllController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
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
      userName: 'Jackson',
      address: 'Al Ameri Building, Tecom, Dubai, UAE.',
      selectedItem: null
    };
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    console.log('DC->receive', message);
    
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

      console.log('DC->receive', responseJson);
      if (apiRequestCallId != null) {

        if (apiRequestCallId === this.getServicesApiCallId) {
          if (responseJson && responseJson.data) {
            //this.showAlert('Success', responseJson.message);
            this.setState({selectedItem: null});
            //runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
          } else {
            if(responseJson && responseJson.errors[0].token == "Invalid token"){
              this.state.selectedItem ? this.getServicesOfServiceProvided(this.state.selectedItem):'';
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

  renderDetails = (item:object) => {
    console.log('console->renderDetails', item);
    this.setState({selectedItem: item});
    //this.getServicesOfServiceProvided(item);
		this.props.navigation.navigate('SpecialistDetailsScreen', {selectedSpecialist: item});
	}

	renderMobileDetails = (item:object) => {
    console.log('console->renderDetails', item);
    this.setState({selectedItem: item});
    //this.getServicesOfServiceProvided(item);
		this.props.navigation.navigate('SpecialistDetailsScreen', {selectedSpecialist: item});
    //this.props.navigation.navigate('MobileSalonScreen');
  }
  
  getServicesOfServiceProvided = async(item:any) => {
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

}
