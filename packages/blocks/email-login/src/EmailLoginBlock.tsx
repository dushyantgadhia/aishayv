import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';

//@ts-ignore
// Customizable Area End

import EmailLoginController, {
  Props
} from "./EmailLoginController";
import CommonStyle from "../../../framework/src/CommonStyle";

export default class EmailLoginBlock extends EmailLoginController {
  
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    const { email, password, signInLoader, errors, imgLogoPath } = this.state;
    return (
      // Required for all blocks
      <View style={styles.container}>
        {/* Required for all blocks */}
        <TouchableWithoutFeedback
          testID={"Background"}
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={styles.fullContainer}>
            <View style={styles.headerSection}>
              <Image source={imgLogoPath} />
            </View>
            <View style={styles.formSection}>
              <View style={styles.formWrapper}>
                <View style={{ height: 20 }}></View>
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
                    this._focusNextField("password");
                  }}
                  onChangeText={(val:string) => this._handleInputChange("email", val)}
                  error={errors.email && errors.email.message ? errors.email.message : ''}
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
                  returnKeyType="done"
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
                  //error={errors.password && !errors.password.status && errors.password.message ? errors.password.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                <View style={styles.forgotWrap}>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.forgotPasswordClicked()}>
                  <Text style={styles.forgotText}>{i18n.t('ForgotPasswordQ')}</Text>
                </TouchableHighlight>
                </View>
                <Button
                  title={i18n.t('SignIn')}
                  loading={signInLoader}
                  buttonStyle={styles.buttonStyle}
                  containerStyle={styles.buttonStyleWrap}
                  onPress={this.submitLogin}
                />
              </View>
            </View>
            <View style={styles.signUpSection}>
              <View style={styles.signUpSecWrap}>
                <Text style={styles.signUpPrefixText}>{i18n.t('SignupPrefix')}</Text>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.signUpClicked()}>
                  <Text style={[styles.signUpPrefixText, styles.signUpTextBold]}>{i18n.t('SignUp')}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fullContainer:{
    height: '100%',
    backgroundColor: COLORS.black,
  },
  headerSection:{
    height:'30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formSection:{
    height:'65%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  signUpSection:{
    height:'5%',
    backgroundColor: 'white'
  },
  formWrapper:{
    marginHorizontal: 30
  },
  forgotWrap:{
    marginTop:20,
    alignItems:'flex-end'
  },
  forgotText:{
    color: COLORS.inputValue,
    fontSize: 15,
  },
  buttonStyleWrap: {
    marginTop:50
  },
  buttonStyle: {
    backgroundColor: COLORS.black,
    height:50,
    borderRadius:8
  },
  signUpSecWrap:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signUpPrefixText:{
    fontSize: 15,
    color: COLORS.inputLabel
  },
  signUpTextBold:{
    fontWeight: 'bold',
    color: COLORS.black
  }
});
// Customizable Area End