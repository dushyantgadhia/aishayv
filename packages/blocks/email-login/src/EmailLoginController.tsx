import { Keyboard } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { isEmail, requireValidate, resetTo, customAlert } from "../../../framework/src/Helpers";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import StorageProvider from "../../../framework/src/StorageProvider";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";


export const configJSON = require("./config");
import {imgLogoPath} from './assets';
import { AsyncStorage } from '@react-native-community/async-storage';

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  signInLoader: boolean;
  errors: object;
  imgLogoPath: any;
  btnTxtLogin: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailLoginController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  inputs: object = {};
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.receive = this.receive.bind(this);
  
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials)
    ]
    
    this.state = {
      email: "test12@yopmail.com",
      password: "123456",
      signInLoader: false,
      errors: {},
      imgLogoPath: imgLogoPath,
      btnTxtLogin: configJSON.btnTxtLogin
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    //this.getProfileDetails();
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  btnForgotPasswordProps = {
    onPress: () => this.goToForgotPassword()
  };

  // Customizable Area End

  async receive(from: string, message: Message) {
    console.log('ELC->receive', message);

    // Customizable Area Start
    this.setState({signInLoader:false});
    if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
      const userName = message.getData(getName(MessageEnum.LoginUserName));

      const password = message.getData(getName(MessageEnum.LoginPassword));

      if (userName && password) {
        this.setState({
          email: userName,
          password: password
        });

        //@ts-ignore
        this.txtInputEmailProps.value = userName;

        //@ts-ignore
        this.txtInputPasswordProps.value = password;
      }
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
        if (
          apiRequestCallId === this.validationApiCallId &&
          responseJson !== undefined
        ) {
          var arrayholder = responseJson.data;

          if (arrayholder && arrayholder.length !== 0) {
            let regexData = arrayholder[0];

            if (regexData && regexData.email_validation_regexp) {
              this.emailReg = new RegExp(regexData.email_validation_regexp);
            }
          }
        }

        console.log('ELC->responseJson', responseJson);
        console.log('ELC->errorReponse', errorReponse);
        if (apiRequestCallId === this.apiEmailLoginCallId) {
          if (responseJson && responseJson.meta && responseJson.meta.token) {
            //AsyncStorage.setItem("authToken", responseJson.data.user.authentication_token);
            runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
            this.saveLoggedInUserData(responseJson);
            //this.getProfileDetails(responseJson.meta.token);
            //AsyncStorage.setItem('authToken', responseJson.data.user.authentication_token);
            await StorageProvider.set('authToken', responseJson.meta.token);
            //this.props.navigation.navigate('DiscoverScreen');
            resetTo('authStack');
            //this.sendLoginSuccessMessage();
            //this.openInfoPage();
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
            //const message = responseJson.message || responseJson.data.message || "Login Error, please try again later";
            //this.showAlert("Error", message);
            //this.sendLoginFailMessage();
          }

          errorReponse ? this.parseApiCatchErrorResponse(errorReponse) : '';
        }
      }
    }
    // Customizable Area End
  }

  _focusNextField = (nextField:string) => {
    //console.log('nextField', nextField, this.inputs);
    //@ts-ignore
		nextField && this.inputs[nextField] ? this.inputs[nextField].focus() : "";
	}

	forgotPasswordClicked = () => {
		this.props.navigation.navigate('ForgotPassword');
	}

	signUpClicked = () => {
		this.props.navigation.navigate('EmailAccountRegistration');
	}

	_handleInputChange = (field:string, value:any) => {
		const { errors } = this.state;
		if (field === "email") {
			let textValue = value.replace(/\s/g, "");
			value = textValue;
    }
    //@ts-ignore
    if (field === "email") errors[field] = isEmail(field, value);
    //@ts-ignore
    if (field === "password") errors[field] = requireValidate(field, value);
    //@ts-ignore
		this.setState({ [field]: value, errors });
	};

	_validateForm = () => {
		const { email, password, errors } = this.state;
		let formIsValid = true;
		if (!email) {
      //@ts-ignore
      errors.email = isEmail("email", email);
      //@ts-ignore
			formIsValid = !!errors.email.status;
		}
		if (!password) {
      //@ts-ignore
      errors.password = requireValidate("password", password);
      //@ts-ignore
			formIsValid = !!errors.password.status;
		}
		this.setState({ errors });

		return formIsValid;
	};

	submitLogin = async () => {
    Keyboard.dismiss();    
		if (this._validateForm()) {
			NetInfo.fetch().then(netInfoObj => {
				//console.log('console->submitLogin', netInfoObj);
				if (netInfoObj && netInfoObj.isConnected) {
          this.setState({signInLoader:true});
          const { email, password } = this.state;
          const header = {
            "Content-Type": configJSON.loginApiContentType
          };
					const attrs = {
						email: email,
						password: password
					};
          console.log('console->submitLogin', attrs);
          
          const data = {
            type: "email_account",
            attributes: attrs
          };
      
          const httpBody = {
            data: data
          };
      
          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
      
          this.apiEmailLoginCallId = requestMessage.messageId;
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.loginAPiEndPoint
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
            configJSON.loginAPiMethod
          );
      
          runEngine.sendMessage(requestMessage.id, requestMessage);
          //this.setState({signInLoader:false});
					//this.props.postLoginAction(user);
				} else {
          customAlert("No internet connection.", 'Please check your internet connection.');
        }
        return;
			});
		}
  };
  
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

    this.apiEmailLoginCallId = requestMessage.messageId;
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

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }
  
  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    console.log('console->saveLoggedInUserData', responseJson);
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      this.send(msg);
    }
  }

  openInfoPage() {
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  }

  goToForgotPassword() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
  }

}
