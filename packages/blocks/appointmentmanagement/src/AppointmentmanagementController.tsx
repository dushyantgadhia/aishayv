import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import SessionManagerBlock from "../../../framework/src/Blocks/SessionManagerBlock";
import StorageProvider from "../../../framework/src/StorageProvider";
import moment from "moment";

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  route: any;
}

interface S {
  address: string;
  serviceSelected: any;
  specialistSelected: any;
  selectedTime: number;
  selectedDate: string;
  timeSlots: object[];
  serviceProviderId: string;
  showLoader: boolean;
}

interface SS {
  id: any;
}

export default class AppointmentmanagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  apiServiceProviderId: string = "";

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.state = {
      address: "",
      serviceSelected: null,
      specialistSelected: null,
      selectedTime: 0,
      selectedDate: moment().format("YYYY-MM-DD"),
      timeSlots: [],
      serviceProviderId: "4",
      showLoader: false,
    };
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    const { route } = this.props;
    this.getServiceProviderDetails();
    console.log('componentDidMount', route);
    if(route && route.params){
      const {selectedService, selectedSpecialist} = route.params;
      this.setState({serviceSelected: selectedService, specialistSelected: selectedSpecialist });
      //this.inputs.address.setValue(addressObj.formatted_address);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps:any) {
    const { route } = nextProps;
    //console.log('componentWillReceiveProps', nextProps);
    if(nextProps.route && nextProps.route.params){
      const {addressObj} = route.params;console.log('componentWillReceiveProps', JSON.stringify(addressObj));
      this.setState({address: addressObj.formatted_address });
      //this.inputs.address.setValue(addressObj.formatted_address);
    }
  }

  async componentWillUnmount() {
    this.unsubscribeMessages();
  }

  serviceCallTimes:number = 0;
  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Received", message);

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.setState({ showLoader: false });
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (!apiRequestCallId) return;

      if (errorReponse) {
        this.parseApiCatchErrorResponse(errorReponse);
        return;
      }

      if (!responseJson || !responseJson.data) {
        if(responseJson.errors[0].token == "Invalid token" && this.serviceCallTimes < 5){
          this.serviceCallTimes++;
          this.getServiceProviderDetails();
          return;
        }
        this.parseApiErrorResponse(responseJson);
        return;
      }

      switch (apiRequestCallId) {
        case this.apiServiceProviderId:
          const data = responseJson.data[0];
          if (!data) return;
          const timeSlots = this.generateDynamicSlots(
            data.attributes.start_time,
            data.attributes.end_time,
            data.attributes.unavailable_start_time,
            data.attributes.unavailable_end_time
          );
          this.setState({
            timeSlots,
          });
          break;
        default:
          break;
      }
    } else if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const addressSelectionMessage = message.getData(
        getName(MessageEnum.AddressSelectionMessage)
      );

      if (addressSelectionMessage) {
        this.setState({
          address: addressSelectionMessage.label,
        });
      }

      const serviceProviderIdMessage = message.getData(
        getName(MessageEnum.ServiceProviderIdMessage)
      );
      if (serviceProviderIdMessage) {
        this.setState({
          serviceProviderId: serviceProviderIdMessage,
        });
      }
    }
  }

  btnNextProps = () => {
    return {
      onPress: () => this.onNextPressed(),
      disabled:
        !this.state.address ||
        //!this.state.selectedTime ||
        !this.state.selectedDate,
    };
  };

  locationInputProps = {
    onPress: () => this.goToLocation(),
    testID: "LOCATION_INPUT_WRAPPER",
  };

  calendarProps = {
    onSelectDate: (selectedDate: string) => this.onSelectDate(selectedDate),
  };

  onNextPressed() {
    const {address, selectedTime, selectedDate, timeSlots} = this.state;
    this.props.navigation.navigate('AppointmentPaymentScreen', {
      address,
      selectedTimeSlot: timeSlots[selectedTime],
      selectedDate,
      selectedSpecialist:this.state.specialistSelected,
      selectedService:this.state.serviceSelected
    });return;
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(
      getName(MessageEnum.SelectedAddressMessage),
      this.state.address
    );
    msg.addData(
      getName(MessageEnum.SelectedTimeMessage),
      this.state.timeSlots[this.state.selectedTime]
    );
    msg.addData(
      getName(MessageEnum.SelectedDateMessage),
      this.state.selectedDate
    );
    return;
    this.send(msg); //Need to pass this data to payment screen
  }

  onSelectDate = (selecteDate: string) => {
    this.setState(
      { selectedDate: selecteDate, timeSlots: [], selectedTime: 0 },
      () => this.getServiceProviderDetails()
    );
  };

  onSlotSelect = (item:any) => {
    this.setState({ selectedTime: item.id })
  }

  async getServiceProviderDetails() {
    //const sessionManager = SessionManagerBlock.getInstance();
    //const token = sessionManager.getToken();
    const token = await StorageProvider.get('authToken') || '';
    this.setState({ showLoader: true });
    const { selectedDate, serviceProviderId } = this.state;
    const availableDate = moment(selectedDate).format("DD/MM/YYYY");
    const header = {
      "Content-Type": configJSON.serviceProviderApiContentType,
      token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiServiceProviderId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${
        configJSON.serviceProviderAPiEndPoint
      }?availability_date=${availableDate}&service_provider_id=${serviceProviderId ||
        4}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.serviceProviderAPiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  generateDynamicSlots(
    start: string,
    end: string,
    unavailableStartTime: string,
    unavailableEndTime: string
  ) {
    try {
      const startTime: any = moment(start, "HH:mm A");
      const endTime = moment(end, "HH:mm A");
      let unStartTime = null;
      let unEndTime = null;

      if (unavailableStartTime) {
        unStartTime = moment(unavailableStartTime, "HH:mm A");
        unEndTime = moment(unavailableEndTime, "HH:mm A");
      }

      const timeStops = [];
      let index = 0;
      while (startTime <= endTime) {
        //@ts-ignore
        const start = moment(startTime);
        //@ts-ignore
        const end = moment(startTime).add(60, "minutes");
        if (unStartTime) {
          if (
            start.isBetween(unStartTime, unEndTime) ||
            end.isBetween(unStartTime, unEndTime) ||
            start.isSame(unStartTime) ||
            end.isSame(unEndTime)
          ) {
            startTime.add(60, "minutes");
            continue;
          }
        }

        timeStops.push({
          id: index,
          start: start.format("h:mm"),
          end: end.format("h:mm A"),
        });
        startTime.add(60, "minutes");
        index++;
      }
      return timeStops;
    } catch (e) {
      return [];
    }
  }

  goToLocation = () => {
    this.props.navigation.navigate('Location', { fromScreenToLocation: 'BookAppointmentScreen' });
    // const msg: Message = new Message(
    //   getName(MessageEnum.NavigationLocationMessage)
    // );
    // msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    // this.send(msg);
  };

  unsubscribeMessages = () => {
    runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
  };
}
