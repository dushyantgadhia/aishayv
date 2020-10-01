import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import moment from "moment";
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  index: number;
  routes: Array<any>;
  selectedDate: Date;
  minDate: Date;
  appointmentDates: Array<any>;
  calendarViewRefreshObj: object;
  reminder:boolean;
  appointmentHistory: Array<any>;
  // Customizable Area End
}

interface SS {
  id: any;
}

const appointmentHistoryObj = [
  {
    id:1,
    salonName: 'Conado Hair Studio',
    addressSelected: '311 Jefferey Springs Suite, Chicago, Illinois, US.',
    //slot: '1:30 - 2:30 PM',
    date: '2020-03-24T18:30:00.000Z',
    servicePerson: 'Lettie Neal',
    service: "Makeup Marguerite"
  },
  {
    id:2,
    salonName: 'Ora Burgess Salon',
    addressSelected: '460 Bergnaum Rapids, Chicago, Illinois, US.',
    //slot: '1:30 - 2:30 PM',
    date: '2020-01-12T18:30:00.000Z',
    servicePerson: 'Emilie Rose',
    service: "Change Hair Color"
  },
  {
    id:3,
    salonName: 'Girls Salon Studio',
    addressSelected: '134 Kozey Garden, Chicago, Illinois, US.',
    //slot: '1:30 - 2:30 PM',
    date: '2019-12-17T18:30:00.000Z',
    servicePerson: 'Beauty Girl Event',
    service: "Beauty Girl Event"
  }
];

export default class AppointmentsOngoingHistoryController extends BlockComponent<
  Props,
  S,
  SS
> {
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [getName(MessageEnum.AccoutLoginSuccess)];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      index:0,
      routes:[{key: 'Ongoing', title: 'Ongoing'},{key: 'History', title: 'History'}],
      selectedDate: moment().toDate(),
      minDate: moment().toDate(),
      calendarViewRefreshObj: { "2000-01-01": { marked: false } },
      appointmentDates: ['2020-09-03', '2020-09-10', '2020-09-15'],
      reminder: true,
      appointmentHistory: appointmentHistoryObj
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }
    // Customizable Area End
  }

  // Customizable Area Start

  setIndex = (index:any) => {
		this.setState({index:index});
  }

  setReminder = (val:boolean) => {
		this.setState({reminder:val});
  }

  selectDate = (dateObj:object) => {
    console.log('selectedDate dateObj',dateObj);
    console.log('selectedDate dateObj1',moment(dateObj.dateString).toDate());
    const date = moment(dateObj.dateString).toDate();
    let markedDate = {
      date: { marked: false }
    }
    this.setState({selectedDate: date, calendarViewRefreshObj: markedDate});
  }
  
  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address"
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed()
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }
  // Customizable Area End
}
