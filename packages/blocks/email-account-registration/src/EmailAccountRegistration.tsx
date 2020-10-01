import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";

import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CustomHeader from '../../../components/src/CustomHeader';
import ModalComponent from '../../../components/src/ModalComponent';
import CommonStyle from "../../../framework/src/CommonStyle";

import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
// Customizable Area End

import EmailAccountRegistrationController, {
  Props
} from "./EmailAccountRegistrationController";

export default class EmailAccountRegistration extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const {signupLoader, fullname, password, email, mobile, dobObj, dateOfBirth, address, showDatePicker, errors} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <CustomHeader
          backButtonEnabled={true}
          onBackPressFunc={() => this.props.navigation.goBack()}
          containerStyle={{backgroundColor: COLORS.white}}
          iconTintColor={COLORS.black}
        />
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Customizable Area Start */}
            <View style={styles.fullContainer}>
            {showDatePicker && Platform.OS == 'ios' &&
              <ModalComponent
                visible={showDatePicker}
                width="100%"
                position="middle"
                close={() => {this.setState({showDatePicker: false})}}
                transparent={true}
                customStyles={{width:'80%', backgroundColor:'white'}}
                //customStyles={CommonStyle.toastModal}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dobObj || new Date()}
                  maximumDate={new Date()}
                  mode={'date'}
                  display="default"
                  onChange={this.handleDatePicked}
                />
                <TouchableHighlight onPress={() => {this.setState({showDatePicker: false})}}>
                  <Text style={CommonStyle.textAlignCenter}>{i18n.t('Close')}</Text>
                </TouchableHighlight>
              </ModalComponent>
            }
            <View style={[styles.formSection]}>
              <Text style={styles.titleText}>{i18n.t('CreateNewAccount')}</Text>
              <View style={styles.formWrapper}>
                <TextField
                  label={i18n.t('FullName')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  keyboardType='default'
                  autoCapitalize="none"
                  ref={(input: any) => {
                    this.inputs.fullname = input;
                  }}
                  value={fullname}
                  maxLength={50}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this._focusNextField("password");
                  }}
                  onChangeText={(val:string) => this._handleInputChange("fullname", val)}
                  error={errors.fullname && errors.fullname.message ? errors.fullname.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                <TextField
                  label={i18n.t('Password')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  keyboardType='default'
                  autoCapitalize="none"
                  ref={(input: any) => {
                    this.inputs.password = input;
                  }}
                  value={password}
                  maxLength={50}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this._focusNextField("email");
                  }}
                  secureTextEntry
                  onChangeText={(val:string) => this._handleInputChange("password", val)}
                  renderRightAccessory={() => {
                    return (
                      <Feather
                        name='eye-off'
                        size={20}
                        color={COLORS.inputIcon}
                      />
                    );
                  }}
                  error={errors.password && errors.password.message ? errors.password.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                <TextField
                  label={i18n.t('Email')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  keyboardType='default'
                  autoCapitalize="none"
                  ref={(input: any) => {
                    this.inputs.email = input;
                  }}
                  value={email}
                  maxLength={50}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this._focusNextField("mobile");
                  }}
                  onChangeText={(val:string) => this._handleInputChange("email", val)}
                  error={errors.email && errors.email.message ? errors.email.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                <TextField
                  label={i18n.t('Mobile')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  keyboardType='phone-pad'
                  autoCapitalize="none"
                  ref={(input: any) => {
                    this.inputs.mobile = input;
                  }}
                  value={mobile}
                  maxLength={50}
                  returnKeyType="done"
                  // onSubmitEditing={() => {
                  //   this._focusNextField("dateOfBirth");
                  // }}
                  onChangeText={(val:string) => this._handleInputChange("mobile", val)}
                  error={errors.mobile && errors.mobile.message ? errors.mobile.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                <TextField
                  label={i18n.t('DateOfBirth')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  ref={(input: any) => {
                    this.inputs.dateOfBirth = input;
                  }}
                  value={dateOfBirth}
                  //onTouchStart={this.setShowDatePicker}
                  onFocus={this.setShowDatePicker}
                  onBlur={() => this.hideKeyboard()}
                  renderRightAccessory={() => {
                    return (
                      <AntDesign
                        name='calendar'
                        size={20}
                        color={COLORS.inputIcon}
                      />
                    );
                  }}
                  error={errors.dateOfBirth && errors.dateOfBirth.message ? errors.dateOfBirth.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                {showDatePicker &&  Platform.OS == 'android' && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dobObj || new Date()}
                    maximumDate={new Date()}
                    mode={'date'}
                    display="default"
                    onChange={this.handleDatePicked}
                  />
                )}
                <TouchableOpacity onPress={() => {this.goToLocation()}}>
                <TextField
                  editable={false}
                  numberOfLines={2}
                  multiLines
                  label={i18n.t('YourAddress')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  keyboardType='default'
                  autoCapitalize="none"
                  ref={(input: any) => {
                    this.inputs.address = input;
                  }}
                  defaultValue={address}
                  maxLength={50}
                  //returnKeyType="done"
                  onChangeText={(val:string) => this._handleInputChange("address", val)}
                  renderRightAccessory={() => {
                    return (
                      <Ionicons
                        name='location-outline'
                        size={20}
                        color={COLORS.inputIcon}
                        //onPress={this.goToLocation}
                      />
                    );
                  }}
                  error={errors.address && errors.address.message ? errors.address.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                </TouchableOpacity>
                <Button
                  testID={"btnSignUp"}
                  title={i18n.t('SignUp')}
                  loading={signupLoader}
                  buttonStyle={styles.buttonStyle}
                  containerStyle={styles.buttonStyleWrap}
                  onPress={this.submitRegister}
                />
              </View>
              <View style={styles.signUpSecWrap}>
                <Text style={styles.signUpPrefixText}>{i18n.t('SigninPrefix')}</Text>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.signInClicked()}>
                  <Text style={[styles.signUpPrefixText, styles.signUpTextBold]}>{i18n.t('SignIn')}</Text>
                </TouchableHighlight>
              </View>
            </View>
            </View>
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getValidations();
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    //padding: 16,
    //marginLeft: "auto",
    //marginRight: "auto",
    //width: Platform.OS === "web" ? "75%" : "100%",
    //maxWidth: 650,
    //backgroundColor: "#fff"
  },
  titleWhySignUp: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  titleOtpInfo: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10
  },

  inputWeb: {
    flex: 1,
    flexDirection: "row",
    marginTop: 24,
    fontSize: 18,
    padding: 10,
    borderBottomColor: "#767676",
    includeFontPadding: true,
    borderBottomWidth: 1
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 10
  },
  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
    marginTop: 10,
    paddingLeft: 0
  },
  passwordShowHide: {
    alignSelf: "center"
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: -1
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
  keyboardPadding: { flex: 1 },
  btnLegalTermsAndCondition: { color: "#6200EE" },
  btnLegalPrivacyPolicy: { color: "#6200EE", marginLeft: "auto" },
  leagalText: { marginTop: 10 },
  headline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  signUpText: {
    fontSize: 32,
    color: "#6200EE",
    fontWeight: "bold"
  },
  fullContainer: { height: '100%', width: '100%' },
  width100P:{ width: '100%' },
  formSection:{
    //marginVertical: '2%',
    backgroundColor: COLORS.white
  },
  titleText:{
    fontSize:32,
    fontWeight: 'bold',
    color: COLORS.inputValue,
    textAlign: 'center'
  },
  formWrapper:{ marginHorizontal: 30 },
  buttonStyleWrap: { marginVertical:30 },
  buttonStyle: { backgroundColor: COLORS.black, height:50, borderRadius:10 },
  signUpSecWrap:{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  signUpPrefixText:{ fontSize: 15, color: COLORS.inputLabel },
  signUpTextBold:{ fontWeight: 'bold', color: COLORS.black }
  // Customizable Area End
});
