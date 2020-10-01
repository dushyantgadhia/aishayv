import { Keyboard } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { requireValidate, confirmPasswordValidate } from "../../../framework/src/Helpers";

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
  confirmPassword: string;
  password: string;
  otp: string;
  resetPasswordLoader: boolean;
  resetSuccess: boolean;
  errors: object;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class ResetPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  resetPasswordApiCallId: any;
  inputs: object = {};
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
      confirmPassword: '',
			password: '',
			otp: '',
      resetPasswordLoader: false,
			resetSuccess: false,
			errors: {}
    };
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    setTimeout(()=>{this.setState({resetSuccess:false})},10000);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    console.log('RPC->receive', message);
    
    // Customizable Area Start
    this.setState({resetPasswordLoader:false});
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

        if (apiRequestCallId === this.resetPasswordApiCallId) {
          if (responseJson && responseJson.success && responseJson.data) {
            this.setModalVisible(true);
            setTimeout(()=>{this.setModalVisible(false)},3000);
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
  setModalVisible = (visible:boolean = false) => {
		const { navigation } = this.props;
		console.log('setModalVisible', visible);
		this.setState({ resetSuccess: visible });
		if(!visible && navigation){
			//this.props.setPasswordResetSuccess(false);
			navigation.navigate('EmailLoginScreen');
		}
	}

  _focusNextField = (nextField:string) => {
		//@ts-ignore
		nextField && this.inputs[nextField] ? this.inputs[nextField].focus() : "";
	}

	_handleInputChange = (field:string, value:any) => {
    const { errors, password } = this.state;
    //@ts-ignore
		if (field === "otp") errors[field] = requireValidate(field, value);
    //@ts-ignore
		if (field === "confirmPassword") errors[field] = confirmPasswordValidate("confirm new password", value, "new password", password);
    //@ts-ignore
		if (field === "password") errors[field] = requireValidate("new password", value);
    //@ts-ignore
		this.setState({ [field]: value, errors });
	};

	_validateForm = () => {
		const { confirmPassword, password, otp, errors } = this.state;
		let formIsValid = true;
		if (!password) {
      //@ts-ignore
      errors.password = requireValidate("new password", password);
      //@ts-ignore
			formIsValid = !!errors.password.status;
		}
		if (!otp) {
      //@ts-ignore
      errors.otp = requireValidate("otp", password);
      //@ts-ignore
			formIsValid = !!errors.otp.status;
		}
		if (!confirmPassword) {
      //@ts-ignore
      errors.confirmPassword = requireValidate("confirm new password", confirmPassword);
      //@ts-ignore
			formIsValid = !!errors.confirmPassword.status;
		}else{
      //@ts-ignore
      errors.confirmPassword = confirmPasswordValidate("confirm new password", confirmPassword, "new password", password);
      //@ts-ignore
			formIsValid = !!errors.confirmPassword.status;
		}
		this.setState({ errors });
		
		return formIsValid;
	};
	
	submitNewPasswords = async () => {
    const { confirmPassword, otp, password, resetPasswordLoader} = this.state;
		if(resetPasswordLoader){
			return;
		}
		Keyboard.dismiss();
		if (this._validateForm()) {
			NetInfo.fetch().then(netInfoObj => {
				if (netInfoObj && netInfoObj.isConnected) {
          this.setState({resetPasswordLoader:true});
					const userResetData = {
						otp: Number(otp),
						password: password,
						password_confirmation: confirmPassword,
          };
          const header = {
            "Content-Type": configJSON.resetPasswordApiContentType
          };
      
          const httpBody = {
            user: userResetData
          };
          
          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
          this.resetPasswordApiCallId = requestMessage.messageId;
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.resetPasswordAPiEndPoint
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
            configJSON.resetPasswordAPiMethod
          );
          runEngine.sendMessage(requestMessage.id, requestMessage);					
				} else {
					this.showAlert('No internet connection.', 'Please check your internet connection.');
				}
			});
		}
  }

}
