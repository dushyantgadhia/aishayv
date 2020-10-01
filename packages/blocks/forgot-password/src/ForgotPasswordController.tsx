import { Keyboard } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from "yup";
import { isEmail } from '../../../framework/src/Helpers';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  accountType: string;
  emailSchema: any;
  phoneSchema: any;
  otpSchema: any;
  passwordSchema: any;
  accountStatus: any;
  passwordRules: any;
  email: any;
  emailValue: any;
  phoneValue: any;
  countryCodeSelected: any;
  token: any;
  enablePasswordField: Boolean;
  btnConfirmPasswordShowHide: Boolean;
  forgotPasswordLoader: boolean;
  errors: object;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  navigation: any;
  // Customizable Area End
}

// Customizable Area Start
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordInvisibleImage = require("../assets/ic_password_invisible.png");
const passwordVisibleImage = require("../assets/ic_password_visible.png");
// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  validationAPICallId: any;
  requestEmailOtpCallId: any;
  requestPhoneOtpCallId: any;
  requestChangePasswordCallId: any;
  requestGoToConfirmationCallId: any;
  requestForgotPasswordCallId: any;
  otpToken: any;
  isChangePassword: boolean;  
  inputs: object = {};

  //Properties from config
  labelTextIsAccountRecovery: string = configJSON.labelTextIsAccountRecovery;
  secondLabelText: string = configJSON.secondLabelText;
  thirdLabelText: string = configJSON.thirdLabelText;
  forthLabelText: string = configJSON.forthLabelText;
  fifthLabelText: string = configJSON.fifthLabelText;
  sixthLabelText: string = configJSON.sixthLabelText;
  firstInputAutoCompleteType: any = configJSON.firstInputAutoCompleteType;
  firstInputKeyboardStyle: any = configJSON.firstInputKeyboardStyle;
  firstInputPlaceholder: string = configJSON.firstInputPlaceholder;
  firstInputErrorColor: any = configJSON.firstInputErrorColor;
  buttonTextIsNext: string = configJSON.buttonTextIsNext;
  buttonColorForNextButton: any = configJSON.buttonColorForNextButton;
  secondInputAutoCompleteType: any = configJSON.secondInputAutoCompleteType;
  secondInputKeyboardType: any = configJSON.secondInputKeyboardType;
  secondInputPlaceholder: string = configJSON.secondInputPlaceholder;
  secondInputErrorColor: any = configJSON.secondInputErrorColor;
  thirdInputPlaceholder: string = configJSON.thirdInputPlaceholder;
  thirdInputErrorColor: any = configJSON.thirdInputErrorColor;
  buttonTitleIsSMSPhoneAccount: string =
    configJSON.buttonTitleIsSMSPhoneAccount;
  buttonTitleIsEmailAccount: string = configJSON.buttonTitleIsEmailAccount;
  labelTextIsPleaseEnterYourNewPassword: string =
    configJSON.labelTextIsPleaseEnterYourNewPassword;
  labelTextIsYourPasswordHasBeenSuccessfullyChanged: string =
    configJSON.labelTextIsYourPasswordHasBeenSuccessfullyChanged;
  placeholderIsPassword: string = configJSON.placeholderIsPassword;
  passwordVisibleImage: any = passwordVisibleImage;
  passwordInvisibleImage: any = passwordInvisibleImage;
  placeholderIsReTypePassword: string = configJSON.placeholderIsReTypePassword;
  buttonTitleIsOk: string = configJSON.buttonTitleIsOk;
  buttonColorForOkButton: any = configJSON.buttonColorForOkButton;
  countryCodeSelectorPlaceholder: string =
    configJSON.countryCodeSelectorPlaceholder;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    //email schema
    let emailSchema = {
      email: Yup.string()
        .email(configJSON.pleaseEnterAValidEmail)
        .required(configJSON.emailIsRequired)
    };

    //phone schema
    let phoneSchema = {
      // countryCode: Yup.number()
      // .required("Country code is required"),

      phone: Yup.string()
        .matches(phoneRegExp, configJSON.phoneNumberIsNotValid)
        .required(configJSON.phoneNumberIsRequired)
    };

    //otpSchema
    let otpSchema = {
      otpCode: Yup.number()
        .min(4)
        .required(configJSON.otpCodeIsRequired)
    };

    //passwordSchema
    let passwordSchema = {
      password: Yup.string()
        .required(configJSON.pleaseEnterAPassword)
        .min(2, configJSON.passwordMustBeAtLeast2Characters),
      confirmPassword: Yup.string()
        .required(configJSON.pleaseConfirmYourPassword)
        .when("password", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            configJSON.passwordsMustMatch
          )
        })
    };

    this.state = {
      accountType: "sms",
      accountStatus: "ChooseAccountType",
      email: "",
      emailValue: "",
      phoneValue: "",
      countryCodeSelected: "",
      passwordRules: "",
      emailSchema: emailSchema,
      phoneSchema: phoneSchema,
      otpSchema: otpSchema,
      passwordSchema: passwordSchema,
      token: "",
      enablePasswordField: true,
      btnConfirmPasswordShowHide: true,
      forgotPasswordLoader: false,
      errors: {}
    };
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.validationRulesRequest();
  }

  validationRulesRequest = () => {
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.profileValidationSettingsAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  async receive(from: string, message: Message) {    
    this.setState({forgotPasswordLoader:false});
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const otpAuthTkn = message.getData(
        getName(MessageEnum.AuthTokenDataMessage)
      );

      if (otpAuthTkn && otpAuthTkn.length > 0) {
        this.setState({ token: otpAuthTkn });
        if (this.isChangePassword) {
          this.setState({ accountStatus: "ChangePassword" });
        }
        this.otpToken = this.state.token;
        // runEngine.debugLog("otpAuthTkn", this.state.token);
      } else {
        const accountType = message.getData(
          getName(MessageEnum.NavigationForgotPasswordPageInfo)
        );
        if (accountType) {
          this.startForgotPassword(accountType);
        }
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.validationAPICallId &&
      this.validationAPICallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (responseJson === undefined) {
        return;
      }

      if (responseJson && responseJson.data[0]) {
        const passRegex = RegExp(
          responseJson.data[0].password_validation_regexp
        );
        const emailRegex = RegExp(responseJson.data[0].email_validation_regexp);
        const passwordRulesFromValidation =
          responseJson.data[0].password_validation_rules;

        this.setState({
          //email schema
          emailSchema: {
            email: Yup.string()
              .email(configJSON.pleaseEnterAValidEmail)
              .required(configJSON.emailIsRequired)
              .matches(emailRegex, configJSON.invalidEmailAddress)
          },
          //password schema
          passwordSchema: {
            password: Yup.string()
              .required(configJSON.pleaseEnterAPassword)
              .matches(passRegex, configJSON.invalidPassword),

            confirmPassword: Yup.string()
              .required(configJSON.pleaseConfirmYourPassword)
              .when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref("password")],
                  configJSON.passwordsMustMatch
                )
              })
          },
          passwordRules: passwordRulesFromValidation
        });
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.requestForgotPasswordCallId !== null &&
      this.requestForgotPasswordCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      console.log('FPC->requestForgotPasswordCallId', responseJson);

      if (
        responseJson !== undefined &&
        responseJson.success &&
        responseJson.data
      ) {
        responseJson.message ? this.showAlert('Success', responseJson.message) : '';
        runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
        this.props.navigation.navigate('ResetPasswordScreen');
      }else if(errorReponse){
        this.parseApiCatchErrorResponse(errorReponse);
      }else{
        this.parseApiErrorResponse(responseJson);
      }
      
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.requestEmailOtpCallId !== null &&
      this.requestEmailOtpCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      // console.log("entered email!!!!");
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (
        responseJson !== undefined &&
        responseJson.meta &&
        responseJson.meta.token
      ) {
        this.otpToken = responseJson.meta.token;

        this.setState({ token: this.otpToken });

        //navigate to OTP page
        const msg: Message = new Message(
          getName(MessageEnum.NavigationMobilePhoneOTPMessage)
        );

        msg.addData(
          getName(MessageEnum.AuthTokenDataMessage),
          this.state.token
        );

        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

        msg.addData(
          getName(MessageEnum.AuthTokenEmailMessage),
          this.state.emailValue
        );

        msg.addData(getName(MessageEnum.EnterOTPAsForgotPasswordMessage), true);

        this.send(msg);
      }
      //error handling
      else if (responseJson && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.parseApiCatchErrorResponse(errorReponse);
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.requestPhoneOtpCallId !== null &&
      this.requestPhoneOtpCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      // console.log("entered phone!!!!");
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (
        responseJson !== undefined &&
        responseJson.meta &&
        responseJson.meta.token
      ) {
        this.otpToken = responseJson.meta.token;
        this.setState({ token: this.otpToken });

        const msg: Message = new Message(
          getName(MessageEnum.NavigationMobilePhoneOTPMessage)
        );
        msg.addData(
          getName(MessageEnum.AuthTokenDataMessage),
          this.state.token
        );

        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

        msg.addData(
          getName(MessageEnum.AuthTokenPhoneNumberMessage),
          this.state.phoneValue
        );

        msg.addData(getName(MessageEnum.EnterOTPAsForgotPasswordMessage), true);

        this.send(msg);
      }
      //error handling
      else if (responseJson && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.parseApiCatchErrorResponse(errorReponse);
      }
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.requestGoToConfirmationCallId !== null &&
      this.requestGoToConfirmationCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      // console.log("entered 3");
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson !== undefined && responseJson.data) {
        this.setState({
          accountStatus: "Confirmation"
        });
      } else if (responseJson !== undefined && responseJson.errors) {
        this.parseApiErrorResponse(responseJson);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );

        this.parseApiCatchErrorResponse(errorReponse);
      }
    } else if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      var selectedCode = message.getData(
        getName(MessageEnum.CountyCodeDataMessage)
      );

      if (selectedCode !== undefined) {
        this.setState({
          countryCodeSelected:
            selectedCode.indexOf("+") > 0
              ? selectedCode.split("+")[1]
              : selectedCode
        });
      }
    }
  }

  startForgotPassword(accountType: String) {
    this.setState({
      accountStatus: accountType === "sms" ? "EnterPhone" : "EnterEmail"
    });
  }

  goToOtpAfterEmailValidation(values: { accountType: string; email: string }) {
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestEmailOtpCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryStartOtpAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({
      emailValue: values.email ? values.email : ""
    });

    const data = {
      type: values.accountType ? values.accountType : "email_account",
      attributes: {
        email: values.email ? values.email : ""
      }
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToOtpAfterPhoneValidation(values: { phone: string }) {
    // console.log("entered phone validation code");
    if (
      !this.state.countryCodeSelected ||
      this.state.countryCodeSelected.length === 0
    ) {
      this.showAlert(
        configJSON.goToOtpAfterPhoneValidationErrorTitle,
        configJSON.goToOtpAfterPhoneValidationErrorBody
      );
      return;
    }
    console.log(this.state.countryCodeSelected);
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestPhoneOtpCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryStartOtpAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({
      phoneValue:
        this.state.countryCodeSelected && values.phone
          ? this.state.countryCodeSelected + values.phone
          : ""
    });

    const data = {
      type: "sms_account",
      attributes: {
        full_phone_number: this.state.phoneValue
      }
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToChangePasswordAfterOtp(values: { otpCode: string }) {
    //change status to change password
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestChangePasswordCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryConfirmOtpAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
      token: this.otpToken ? this.otpToken : "",
      otp_code: values.otpCode ? values.otpCode : ""
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToConfirmationAfterPasswordChange(values: {
    password: any;
    confirmPassword: any;
  }) {
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestGoToConfirmationCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryChangePasswordAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
      token: this.otpToken ? this.otpToken : "",
      new_password: values.password
    };

    const httpBody = {
      data: data
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToHome() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationHomeScreenMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
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
		this.setState({ [field]: value, errors });
	};

	_validateForm = () => {
		const { email, errors } = this.state;
		let formIsValid = true;
		if (!email || email) {
      //@ts-ignore
      errors.email = isEmail("email", email);
      //@ts-ignore
			formIsValid = !!errors.email.status;
		}
		this.setState({ errors });

		return formIsValid;
	};

	submitEmail = async () => {
		Keyboard.dismiss();
		if (this._validateForm()) {
			NetInfo.fetch().then(netInfoObj => {
				if (netInfoObj && netInfoObj.isConnected) {
          this.setState({forgotPasswordLoader:true});
					const { email } = this.state;
					const attrs = {
						email: email
          };
          const data = {
            attributes : attrs
          };
					const header = {
            "Content-Type": configJSON.forgotPasswordAPiContentType
          };
          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
          //GO TO REQUEST STATE
          this.requestForgotPasswordCallId = requestMessage.messageId;
      
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.forgotPasswordAPiEndPoint
          );
      
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
          );
      
          const httpBody = {
            data: data
          };
      
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.httpPostMethod
          );
      
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(httpBody)
          );
      
          runEngine.sendMessage(requestMessage.id, requestMessage);
				} else {
					this.showAlert('No internet connection.', 'Please check your internet connection.');
				}
			});
		}
	};
}
