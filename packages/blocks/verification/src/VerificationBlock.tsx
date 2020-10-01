import React from "react";
import { Button } from 'react-native-elements';

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight
} from "react-native";

import VerificationController, {
  Props
} from "./VerificationController";
import CustomHeader from '../../../components/src/CustomHeader';
import CommonStyle from "../../../framework/src/CommonStyle";
import { imgLogoPath } from "./assets";

export default class VerificationBlock extends VerificationController {
  constructor(props: Props) {
    super(props);
    
  }

  render() { 
    //const {swiperIndex} = this.state;
		return (
			<View style={styles.container}>
        <View style={styles.fullContainer}>
					<CustomHeader
						backButtonEnabled={true}
            onBackPressFunc={() => this.props.navigation.goBack()}
            containerStyle={CommonStyle.headerContainer}
            iconTintColor={COLORS.white}
					/>
					<View style={styles.headerSection}>
						<Image source={imgLogoPath} />
					</View>
					<View style={styles.formSection}>
						<View style={styles.formWrapper}>
							<Text style={[styles.titleText]}>{i18n.t('Verification')}</Text>
							<Text style={[styles.subTitleText]}>{i18n.t('VerificationMsg')}</Text>
							<View style={[styles.signUpSecWrap]}>
                <Text style={styles.signUpPrefixText}>{i18n.t('VerificationLinkNotRecMsg')}</Text>
                <TouchableHighlight underlayColor='transparent' onPress={() => this.resendClicked()}>
                  <Text style={[styles.signUpPrefixText, styles.signUpTextBold]}>{i18n.t('Resend')}</Text>
                </TouchableHighlight>
              </View>
							<Button
								title={i18n.t('Continue')}
								buttonStyle={styles.buttonStyle}
								containerStyle={[styles.buttonStyleWrap,CommonStyle.margin40P]}
								onPress={this.goToLogin}
							/>
						</View>
					</View>
				</View>
			</View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fullContainer:{
    height: '100%',
    backgroundColor: COLORS.black,
  },
  headerSection:{
    height:'20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formSection:{
    height:'70%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  formWrapper:{
    marginHorizontal: '10%'
  },
  titleText:{
    marginTop: 40,
    fontSize:24,
    fontWeight: 'bold',
    color: COLORS.inputValue,
    textAlign: 'center'
  },
  subTitleText:{
    marginTop: 50,
    fontSize:15,
    color: COLORS.inputLabel,
    textAlign: 'center'
  },
  buttonStyleWrap: {
    //marginTop:'25%',
    bottom: 20
  },
  buttonStyle: {
    backgroundColor: COLORS.black,
    height:50,
    borderRadius:10
  },
  signUpSecWrap:{
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 100
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
