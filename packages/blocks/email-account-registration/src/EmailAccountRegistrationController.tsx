import { Keyboard, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import moment from "moment";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { isEmpty, isEmail, requireValidate, phoneValidate } from "../../../framework/src/Helpers";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

export interface S {
  // Customizable Area Start
  fullname: string;
  mobile: string;
  dateOfBirth: string;
  dobObj: any;
  addressObj: any;
  address: string;
  showDatePicker: boolean;
  signupLoader: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otpAuthToken: string;
  reTypePassword: string;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  countryCodeSelected: string;
  phone: string;
  errors: object;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountRegistrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;
  validationApiCallId: string = "";

  imgPasswordVisible: any;
  imgPasswordInVisible: any;

  labelHeader: any;
  labelFirstName: string;
  lastName: string;
  labelEmail: string;
  labelPassword: string;
  labelRePassword: string;
  labelLegalText: string;
  labelLegalTermCondition: string;
  labelLegalPrivacyPolicy: string;
  btnTextSignUp: string;

  currentCountryCode: any;
  inputs: object = {};
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    this.receive = this.receive.bind(this);
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      // Customizable Area Start
      fullname: '',
			mobile: '',
			dateOfBirth: '',
			dobObj: new Date(),
      addressObj: null,
      address: '',
      showDatePicker: false,
      signupLoader: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reTypePassword: "",
      otpAuthToken: "",
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      countryCodeSelected: "",
      phone: "",
      errors: {}
      // Customizable Area End
    };

    // Customizable Area Start
    this.arrayholder = [];
    this.passwordReg = new RegExp("\\w+");
    this.emailReg = new RegExp("\\w+");

    this.imgPasswordVisible = imgPasswordVisible;
    this.imgPasswordInVisible = imgPasswordInVisible;

    this.labelHeader = configJSON.labelHeader;
    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelEmail = configJSON.labelEmail;
    this.labelPassword = configJSON.labelPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.labelLegalText = configJSON.labelLegalText;
    this.labelLegalTermCondition = configJSON.labelLegalTermCondition;
    this.labelLegalPrivacyPolicy = configJSON.labelLegalPrivacyPolicy;
    this.btnTextSignUp = configJSON.btnTextSignUp;
    // Customizable Area End
  }

  UNSAFE_componentWillReceiveProps(nextProps:any) {
    const { route } = nextProps;
    //console.log('componentWillReceiveProps', nextProps);
    if(nextProps.route && nextProps.route.params){
      const {addressObj} = route.params;console.log('componentWillReceiveProps', JSON.stringify(addressObj));
      this.setState({address: addressObj.formatted_address, addressObj})
    }
  }

  async receive(from: string, message: Message) {
    this.setState({signupLoader:false});
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.validationApiCallId) {
          this.arrayholder = responseJson.data;

          if (this.arrayholder && this.arrayholder.length !== 0) {
            let regexData = this.arrayholder[0];

            if (regexData.password_validation_regexp) {
              this.passwordReg = new RegExp(
                regexData.password_validation_regexp
              );
            }

            if (regexData.password_validation_rules) {
              this.setState({
                passwordHelperText: regexData.password_validation_rules
              });
            }

            if (regexData.email_validation_regexp) {
              this.emailReg = new RegExp(regexData.email_validation_regexp);
            }
          }
        } else if (apiRequestCallId === this.createAccountApiCallId) {
          console.log('EARC->responseJson', responseJson);
          if (responseJson && responseJson.meta && responseJson.meta.token) {
            runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
            this.props.navigation.navigate('VerificationScreen');
            // const msg: Message = new Message(
            //   getName(MessageEnum.AccoutResgistrationSuccess)
            // );

            // msg.addData(
            //   getName(MessageEnum.NavigationPropsMessage),
            //   this.props
            // );

            // this.send(msg);
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          this.parseApiCatchErrorResponse(errorReponse);
        }
      }
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const otpAuthTkn = message.getData(
        getName(MessageEnum.AuthTokenDataMessage)
      );
      if (otpAuthTkn && otpAuthTkn.length > 0) {
        this.setState({ otpAuthToken: otpAuthTkn });
        runEngine.debugLog("otpAuthTkn", this.state.otpAuthToken);
        runEngine.unSubscribeFromMessages(this as IBlock, [message.id]);
      }
    }

    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
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
    // Customizable Area End
  }

  // Customizable Area Start
  goToPrivacyPolicy() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPrivacyPolicyMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToTermsAndCondition() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationTermAndConditionMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isValidEmail(email: string) {
    return this.emailReg.test(email);
  }

  createAccount(): boolean {
    if (
      this.isStringNullOrBlank(this.state.firstName) ||
      this.isStringNullOrBlank(this.state.lastName) ||
      this.isStringNullOrBlank(this.state.email) ||
      this.isStringNullOrBlank(this.state.password) ||
      this.isStringNullOrBlank(this.state.reTypePassword)
    ) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorAllFieldsAreMandatory
      );
      return false;
    }

    var phoneNumberError = this.validateCountryCodeAndPhoneNumber(
      this.state.countryCodeSelected,
      this.state.phone
    );

    if (phoneNumberError) {
      this.showAlert(configJSON.errorTitle, phoneNumberError);
      return false;
    }

    if (!this.isValidEmail(this.state.email)) {
      this.showAlert(configJSON.errorTitle, configJSON.errorEmailNotValid);
      return false;
    }

    if (!this.passwordReg.test(this.state.password)) {
      this.showAlert(configJSON.errorTitle, configJSON.errorPasswordNotValid);
      return false;
    }

    if (this.state.password !== this.state.reTypePassword) {
      this.showAlert(
        configJSON.errorTitle,
        configJSON.errorBothPasswordsNotSame
      );
      return false;
    }

    const header = {
      "Content-Type": configJSON.contentTypeApiAddDetail
    };

    const attrs = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      full_phone_number: "+" + this.state.countryCodeSelected + this.state.phone
    };

    const data = {
      type: "email_account",
      attributes: attrs
    };

    const httpBody = {
      data: data,
      token: this.state.otpAuthToken
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.accountsAPiEndPoint
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
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }

  isNonNullAndEmpty(value: String) {
    return (
      value !== undefined &&
      value !== null &&
      value !== "null" &&
      value.trim().length > 0
    );
  }

  validateCountryCodeAndPhoneNumber(countryCode: string, phoneNumber: string) {
    let error = null;

    if (this.isNonNullAndEmpty(phoneNumber)) {
      if (!this.isNonNullAndEmpty(String(countryCode))) {
        error = configJSON.errorCountryCodeNotSelected;
      }
    } else if (this.isNonNullAndEmpty(countryCode)) {
      if (!this.isNonNullAndEmpty(phoneNumber)) {
        error = "Phone " + configJSON.errorBlankField;
      }
    }

    return error;
  }

  //added on 01 Sept,2020
  setShowDatePicker = () => {
    Keyboard.dismiss();
    this.setState({ showDatePicker: true });
    console.log('console->setShowDatePicker');
  }

  handleDatePicked = (event:any, selectedDate:any) => {
    const { errors, dobObj, dateOfBirth } = this.state;
    let dateObj = selectedDate ? selectedDate : dateOfBirth ? dobObj : '';
    let date = dateObj ? moment(dateObj).format('MMM DD,YYYY') : "";
    console.log('console->handleDatePicked', date, event);
    //@ts-ignore
    errors["dateOfBirth"] = requireValidate("date of birth", date);
    //@ts-ignore
    this.inputs.dateOfBirth.setValue(date);
    this.setState({ dobObj: dateObj || dobObj, dateOfBirth: date, showDatePicker: Platform.OS === 'ios', errors });
  };

	_focusNextField = (nextField:string) => {
    //@ts-ignore
    nextField && this.inputs[nextField] ? this.inputs[nextField].focus() : "";
	}
	
	signInClicked = () => {
    this.props.navigation.navigate('EmailLoginScreen');
  }

  goToLocation = () => {
    this.props.navigation.navigate('Location', { fromScreenToLocation: 'EmailAccountRegistration' });
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
    if (field === "mobile") errors[field] = phoneValidate(field, value);
    //@ts-ignore
    if (field === "fullname") errors[field] = requireValidate('full name', value);
    //if (field === "dateOfBirth") errors[field] = requireValidate('date of birth', value);
    //@ts-ignore
    if (field === "address") errors[field] = requireValidate(field, value);
    //@ts-ignore
    this.setState({ [field]: value, errors });
  };

  _validateForm = () => {
    const { fullname, email, password, mobile, dateOfBirth, address, errors } = this.state;
    let formIsValid = true;
    if (!email || email) {
      //@ts-ignore
      errors.email = isEmail("email", email);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.email.status : formIsValid;
    }
    if (!password) {
      //@ts-ignore
      errors.password = requireValidate("password", password);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.password.status : formIsValid;
    }
    if (!mobile || mobile) {
      //@ts-ignore
      errors.mobile = phoneValidate("mobile", mobile);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.mobile.status : formIsValid;
    }
    if (!fullname) {
      //@ts-ignore
      errors.fullname = requireValidate("full name", fullname);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.fullname.status : formIsValid;
    }
    if (!dateOfBirth) {
      //@ts-ignore
      errors.dateOfBirth = requireValidate("date of birth", dateOfBirth);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.dateOfBirth.status : formIsValid;
    }
    if (!address) {
      //@ts-ignore
      errors.address = requireValidate("address", address);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.address.status : formIsValid;
    }
    console.log('errors', errors);
    this.setState({ errors });

    return formIsValid;
  };

  submitRegister = async () => {
    const {navigation} = this.props;
    console.log('submitRegister', this.state);
    Keyboard.dismiss();
    if (this._validateForm()) {
      NetInfo.fetch().then(netInfoObj => {
      if (netInfoObj && netInfoObj.isConnected) {
          this.setState({signupLoader:true});
          const { email, password, fullname, mobile, dateOfBirth, dobObj, address, addressObj } = this.state;
          const userRegisterationData = {
            email: email,
            password: password,
            full_phone_number: mobile,
            name: fullname,
            dob: !isEmpty(dateOfBirth) ? moment(dobObj).format('DD-MM-YYYY') : '',
            address: address || '',
            latitude: addressObj && addressObj.location && addressObj.location.lat.toString() || '',
            longitude: addressObj && addressObj.location && addressObj.location.lng.toString() || '',
            //is_customer: true
          };

          const data = {
            type: "email_account",
            attributes: userRegisterationData
          }
          
          const header = {
            "Content-Type": configJSON.contentTypeApiAddDetail
          };
      
          const httpBody = {
            data: data
          };
          
          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
          this.createAccountApiCallId = requestMessage.messageId;
          requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.accountsAPiEndPoint
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
            configJSON.apiMethodTypeAddDetail
          );
      
          runEngine.sendMessage(requestMessage.id, requestMessage);
          //navigation.navigate('Verification');
          //this.props.postSignupAction(user);
        } else {
          this.showAlert("No internet connection.", 'Please check your internet connection.');
        }
      });
    }
  };
  //End

  imgEnableRePasswordFieldProps = {
    source: imgPasswordVisible
  };

  btnConfirmPasswordShowHideProps = {
    onPress: () => {
      this.setState({
        enableReTypePasswordField: !this.state.enableReTypePasswordField
      });
      this.txtInputConfirmPasswordProps.secureTextEntry = !this.state
        .enableReTypePasswordField;
      this.imgEnableRePasswordFieldProps.source = this
        .txtInputConfirmPasswordProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  imgEnablePasswordFieldProps = {
    source: imgPasswordVisible
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.imgEnablePasswordFieldProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    }
  };

  btnSignUpProps = {
    onPress: () => this.createAccount()
  };

  btnLegalPrivacyPolicyProps = {
    onPress: () => this.goToPrivacyPolicy()
  };

  btnLegalTermsAndConditionProps = {
    onPress: () => this.goToTermsAndCondition()
  };

  txtInputEmailWebPrpos = {
    onChangeText: (text: string) => {
      this.setState({ email: text });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text;
    }
  };

  txtInputEmailMobilePrpos = {
    ...this.txtInputEmailWebPrpos,
    keyboardType: "email-address"
  };

  txtInputEmailPrpos = this.isPlatformWeb()
    ? this.txtInputEmailWebPrpos
    : this.txtInputEmailMobilePrpos;

  txtPhoneNumberWebProps = {
    onChangeText: (text: string) => {
      this.setState({ phone: text });

      //@ts-ignore
      this.txtPhoneNumberProps.value = text;
    }
  };

  txtPhoneNumberMobileProps = {
    ...this.txtPhoneNumberWebProps,
    autoCompleteType: "tel",
    keyboardType: "phone-pad"
  };

  txtPhoneNumberProps = this.isPlatformWeb()
    ? this.txtPhoneNumberWebProps
    : this.txtPhoneNumberMobileProps;

  txtInputLastNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ lastName: text });

      //@ts-ignore
      this.txtInputLastNamePrpos.value = text;
    }
  };

  txtInputFirstNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });

      //@ts-ignore
      this.txtInputFirstNamePrpos.value = text;
    }
  };

  txtInputConfirmPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ reTypePassword: text });

      //@ts-ignore
      this.txtInputConfirmPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  // Customizable Area End
}
