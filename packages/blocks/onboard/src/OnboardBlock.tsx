import React, { Component } from "react";
import Swiper from 'react-native-swiper';
import { Button } from 'react-native-elements';

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import COLORS from "../../../framework/src/Colors";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import i18n from '../../../framework/src/config/i18n';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";

import OnboardController, {
  Props
} from "./OnboardController";

export default class OnboardBlock extends OnboardController {
  constructor(props: Props) {
    super(props);
    
  }

  renderSwiperContent = (index:number) => {
		let swiperTitle = ['SwiperOneTitle', 'SwiperTwoTitle', 'SwiperThreeTitle'];
		let swiperText = ['SwiperOne', 'SwiperTwo', 'SwiperThree'];
		//console.log('console->renderSwiperContent', swiperTitle[index], swiperText[index]);
		return (
			<View style={styles.swiperDescWrap}>
				<Text style={styles.textlabel}>{i18n.t(swiperTitle[index])}</Text>
				<View style={styles.descriptionTextWrap}>
					<Text style={styles.textValue}>{i18n.t(swiperText[index])}</Text>
				</View>
				{swiperTitle.length == index + 1 ?
					<Button
						title={i18n.t('GetStarted')}
						//loading={loginLoader}
						buttonStyle={styles.buttonStyle}
						containerStyle={styles.buttonStyleWrap}
						onPress={this.goToLogin}
					/> :
					<TouchableOpacity style={{  }} onPress={this.goToLogin}>
						<Text style={styles.skipText}>{i18n.t('Skip')}</Text>
					</TouchableOpacity>
				}				
			</View>
		);
	}

  render() { 
    const {swiperIndex} = this.state;
		return (
      <View style={styles.fullContainer}>
        <View style={styles.container}>
          <View style={styles.swiperWrap}>
            <Swiper
              showsButtons={false}
              //style={{height:'100%'}}
              paginationStyle={{ bottom: 0 }}
              dot={<View style={styles.inactiveDots} />}
              activeDot={<View style={styles.activeDots} />}
              onIndexChanged={this.onSliderChange}
            >
              <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
              </View>
            </Swiper>
          </View>
          {this.renderSwiperContent(swiperIndex)}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  fullContainer: {
    flex: 1
  },
  container:{
    height: '100%',
    backgroundColor: COLORS.white,
  },
  swiperWrap:{
    height:'70%'
  },
  swiperDescWrap:{
    height:'30%',
    justifyContent:'space-around'
  },
  textStyle:{
    color: COLORS.black,
    lineHeight: 20,
    fontSize: 16,
    flexWrap: "wrap",
  },
  textlabel:{
    fontSize: 20,
    color: COLORS.black10,
    textAlign:"center",
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  textValue:{
    fontSize: 14,
    textAlign:"center",
    color: COLORS.inputLabel,
  },
  descriptionTextWrap:{
    marginHorizontal: '15%'
  },
  skipText:{
    fontSize: 17,
    textAlign:"center",
    fontWeight: "bold",
    color: COLORS.skipGray,
  },
  slide1: {
    //flex: 1,
    height:'92%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    //flex: 1,
    height:'92%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    //flex: 1,
    height:'92%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  activeDots:{
    backgroundColor: COLORS.black,
    width: '7%',
    height: 5,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  inactiveDots:{
    backgroundColor: COLORS.inactiveIndicator,
    width: '7%',
    height: 5,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonStyleWrap: {
    marginHorizontal: '20%'
  },
  buttonStyle: {
    backgroundColor: 'black',
    height:50,
    borderRadius:10
  }
});
