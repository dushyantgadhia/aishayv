import React from "react";
import { TextField } from 'react-native-material-textfield';
import { Avatar } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import ActionSheet from "react-native-actionsheet";

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";

import AccountInformationController, {
  Props
} from "./AccountInformationController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CommonStyle from "../../../framework/src/CommonStyle";
import CustomHeader from "../../../components/src/CustomHeader";
import ModalComponent from "../../../components/src/ModalComponent";
//import { imgLogoBlackPath } from "./assets";

const options = ["Cancel", "Take a Photo", "Select From Library"];
const CANCEL_INDEX = 0;

export default class AccountInformationBlock extends AccountInformationController {
  constructor(props: Props) {
    super(props);    
  }

  render() { 
    const { editProfile, avatarUrl, fullname, password, email, mobile, dobObj, dateOfBirth, address, showDatePicker, errors } = this.state;
		return (
      <View style={styles.container}>
        <View style={styles.fullContainer}>
          <CustomHeader
						containerStyle={[CommonStyle.authHeader]}
						backButtonEnabled={true}
            onBackPressFunc={() => this.props.navigation.goBack()}
						iconTintColor={COLORS.black}
						headerTitle={i18n.t('AccountInformation')}
						titleTextStyle={styles.titleTextStyle}
						rightComponentEnabled={true}
						rightComponent={
							<TouchableOpacity onPress={() => {editProfile ? this.updateProfile() : this.editSaveOnPress()}}>
								<Text style={styles.editSaveTextStyle}>{this.state.editProfile ? i18n.t('Save') : i18n.t('Edit')}</Text>
							</TouchableOpacity>
						}
					/>
          <ScrollView
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.scrollViewContainer}
					>
            <View style={[styles.topSection,CommonStyle.width100P]}>
              <View style={styles.avtarSec}>
              {avatarUrl !== "" ? (
                <Avatar
                  rounded
                  size="xlarge"
                  source={{
                    uri: avatarUrl,
                  }}
                  showAccessory
                  accessory={{
                    name: 'pluscircle',
                    type: 'ant-design',
                    size: 40,
                    color: COLORS.black,
                    style:{backgroundColor: 'transparent'},
                    containerStyle:{backgroundColor: COLORS.white, borderRadius: 40}
                  }}
                  onAccessoryPress={this.changeImage}
                />) : (
                <Avatar
                  //size={140}
                  size="xlarge"
                  rounded
                  showAccessory
                  accessory={{
                    name: 'pluscircle',
                    type: 'ant-design',
                    size: 40,
                    color: COLORS.black,
                    style:{backgroundColor: 'transparent'},
                    containerStyle:{backgroundColor: COLORS.white, borderRadius: 40}
                  }}
                  onAccessoryPress={this.changeImage}
                  overlayContainerStyle={{ backgroundColor: COLORS.inputLabel }}
                  activeOpacity={0.7}
                />)}
              </View>
            </View>
					
						<View style={[styles.itemSection,CommonStyle.width100P]}>							
							<View style={styles.whiteBox}>
                <TextField
                  editable={editProfile}
                  label={i18n.t('FullName')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  textColor={COLORS.inputValue}
                  fontSize={17}
                  keyboardType='default'
                  autoCapitalize="none"
                  ref={(input: any) => {
                    this.inputs.fullname = input;
                  }}
                  value={fullname}
                  maxLength={50}
                  returnKeyType="done"
                  onChangeText={(val:string) => this._handleInputChange("fullname", val)}
                  error={errors.fullname && errors.fullname.message ? errors.fullname.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                <TextField
                  editable={editProfile}
                  label={i18n.t('DateOfBirth')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  textColor={COLORS.inputValue}
                  fontSize={17}
                  ref={(input: any) => {
                    this.inputs.dateOfBirth = input;
                  }}
                  value={dateOfBirth}
                  //onTouchStart={this.setShowDatePicker}
                  onFocus={this.setShowDatePicker}
                  onBlur={() => Keyboard.dismiss()}
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
                <TextField
                  //disabled
                  editable={false}
                  label={i18n.t('Email')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  textColor={COLORS.inputValue}
                  fontSize={17}
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
                <TextField
                  editable={editProfile}
                  label={i18n.t('MobileNumber')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  textColor={COLORS.inputValue}
                  fontSize={17}
                  keyboardType='phone-pad'
                  autoCapitalize="none"
                  ref={(input: any) => {
                    this.inputs.mobile = input;
                  }}
                  value={mobile}
                  maxLength={50}
                  returnKeyType="done"
                  onChangeText={(val:string) => this._handleInputChange("mobile", val)}
                  error={errors.mobile && errors.mobile.message ? errors.mobile.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                <TouchableOpacity onPress={() => {editProfile ? this.goToLocation() : ''}}>
                <TextField
                  editable={false}
                  label={i18n.t('Location')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  textColor={COLORS.inputValue}
                  fontSize={17}
                  keyboardType='default'
                  autoCapitalize="none"
                  ref={(input: any) => {
                    this.inputs.address = input;
                  }}
                  value={address}
                  maxLength={50}
                  //returnKeyType="done"
                  onChangeText={(val:any) => this._handleInputChange("address", val)}
                  renderRightAccessory={() => {
                    return (
                      <Ionicons
                        name='location-outline'
                        size={20}
                        color={COLORS.inputIcon}
                      />
                    );
                  }}
                  error={errors.address && errors.address.message ? errors.address.message : ''}
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
                </TouchableOpacity>
                <TextField
                  editable={false}
                  label={i18n.t('Password')}
                  labelFontSize={15}
                  labelTextStyle={CommonStyle.labelTextStyle}
                  textColor={COLORS.inputValue}
                  fontSize={17}
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
                  errorColor={COLORS.red}
                  useNativeDriver={false}
                />
							</View>
						</View>
					</ScrollView>
          <ActionSheet
            ref={(o:any) => (this.ActionSheet = o)}
            options={options}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={(index:any) => {
              this._setUserProfile(index);
            }}
          />
					{showDatePicker && Platform.OS == 'ios' &&
						<ModalComponent
							visible={showDatePicker}
							//name="notifications"
							width="100%"
							position="middle"
							close={() => { this.setState({ showDatePicker: false }) }}
							transparent={true}
							customStyles={{ width: '80%', backgroundColor: 'white' }}
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
							<TouchableHighlight onPress={() => { this.setState({ showDatePicker: false }) }}>
								<Text style={CommonStyle.textAlignCenter}>{i18n.t('Close')}</Text>
							</TouchableHighlight>
						</ModalComponent>
					}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  fullContainer:{
    height: '100%',
    backgroundColor: COLORS.borderColor,
  },
  scrollViewContainer:{
    alignItems:'center',
    flexGrow: 1,
  },
  titleTextStyle:{
    fontSize: 17
  },
  editSaveTextStyle:{
    fontSize: 17,
    color: COLORS.black
  },
  topSection:{
    //height:'30%',
    justifyContent: 'center',
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  avtarSec:{
    //width: '15%'
  },
  itemSection:{
    //height:'70%',
    paddingTop: 15
  },
  userNameText:{
    fontSize:20,
    textAlign: 'center',
    fontWeight:'bold',
    color: COLORS.inputValue,
    textTransform: 'capitalize',
  },
  userEmailText:{
    fontSize:15,
    textAlign: 'center',
    color: COLORS.inputLabel,
  },
  whiteBox:{
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 12,
    paddingVertical:10,
    paddingHorizontal:15,
    backgroundColor: COLORS.white
  },
  iconContainerStyle:{
    width:34,
    height:34,
    borderRadius:34,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutIconContainerStyle:{
    width:34,
    height:34,
    borderRadius:34,
    backgroundColor:COLORS.inactiveIndicator,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemTitleText: {
    fontSize:15,
    color:COLORS.ReviewBlack
  },
  buttonStyle: {
    backgroundColor: COLORS.black,
    height:50,
    borderRadius:8
  }
});
