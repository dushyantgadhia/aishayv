import React from "react";

//Customizable Area Start
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";

import { Formik } from "formik";
import { Input } from "react-native-elements";
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-elements';
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CustomHeader from '../../../components/src/CustomHeader';
import CommonStyle from "../../../framework/src/CommonStyle";
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    const { navigation } = this.props;
    const { email, forgotPasswordLoader, errors } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1, backgroundColor: COLORS.black }}
      >
        <CustomHeader
          backButtonEnabled={true}
          onBackPressFunc={() => this.props.navigation.goBack()}
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            this.isPlatformWeb() ? styles.containerWeb : styles.containerMobile
          }
        >
          <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
            {/* Customizable Area Start */}
            <View style={styles.fullContainer}>
              <View style={styles.formSection}>
                <View style={styles.formWrapper}>
                  <Text style={styles.titleText}>{i18n.t('ForgotPassword')}</Text>
                  <Text style={styles.subTitleText}>{i18n.t('RecoverText')}</Text>
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
                    returnKeyType="done"
                    onChangeText={(val:string) => this._handleInputChange("email", val)}
                    error={errors.email && errors.email.message ? errors.email.message : ''}
                    errorColor={COLORS.red}
                    useNativeDriver={false}
                  />
                  <Button
                    title={i18n.t('Send')}
                    loading={forgotPasswordLoader}
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonStyleWrap}
                    onPress={this.submitEmail}
                  />
                </View>
              </View>
            </View>
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    backgroundColor: COLORS.white
    // padding: 16,
    // marginLeft: "auto",
    // marginRight: "auto",
    // width: "100%",
    // maxWidth: 650,
    // backgroundColor: "#fff"
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650
  },  
  fullContainer:{
    height: '100%',
    backgroundColor: COLORS.black,
  },
  titleText:{
    marginTop: 40,
    fontSize:24,
    fontWeight: 'bold',
    color: COLORS.inputValue,
    textAlign: 'center'
  },
  subTitleText:{
    marginTop: 30,
    marginBottom: 50,
    fontSize:15,
    color: COLORS.inputLabel,
    textAlign: 'center'
  },
  formSection:{
    height:'100%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  formWrapper:{
    marginHorizontal: 30
  },
  buttonStyleWrap: {
    marginTop:80
  },
  buttonStyle: {
    backgroundColor: COLORS.black,
    height:50,
    borderRadius:8
  },

  countryCodeSelector: {
    flex: 3,
    marginTop: 20,
    textAlign: "left",
    textAlignVertical: "center"
  },
  button: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    zIndex: -1
  },

  flexContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "100%"
  },

  headline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  webInput: {
    marginTop: 20,
    width: "100%",
    zIndex: -1
  },

  inputAfterCountryCode: {
    width: "100%",
    zIndex: -1
  },

  mobileInput: {
    flexDirection: "column",
    alignItems: "stretch",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true
  },

  codeInput: {
    marginTop: 20,
    width: "30%"
  },

  phoneInput: {
    flex: 3,
    marginTop: 20
  },

  noBorder: {
    borderBottomWidth: 0
  },

  // titleText: {
  //   fontSize: 32,
  //   color: "#6200EE",
  //   fontWeight: "bold"
  // },

  stepText: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },

  emailText: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
    fontWeight: "bold"
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginTop: 20,
    minHeight: 40,
    fontSize: 18,
    textAlignVertical: "center",
    padding: 10
  },

  bgRectWeb: {
    marginTop: 40
  },

  errorStyle: {
    color: "red",
    textAlign: "center"
  }
});
