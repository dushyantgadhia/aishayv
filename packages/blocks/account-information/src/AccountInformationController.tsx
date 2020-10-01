
import {Keyboard, Platform} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import ImagePicker from "react-native-image-crop-picker";
import moment from "moment";

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { requireValidate, phoneValidate, customAlert, isEmpty, getProfileData } from "../../../framework/src/Helpers";
import StorageProvider from "../../../framework/src/StorageProvider";
//import { AsyncStorage } from "@react-native-community/async-storage";

// Customizable Area Start
//import { imgLogoPath } from "./assets";
const profileData = null;
// Customizable Area End

const user = {
  "id": 2,
  "email": "customer2@yopmail.com",
  "authentication_token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjAxNzkzNzUwfQ.LTEyrbyZsmZirm3uPVa255wtykkkLGll5q5ijJ83hSk",
  "is_customer": true,
  "profile": {
      "id": 2,
      "fullname": "satish sehgal",
      "mobile": "+919999999999",
      "date_of_birth": "2000-08-21T00:00:00.000Z"
  },
  "addresses": [
      {
          "id": 2,
          "name": "Ashok nagar new delhi 11002"
      }
  ]
}

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route:any
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  editProfile: boolean;
  userData:any;
  avatarUrl: string;
  fullname: string;
  mobile: string;
  dateOfBirth: string;
  dobObj: any;
  address: string;
  addressObj: any;
  showDatePicker: boolean;
  updateAccLoader: boolean;
  email: string;
  password: string;
  fieldsChanged: Array<any>;
  errors: any;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class AccountInformationController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  updateAccountApiCallId: any;
  inputs: any = {};
  ActionSheet: any;
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    const userDataObj:any = props.route.params && props.route.params.profileData || null;
    console.log('userDataObj', userDataObj);
    const date_of_birth = userDataObj && userDataObj.attributes && userDataObj.attributes.dob || '';
    const dob = date_of_birth && moment(date_of_birth).format('MMM DD,YYYY') || '';
    const dobObj = date_of_birth && new Date(date_of_birth) || new Date();

    this.state = {
      editProfile: false,
      userData: userDataObj,
      avatarUrl: '',
			fullname: userDataObj && userDataObj.attributes && userDataObj.attributes.name || '',
			password: '',
			email: userDataObj && userDataObj.attributes && userDataObj.attributes.email || '',
			mobile: userDataObj && userDataObj.attributes && userDataObj.attributes.full_phone_number || '',
			dateOfBirth: dob,
			dobObj: dobObj,
      address: userDataObj && userDataObj.attributes && userDataObj.attributes.address || '',
      addressObj: null,
			showDatePicker: false,
			updateAccLoader: false,
			fieldsChanged:[],
      errors: {}
    };
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    const profileData = await getProfileData();
    console.log('this.props', this.props);
    console.log('profileData1', profileData);
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    console.log('AIC->receive', message);
    
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

        if (apiRequestCallId === this.updateAccountApiCallId) {
          if (responseJson && responseJson.data) {
            customAlert('Success', responseJson.message || 'Profile updated successfully.');
            this.setState({fieldsChanged:[],errors: {}, editProfile: false});
            await StorageProvider.set('profileData', JSON.stringify(responseJson.data));
            //runEngine.unSubscribeFromMessages(this, this.subScribedMessages);            
          } else {
            if(responseJson.errors[0].token == "Invalid token"){
              this.updateProfile();
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

  UNSAFE_componentWillReceiveProps(nextProps:any) {
    const { route } = nextProps;
    //console.log('componentWillReceiveProps', nextProps);
    if(nextProps.route && nextProps.route.params){
      let changedFields = [...this.state.fieldsChanged];
      let field = 'address';
		  changedFields.indexOf(field) == -1 ? changedFields.push(field) : '';
      const {addressObj} = route.params;console.log('componentWillReceiveProps', JSON.stringify(addressObj));
      this.setState({address: addressObj.formatted_address, addressObj, fieldsChanged: changedFields});
      this.inputs.address.setValue(addressObj.formatted_address);
    }
  }

  populateProfileData = (userDataObj:any) => {
    const date_of_birth = userDataObj.profile && userDataObj.profile.date_of_birth || '';
    const dob = date_of_birth && moment(date_of_birth).format('MMM DD,YYYY') || '';
    const dobObj = date_of_birth && new Date(date_of_birth) || new Date();
		console.log('console->populateProfileData', userDataObj.addresses.length);
		this.setState({
			fullname: userDataObj.profile && userDataObj.profile.fullname || '',
			password: '',
			email: userDataObj.email || '',
			mobile: userDataObj.profile && userDataObj.profile.mobile || '',
			dateOfBirth: dob,
			dobObj: dobObj,
      address: userDataObj.addresses.length && userDataObj.addresses[0].name || ''
		})
	}

	setShowDatePicker = () => {
    Keyboard.dismiss();
    this.setState({ showDatePicker: true });
  }

  handleDatePicked = (event:any, selectedDate:any) => {
    const { errors, dobObj, dateOfBirth } = this.state;
    let dateObj = selectedDate ? selectedDate : dateOfBirth ? dobObj : '';
    let date = dateObj ? moment(dateObj).format('MMM DD,YYYY') : "";
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
	
	_handleInputChange = (field:string, value:any) => {
		const { errors, fieldsChanged } = this.state;
		let changedFields = [...fieldsChanged];
		changedFields.indexOf(field) == -1 ? changedFields.push(field) : '';
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
    this.setState({
			[field]: value,
			errors,
			fieldsChanged: changedFields 
		});
  };

  _validateForm = () => {
    const { fullname, email, password, mobile, dateOfBirth, address, errors, fieldsChanged } = this.state;
    let formIsValid = true;
    if (!password && fieldsChanged.indexOf("password") > -1) {
      //@ts-ignore
      errors.password = requireValidate("password", password);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.password.status : formIsValid;
    }
    if (!mobile || mobile && fieldsChanged.indexOf("mobile") > -1) {
      //@ts-ignore
      errors.mobile = phoneValidate("mobile", mobile);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.mobile.status : formIsValid;
    }
    if (!fullname && fieldsChanged.indexOf("fullname") > -1) {
      //@ts-ignore
      errors.fullname = requireValidate("full name", fullname);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.fullname.status : formIsValid;
    }
    if (!dateOfBirth && fieldsChanged.indexOf("dateOfBirth") > -1) {
      //@ts-ignore
      errors.dateOfBirth = requireValidate("date of birth", dateOfBirth);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.dateOfBirth.status : formIsValid;
    }
    if (!address && fieldsChanged.indexOf("address") > -1) {
      //@ts-ignore
      errors.address = requireValidate("address", address);
      //@ts-ignore
      formIsValid = formIsValid ? !!errors.address.status : formIsValid;
    }
    console.log('errors', formIsValid, errors);
    this.setState({ errors });

    return formIsValid;
  };

  updateProfile = async () => {
    //const {navigation, userData} = this.props;
    //const authToken = (await AsyncStorage.getItem("authToken")) || "";
    const authToken = await StorageProvider.get('authToken') || '';
    if(!authToken){
      customAlert('Error', 'No authToken.');
      return;
    }
    console.log('updateProfile', this.state);
    Keyboard.dismiss();
    if (this.state.fieldsChanged.length && this._validateForm()) {
      NetInfo.fetch().then((netInfoObj:any) => {
      if (netInfoObj && netInfoObj.isConnected) {
          //this.editSaveOnPress();          
          const { email, password, fullname, mobile, dateOfBirth, dobObj, address, addressObj, userData } = this.state;
          const lat = addressObj && addressObj.location && addressObj.location.lat.toString() || userData && userData.attributes && userData.attributes.latitude || '';
          const lng = addressObj && addressObj.location && addressObj.location.lng.toString() || userData && userData.attributes && userData.attributes.longitude || '';
          const userProfileData = {
            //email: email,
            new_email: email,
            new_password: "",
            name: fullname,
            new_phone_number: this.state.fieldsChanged.indexOf("mobile") > -1 ? mobile : '',
            new_dob: !isEmpty(dateOfBirth) ? moment(dobObj).format('YYYY-MM-DD,') : '',
            new_address: address,
            new_latitude: lat,
            new_longitude: lng
          };
          const header = {
            "Content-Type": configJSON.contentTypeApiAddDetail,
            "token": `${authToken}`
          };
      
          const httpBody = {
            data: userProfileData,
            token: `${authToken}`
          };
          
          const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
          this.updateAccountApiCallId = requestMessage.messageId;
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
        } else {
          customAlert('No internet connection.', 'Please check your internet connection.');
        }
      });
    }else{
			customAlert('No Changes', 'No changes are made to save.');
		}
  };

	editSaveOnPress = () => {
		console.log('editSaveOnPress', !this.state.editProfile, this.state);
		this.setState({editProfile: !this.state.editProfile});
  }
  
  goToLocation = () => {
    this.props.navigation.navigate('Location', { fromScreenToLocation: 'AccountInformationScreen' });
  }

  changeImage = () => {
    this.ActionSheet.show();
  }

  _setUserProfile(i:any) {
    const { email } = this.state;
    switch (i) {
      case 1:
        ImagePicker.openCamera({
          width: 400,
          height: 400,
          mediaType: "photo",
          //includeBase64: true,
          cropping: true
        })
          .then((image:any) => {
            console.log('image', image);
            if (image.path) {
              this.setState({
                avatarUrl: image.path
              });              
            }
          })
          .catch(() => {
            setTimeout(() => { }, 1000);
          });
        break;
      case 2:
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          mediaType: "photo",
          //includeBase64: true,
          cropping: true
        })
          .then((image:any) => {
            console.log('image', image);
            if (image.path) {
              this.setState({
                avatarUrl: image.path
              });
            }
          })
          .catch(() => {
            setTimeout(() => { }, 1000);
          });
        break;
      default:
        break;
    }
  }
}
