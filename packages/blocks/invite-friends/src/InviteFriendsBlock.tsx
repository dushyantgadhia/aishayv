import React from "react";
import { Button, ListItem, SocialIcon } from 'react-native-elements';
import Share from 'react-native-share';

import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import InviteFriendsController, {
  Props
} from "./InviteFriendsController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CommonStyle from "../../../framework/src/CommonStyle";
import CustomHeader from "../../../components/src/CustomHeader";
import { imgSocialSharePath } from "./assets";

const { FACEBOOK, INSTAGRAM, TWITTER } = Share.Social;

export default class InviteFriendsBlock extends InviteFriendsController {
  constructor(props: Props) {
    super(props);
  }


  keyExtractor = (item:object, index:any) => index.toString();

	renderItem = ({ item }) => (
		<ListItem
      title={item.title}
      containerStyle={styles.socialListContainer}
			titleStyle={styles.listItemTitleText}
			leftIcon={item.icon ? { name: item.icon, type: item.type, size: 16,color: item.color || COLORS.white, containerStyle: item.containerStyle || styles.iconContainerStyle} : (<SocialIcon type={item.type} iconSize={16} style={styles.socialIconContainerStyle}/>)}
			onPress={() => {this.shareCode(item.media)}}
			chevron
		/>
  );
  
  boxOneItems = [
		{id:1, title: i18n.t('Facebook'), media:'messenger' ,type:'facebook' },
		{id:2, title: i18n.t('Twitter'), media:TWITTER , type:'twitter' },
		{id:3, title: i18n.t('Instagram'), media:INSTAGRAM , type:'instagram' },
		{id:4, title: i18n.t('Contacts'), media:'sms' , icon: 'supervisor-account', type:'material-icons' }
	]

  render() { 
    const { shareCode } = this.state;
		return (
      <View style={styles.container}>
        <View style={styles.fullContainer}>
          <CustomHeader
            containerStyle={[CommonStyle.authHeader]}
            backButtonEnabled={true}
            onBackPressFunc={() => this.props.navigation.goBack()}
            iconTintColor={COLORS.black}
            headerTitle={i18n.t('InviteFriends')}
            titleTextStyle={styles.titleTextStyle}
          />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={[styles.itemSection, CommonStyle.width100P]}>
              <View style={[styles.whiteBox, styles.whiteBoxCustomize]}>
                <View style={[CommonStyle.centerStyle]}>
                  <Image source={imgSocialSharePath} style={styles.shareImage}/>
                  <Text style={styles.inviteTextStyle}>{i18n.t('InviteCodeText')}</Text>
                </View>
                <View style={[CommonStyle.rowStyle, CommonStyle.spaceBetween,{paddingHorizontal:12, paddingTop:35}]}>
                  <TextInput
                    value={shareCode}
                    style={styles.commentInputStyle}
                    editable={false}
                  />
                  <Button
                    title={i18n.t('Copy')}
                    buttonStyle={styles.sendButtonStyle}
                    titleStyle={styles.sendButtonTextStyle}
                    containerStyle={styles.sendContainerStyle}
                    onPress={() => {this.copyToClipboard();}}
                  />
                </View>
              </View>
              <View style={[styles.whiteBox]}>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  scrollEnabled={false}
                  data={this.boxOneItems}
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
  titleTextStyle:{
    fontSize:17
  },
  shareImage:{width:'75%', height:120, resizeMode:'contain'},
  inviteTextStyle:{
    fontSize:15,
    paddingHorizontal:50,
    paddingTop:25,
    color: COLORS.inputLabel,
    textAlign: 'center'
  },
  commentInputStyle:{
    width:'78%',
    justifyContent:'center',
    backgroundColor: COLORS.inactiveIndicator,
    minHeight: 50,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 15,
    color: COLORS.ReviewBlack
  },
  sendContainerStyle:{
    width:'17%'
  },
  sendButtonStyle:{
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.black
  },
  sendButtonTextStyle:{fontSize:15, color: COLORS.white},
  socialListContainer:{height:54, justifyContent:'center'},
  topSection:{
    height:'30%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  itemSection:{
    height:'100%',
    paddingTop: 15
  },
  whiteBox:{
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 12,
    paddingVertical:10,
    //paddingTop:20,
    backgroundColor: COLORS.white
  },
  whiteBoxCustomize:{
    paddingBottom:25,
    paddingTop:35
  },
  iconContainerStyle:{
    width:34,
    height:34,
    borderRadius:34,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialIconContainerStyle:{
    width:34,
    height:34,
    borderRadius:34,
    justifyContent: 'center',
    marginHorizontal:0,
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
