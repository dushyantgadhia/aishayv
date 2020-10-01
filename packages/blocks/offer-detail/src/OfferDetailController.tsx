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
  route: any
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  offerTitle: string;
  price: string|number;
  offerPrice: string|number;
  fromTime: any;
  toTime: any;
  offerSelected: any;
  specialOfferServices: Array<any>;
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
    //runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    const {params} = props.route;
    const selectedOffer:any = params && params.selectedOffer || null;
    this.state = {
      offerTitle: selectedOffer && selectedOffer.name || '',
			price: selectedOffer && selectedOffer.price || '',
			offerPrice: selectedOffer && selectedOffer.offerPrice || '',
			fromTime: selectedOffer && selectedOffer.fromTime || '',
      toTime: selectedOffer && selectedOffer.toTime || '',
      offerSelected: selectedOffer,
      specialOfferServices: []
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

  bookAppointmentFunc = () => {
    //this.showAlert('Booked', 'Your appointment booked successfully.');
    console.log('console->bookAppointmentFunc');
	}

}
