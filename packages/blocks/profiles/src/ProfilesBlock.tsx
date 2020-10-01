import React from "react";
import { Avatar, ListItem } from 'react-native-elements';

import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import ProfilesController, {
  Props
} from "./ProfilesController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CommonStyle from "../../../framework/src/CommonStyle";
//import { imgLogoBlackPath } from "./assets";

export default class ProfilesBlock extends ProfilesController {
  constructor(props: Props) {
    super(props);
    
  }

  keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => (
		<ListItem
			title={item.title}
			titleStyle={styles.listItemTitleText}
			leftIcon={{ name: item.icon, type: item.type, size: 16,color: item.color || COLORS.white, containerStyle: item.containerStyle || styles.iconContainerStyle}}
			onPress={() => item.route == 'Logout' ? this.signOut() : this.navigateToScreen(item.route)}
			chevron
		/>
  );
  
  boxOneItems = [
		{id:1, title: i18n.t('PaymentMethods'), route:'', icon: 'payment', type:'material-icons' },
		{id:2, title: i18n.t('AccountInformation'), route:'AccountInformationScreen', icon: 'account-circle-outline', type:'material-community' }
	]

	boxTwoItems = [
		{id:1, title: i18n.t('MyOrders'), route:'', icon: 'history', type:'material-community' },
		{id:2, title: i18n.t('InviteFriends'), route:'InviteFriendsScreen', icon: 'account-supervisor-outline', type:'material-community' },
		{id:3, title: i18n.t('Settings'), route:'', icon: 'settings-outline', type:'ionicon' },
		{id:4, title: i18n.t('TermsOfServices'), route:'', icon: 'briefcase-outline', type:'ionicon' }
	]

	boxThreeItems = [
		{id:1, title: i18n.t('LogOut'), route:'Logout', icon: 'login', type:'simple-line-icon', color: COLORS.black, containerStyle: styles.logoutIconContainerStyle }
	]

  render() { 
    const { userData } = this.state;
		return (
      <View style={styles.container}>
        <View style={styles.fullContainer}>
          <View style={styles.topSection}>
            <View style={styles.avtarSec}>
              <Avatar
                size={86}
                rounded
                title=""
                overlayContainerStyle={{ backgroundColor: COLORS.inputLabel }}
                activeOpacity={0.7}
              />
            </View>
            <Text style={styles.userNameText}>{userData && userData.attributes && userData.attributes.name}</Text>
            <Text style={styles.userEmailText}>{userData && userData.attributes && userData.attributes.email}</Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={[styles.itemSection, CommonStyle.width100P]}>
              <View style={styles.whiteBox}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  scrollEnabled={false}
                  data={this.boxOneItems}
                  renderItem={this.renderItem}
                />
              </View>
              <View style={styles.whiteBox}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  scrollEnabled={false}
                  data={this.boxTwoItems}
                  renderItem={this.renderItem}
                />
              </View>
              <View style={styles.whiteBox}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  scrollEnabled={false}
                  data={this.boxThreeItems}
                  renderItem={this.renderItem}
                />
              </View>
            </View>
          </ScrollView>
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
  topSection:{
    height:'30%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  itemSection:{
    height:'70%',
    paddingTop: 15
  },
  avtarSec:{
    //width: '15%'
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
