import React from "react";
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";

import ResetPasswordController, {
  Props
} from "./ResetPasswordController";

import CustomHeader from '../../../components/src/CustomHeader';
import ModalComponent from '../../../components/src/ModalComponent';
import CommonStyle from "../../../framework/src/CommonStyle";
import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';

export default class ResetPasswordBlock extends ResetPasswordController {
  constructor(props: Props) {
    super(props);
    
  }

  render() { 
    const { otp, password, confirmPassword, errors, resetPasswordLoader, resetSuccess } = this.state;
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
                  <Text style={styles.titleText}>{i18n.t('ResetPassword')}</Text>
                  <Text style={styles.subTitleText}>{i18n.t('EnterConfirmText')}</Text>
                  <View style={{ height: 20 }} />
                  <TextField
                    label={i18n.t('Otp')}
                    labelFontSize={15}
                    labelTextStyle={CommonStyle.labelTextStyle}
                    keyboardType='number-pad'
                    autoCapitalize="none"
                    ref={(input: any) => {
                      this.inputs.otp = input;
                    }}
                    value={otp}
                    maxLength={6}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this._focusNextField("password");
                    }}
                    onChangeText={(val:string) => this._handleInputChange("otp", val)}
                    error={errors.otp && errors.otp.message ? errors.otp.message : ''}
                    errorColor={COLORS.red}
                    useNativeDriver={false}
                  />
                  <TextField
                    label={i18n.t('NewPassword')}
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
                      this._focusNextField("confirmPassword");
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
                    label={i18n.t('ConfirmPassword')}
                    labelFontSize={15}
                    labelTextStyle={CommonStyle.labelTextStyle}
                    keyboardType='default'
                    autoCapitalize="none"
                    ref={(input: any) => {
                      this.inputs.confirmPassword = input;
                    }}
                    value={confirmPassword}
                    maxLength={50}
                    returnKeyType="done"
                    secureTextEntry
                    onChangeText={(val:string) => this._handleInputChange("confirmPassword", val)}
                    renderRightAccessory={() => {
                      return (
                        <Feather
                          name='eye-off'
                          size={20}
                          color={COLORS.inputIcon}
                        />
                      );
                    }}
                    error={errors.confirmPassword && errors.confirmPassword.message ? errors.confirmPassword.message : ''}
                    errorColor={COLORS.red}
                    useNativeDriver={false}
                  />
                  <Button
                    title={i18n.t('ResetPassword')}
                    loading={resetPasswordLoader}
                    buttonStyle={styles.buttonStyle}
                    containerStyle={styles.buttonStyleWrap}
                    onPress={this.submitNewPasswords}
                  />
                </View>
              </View>
              {resetSuccess && <>
                <ModalComponent
                  visible={resetSuccess}
                  width="100%"
                  position="middle"
                  close={() => {this.setModalVisible(false)}}
                  transparent={true}
                  customStyles={CommonStyle.toastModal}
                >
                  <View>
                    <View style={styles.contentCenter}>                      
                      <Feather
                        name='check-circle'
                        size={60}
                        color={COLORS.black}
                      />
                    </View>
                    <Text style={[styles.congoText]}>{i18n.t('Congratulations')}</Text>
                    <Text style={styles.resetSuccessText}>{i18n.t('ResetSuccessMsg')}</Text>
                  </View>
                </ModalComponent></>
              }
            </View>
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    backgroundColor: COLORS.white
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
  formSection:{
    height:'100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  formWrapper:{
    marginHorizontal: 30
  },
  width100P:{
    width: '100%',
  },
  contentCenter:{
    alignSelf: 'center',
    justifyContent: 'center'
  },
  titleText:{
    marginTop: 43,
    fontSize:24,
    fontWeight: 'bold',
    color: COLORS.inputValue,
    textAlign: 'center'
  },
  subTitleText:{
    marginTop: 30,
    fontSize:15,
    color: COLORS.inputLabel,
    textAlign: 'center'
  },
  congoText:{
    marginTop: 40,
    fontSize:32,
    fontWeight: 'bold',
    color: COLORS.inputValue,
    textAlign: 'center'
  },
  resetSuccessText:{
    marginTop: 20,
    fontSize:15,
    color: COLORS.inputLabel,
    textAlign: 'center'
  },
  buttonStyleWrap: {
    marginTop:40
  },
  buttonStyle: {
    backgroundColor: COLORS.black,
    height:50,
    borderRadius:8
  }
});
