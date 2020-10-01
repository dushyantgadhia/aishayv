import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from "moment";

import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import OfferDetailController, {
  Props
} from "./OfferDetailController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CommonStyle from "../../../framework/src/CommonStyle";

const itemsArr = [
	{id:1, duration: 45, pro: 'Haircuts', cost:30},
	{id:2, duration: 45, pro: 'Hair Styling', cost:25},
	{id:3, duration: 45, pro: 'Skin Care', cost:45},
]

export default class OfferDetailBlock extends OfferDetailController {
  constructor(props: Props) {
    super(props);
    
  }

	itemSeparatorComponent = (hParam:any) => {
		return <View style={{height:hParam}} />
	}

	renderSpecialityItem = ({ item, index }) => {
		return(
			<View style={[CommonStyle.rowStyle, CommonStyle.boxShadowStyle,styles.itemBox]}>
				<View style={styles.itemImage}></View>
				<View style={styles.detailsSection}>
					<Text style={styles.itemTitle} numberOfLines={1}>{item.pro}</Text>
					<View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter]}>
						<Text style={styles.itemDuration}>{item.duration+ ' Min'}</Text>
						<View style={styles.dotStyle}></View>
						<Text style={styles.itemCost}>{'$' + item.cost}</Text>
					</View>
				</View>
			</View>
		)
	}

  render() { 
    const { offerTitle, price, offerPrice, fromTime, toTime } = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.fullContainer}>
					<View style={styles.headerSection}>
						<View style={{margin:15}}>
							<Ionicons
								name='arrow-back'
								size={25}
								color={COLORS.white}
								onPress={() => this.props.navigation.goBack()}
							/>
						</View>
					</View>
					<View style={styles.serviceSection}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.contentSection}>
							<View style={[CommonStyle.rowStyle, styles.titleWrap]}>
								<View style={{width:'75%'}}>
								<Text style={styles.titleText}>{offerTitle}</Text>
								</View>
								<View style={[CommonStyle.rowStyle, styles.alignItemsEnd, {width:'25%'}]}>
									<Text style={styles.itemCostPrice}>{' $' + price +' '}</Text>
									<Text style={styles.itemOfferCost}>{'$' + offerPrice}</Text>
								</View>
							</View>
							<Text style={styles.subTitleText}>{i18n.t('TimeOfEvent')}</Text>
								<View style={[CommonStyle.rowStyle, styles.timeWrap]}>
									<Text style={styles.timeLabel}>{i18n.t('From')}</Text>
									<Text style={styles.timeValue}>{moment(fromTime).format('hh:mm A - MMMM DD,YYYY')}</Text>
								</View>
								<View style={[CommonStyle.rowStyle, styles.timeWrap]}>
									<Text style={styles.timeLabel}>{i18n.t('To')}</Text>
									<Text style={styles.timeValue}>{moment(toTime).format('hh:mm A - MMMM DD,YYYY')}</Text>
								</View>
							<Text style={styles.subTitleText}>{i18n.t('ServicesIncluded')}</Text>
							<FlatList
								showsVerticalScrollIndicator={false}
								//scrollEnabled={false}
								legacyImplementation={false}
								data={itemsArr}
								renderItem={item => this.renderSpecialityItem(item)}
								keyExtractor={item => item.id+'_'}
								ItemSeparatorComponent={() => this.itemSeparatorComponent(12)}
							/>
						</View>
					</ScrollView>
					</View>
					<Button
						title={i18n.t('BookAppointment')}
						//loading={loginLoader}
						buttonStyle={styles.floatingButton}
						containerStyle={styles.floatingButtonContainer}
						onPress={() => this.bookAppointmentFunc()}
					/>
				</View>
			</SafeAreaView>
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
    backgroundColor: COLORS.lightGray,
  },
  alignItemsEnd:{
    justifyContent: 'flex-end',
    alignItems:'flex-end'
  },
  headerSection:{
    height:'30%',
  },
  serviceSection:{
    height:'70%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  contentSection:{
    marginHorizontal: 15,
    marginTop: 23,
    marginBottom: 60,
  },
  titleWrap:{
    marginBottom: 25
  },
  titleText:{
    fontSize:24,
    fontWeight: 'bold',
    color: COLORS.inputValue,
  },
  subTitleText:{
    fontSize:17,
    fontWeight: 'bold',
    color: COLORS.inputValue,
    marginBottom: 15
  },
  timeWrap:{
    marginBottom: 15
  },
  timeLabel:{
    fontSize:15,
    color: COLORS.inputLabel,
    width:50
  },
  timeValue:{
    fontSize:15,
    color: COLORS.inputValue,
  },
  itemCostPrice:{
    fontSize:12,
    textDecorationLine: 'line-through',
    paddingRight:5,
    color: COLORS.inputLabel
  },
  itemOfferCost:{
    fontSize:20,
    fontWeight: 'bold',
    color: COLORS.discountRed
  },
  itemBox:{
    backgroundColor: COLORS.white,
    borderRadius: 8,
    justifyContent: 'space-between'
  },
  itemImage:{
    height: 80,
    width: '21%',
    backgroundColor: COLORS.inputIcon,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  detailsSection:{
    width: '79%',
    justifyContent: 'center',
    padding: 12
  },
  itemTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom:10,
    color: COLORS.inputValue
  },
  itemDuration:{
    fontSize: 15,
    color: COLORS.inputValue
  },
  itemCost:{
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.discountRed
  },
  dotStyle:{
    marginHorizontal:10,
    width:5,
    height:5,
    borderRadius:5,
    backgroundColor: COLORS.inactiveIndicator
  },
  floatingButtonContainer:{
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  floatingButton:{
    marginHorizontal: 15,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.black,
  }
});
