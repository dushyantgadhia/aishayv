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

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route: any
  // Customizable Area End
}

interface S {
  activeContent: string;
  serviceProviderDetails: any;
  selectedServiceDetails: any;
  selectedAddress: any;
  selectedDate: any;
  selectedSlot: any;
}

interface SS {
  id: any;
}

export const PAYMENT_CONTENT = "PAYMENT_CONTENT";
export const PAYMENT_CONFIRMATION_CONTENT = "PAYMENT_CONFIRMATION_CONTENT";

export default class PaymentsController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.AccoutLoginSuccess)];

    this.state = {
      activeContent: PAYMENT_CONTENT,
      serviceProviderDetails: null,
      selectedServiceDetails: null,
      selectedAddress: null,
      selectedDate: '',
      selectedSlot: null,
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
    }
    // Customizable Area End
  }

  btnNextProps = {
    onPress: () => this.onNextPressed(),
  };

  onNextPressed() {
    this.setState({
      activeContent: PAYMENT_CONFIRMATION_CONTENT,
    });
  }

  populateDetails = (data:any) => {
    const {params} = data;
    console.log('populateDetails', data);
    if(params){
      this.setState({
        serviceProviderDetails: params.selectedSpecialist || null,
        selectedServiceDetails: params.selectedService || null,
        selectedAddress: params.address || null,
        selectedDate: params.selectedDate || '',
        selectedSlot: params.selectedTimeSlot || null,
      })
    }
  }

  async componentDidMount(){
    console.log('PayCon', this.props);
    if(this.props.route){
      this.populateDetails(this.props.route);
    }
  }

  async UNSAFE_componentWillReceiveProps(nextProps: Props){
    console.log('PayCon1', this.props);
    if(this.props.route != nextProps.route){}
  }

  // Customizable Area End
}
