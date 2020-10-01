import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

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
  resendConfirmationLoader: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class VerificationController extends BlockComponent<
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
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.state = {
      resendConfirmationLoader: false
    };
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    console.log('VC->receive', message);
    
    // Customizable Area Start
    this.setState({resendConfirmationLoader:false});
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
            //runEngine.unSubscribeFromMessages(this, this.subScribedMessages);            
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

  resendClicked = () => {
    //const { userData } = this.props;
    const userData = {email:'customer2@yopmail.com'};return;
		const { resendConfirmationLoader} = this.state;
		if(resendConfirmationLoader){
			return;
		}
		if(userData && userData.email){
      this.setState({resendConfirmationLoader:true});
			const userEmailData = {
				email: userData.email
			};
			const header = {
        "Content-Type": configJSON.confirmationApiContentType
      };
  
      const httpBody = {
        user: userEmailData
      };
      
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
      this.resendConfirmationApiCallId = requestMessage.messageId;
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.confirmationAPiEndPoint
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
        configJSON.confirmationAPiMethod
      );
  
			console.log('console->resendClicked', userEmailData);
      runEngine.sendMessage(requestMessage.id, requestMessage);
		}else{
			this.showAlert('Email missing', 'E-Mail not found.');
		}
  }
  
	goToLogin = () => {
    //const {swiperIndex} = this.state;
    console.log('console->goToLogin');
		this.props.navigation.navigate('EmailLoginScreen');
	}

}
