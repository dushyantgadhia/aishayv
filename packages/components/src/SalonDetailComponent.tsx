import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import COLORS from "../../framework/src/Colors";
import CommonStyle from "../../framework/src/CommonStyle";
import { isEmpty } from "../../framework/src/Helpers";


interface Props {
  onBackPressFunc: Function;
  onCallPressFunc: Function;
  onMsgPressFunc: Function;
  backButtonEnabled: boolean;
  callBtnEnabled: boolean;
  msgBtnEnabled: boolean;
  showAvailbility: boolean;
  salonName: string;
  salonRating: number|string;
  availbility: string;
  unAvailbility: string;
  containerStyle: object|Array<any>;
}


export default class SalonDetailComponent extends Component <Props> {

  constructor(props: Props) {
    super(props);
  }
  
  render() {    
    return (
      <View style={[styles.topSection, this.props.containerStyle]}>
        <View style={styles.backSection}>
          <View style={[CommonStyle.rowStyle]}>
            <View style={styles.backIconWrap}>
            <Ionicons
              name='arrow-back'
              size={25}
              color={COLORS.white}
              onPress={() => this.props.onBackPressFunc()}
            />
            </View>
            <View style={styles.noIconWrap} />
            {this.props.callBtnEnabled &&
            <View style={styles.callIconWrap}>
            <Ionicons
              name='call-outline'
              size={20}
              color={COLORS.white}
              onPress={() => this.props.onCallPressFunc()}
            />
            </View>}
            {this.props.msgBtnEnabled &&
            <View style={styles.msgIconWrap}>
            <AntDesign
              name='message1'
              size={20}
              color={COLORS.white}
              onPress={() => this.props.onMsgPressFunc()}
            />
            </View>}
          </View>
        </View>
        <View style={[styles.nameRatingSec]}>
          <View style={[CommonStyle.rowStyle, styles.spaceBetweenCenter]}>
            <Text style={styles.nameTitle}>{this.props.salonName}</Text>
            <View>
              {!isEmpty(this.props.salonRating) &&
              <View style={[CommonStyle.rowStyle, CommonStyle.centerStyle]}>
                <Text style={styles.ratingText}>{this.props.salonRating} </Text>
                <FontAwesome
                  name='star'
                  size={16}
                  color={COLORS.orange}
                />
              </View>}
              {this.props.showAvailbility && !isEmpty(this.props.availbility) &&
                <View style={styles.availbilityBox}>
                  <Text style={styles.availbilityText}>{this.props.availbility}</Text>
                </View>
              }
              {this.props.showAvailbility && !isEmpty(this.props.unAvailbility) &&
                <View style={styles.unAvailbilityBox}>
                  <Text style={styles.availbilityText}>{this.props.unAvailbility}</Text>
                </View>
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
  static defaultProps = {
    onBackPressFunc: () => {},
    onCallPressFunc: () => {},
    onMsgPressFunc: () => {},
    backButtonEnabled: true,
    callBtnEnabled: false,
    msgBtnEnabled: false,
    showAvailbility: false,
    salonName: '',
    salonRating: '',
    availbility: '',
    unAvailbility: '',
    containerStyle: {}
  };
}

const styles = StyleSheet.create({
  topSection: {
    height:200,
    paddingHorizontal:15,
    backgroundColor: COLORS.inputIcon
  },
  backSection: {
    paddingTop:15,
    height:55,
  },
  backIconWrap:{
    width:'10%'
  },
  noIconWrap:{
    width:'70%'
  },
  callIconWrap:{
    width:'10%',
    alignItems:'center'
  },
  msgIconWrap:{
    width:'10%',
    alignItems:'center'
  },
  spaceBetweenCenter:{
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nameRatingSec:{
    paddingBottom:15,
    justifyContent:'flex-end',
    height:145,
  },
  nameTitle:{
    fontSize: 24,
    color: COLORS.white
  },
  ratingText:{
    fontSize: 15,
    color: COLORS.white
  },
  availbilityBox:{
    marginTop:10,
    paddingHorizontal:8,
    paddingVertical:3,
    backgroundColor:COLORS.green
  },
  unAvailbilityBox:{
    marginTop:10,
    paddingHorizontal:8,
    paddingVertical:3,
    backgroundColor:COLORS.red
  },
  availbilityText:{
    fontSize:13,
    color:COLORS.white
  }
});


