import React from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

import DiscoverController, {
  Props
} from "./DiscoverController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CustomHeader from '../../../components/src/CustomHeader';
import CommonStyle from "../../../framework/src/CommonStyle";
import { imgLogoBlackPath } from "./assets";
import { isEmpty } from "../../../framework/src/Helpers";

const itemsArr = [
	{id:1, name: 'Mark Michael', speciality: 'Makeup Artist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:2, name: 'Cecelia Reyes', speciality: 'Hair Stylist', rating: '4.0', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Cecelia Reyes is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Cecelia Reyes is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:3, name: 'Jared Guerren', speciality: 'Barber', rating: '3.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Jared Guerren is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Jared Guerren is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:4, name: 'Marguerite Cross Day Salon', speciality: 'Barber', rating: '4.5', available: true, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Marguerite Cross Day Salon is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Marguerite Cross Day Salon is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
]

const itemsOfferArr = [
	{id:1, name: 'Haircut & Beard Promotion', event: 'Cool Summer Event!', discount: '15%', price: 100, offerPrice: 85, fromTime: '2020-10-10T05:00:05.711Z', toTime: '2020-10-10T17:30:00.711Z' },
	{id:2, name: 'Owen Promption', event: 'Opening Event', discount: '12%', price: 100, offerPrice: 88, fromTime: '2020-10-12T05:00:05.711Z', toTime: '2020-10-12T17:30:00.711Z' },
	{id:3, name: 'Makeup Promotion', event: 'Bridal Makeup Event', discount: '10%', price: 100, offerPrice: 90, fromTime: '2020-10-14T05:00:05.711Z', toTime: '2020-10-14T17:30:00.711Z' },
	{id:4, name: 'Max Petrosky Max Promotion', event: 'Max Promotion Event', discount: '5%', price: 100, offerPrice: 85, fromTime: '2020-10-16T05:00:05.711Z', toTime: '2020-10-16T17:30:00.711Z' },
]

export default class DiscoverBlock extends DiscoverController {
  constructor(props: Props) {
    super(props);
    
  }

  renderItem = ({ item, index }) => {
		return(
			<View style={CommonStyle.rowStyle}>
				<TouchableOpacity style={styles.smallItemBox} onPress={() => this.renderDetails(item)}>
					<View style={styles.itemImage}></View>
					<View style={styles.height10} />
					<Text style={styles.itemTextBold} numberOfLines={1}>{item.name}</Text>
					{!isEmpty(item.speciality) && <Text style={styles.itemText}>{item.speciality}</Text>}
					<View style={styles.height10} />
				</TouchableOpacity>
				{this. itemSeparatorComponent()}
			</View>
		)
	}

	itemSeparatorComponent = () => {
		return <View style={styles.itemSeperator} />
  }
  
  renderOfferItem = ({ item, index }) => {
		return(
			<View style={CommonStyle.rowStyle}>
				<TouchableOpacity style={styles.smallItemBox} onPress={() => this.renderOfferDetailScreen(item)}>
					<View style={styles.itemOfferImage}></View>
					<View style={styles.height10} />
					<Text style={styles.itemOfferTextBold}>{item.name}</Text>
					<View style={[CommonStyle.rowStyle,styles.itemEventOfferWrap]}>
						<Text style={styles.itemOfferText}>{item.event}</Text>
						<Text style={styles.itemOfferDiscountText}>{item.discount}</Text>
					</View>
					<View style={styles.height10} />
				</TouchableOpacity>
				{this. itemSeparatorComponent()}
			</View>
		)
	}

  render() { 
    const { userName, address } = this.state;
		return (
			<View style={styles.container}>
        <View style={styles.fullContainer}>
					<CustomHeader
						containerStyle={[CommonStyle.authHeader,CommonStyle.shadowStyle]}
						centerComponentEnabled
						centerComponent={<Image source={imgLogoBlackPath} />}
					/>
					<ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentSection}>
              {userName !== '' && <View style={[CommonStyle.rowStyle, styles.greetingWrap]}>
                <Text style={styles.greetingText}>{i18n.t('Hi')+ ' '}</Text>
                <Text style={styles.userNameText} numberOfLines={1}>{userName + ','}</Text>
              </View>}
              {address !== '' && <View style={[CommonStyle.rowStyle,CommonStyle.alignItemsCenter, styles.addressWrap]}>
                <FontAwesome5
                  name="map-marker-alt"
                  color={COLORS.inactiveIndicator} size={15}
                />
                <Text style={styles.addressText} numberOfLines={1}>{' ' + address}</Text>
              </View>}
              <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter, styles.bestWrap]}>
                <View style={styles.titleWrap}>
                  <Text style={styles.title20}>{i18n.t('BestSpecialists')}</Text>
                </View>
                <TouchableOpacity style={styles.viewTextWrap} onPress={this.goToDiscoverAll}>
                  <Text style={styles.viewText}>{i18n.t('View')}</Text>
                </TouchableOpacity>
                <MaterialCommunityIcons
								  name='chevron-double-right'
                  size={15} color={COLORS.black}
                  onPress={this.goToDiscoverAll}
                />
              </View>
              <View style={[styles.flatListWrap]}>
                <FlatList
                  horizontal
                  //pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  data={itemsArr}
                  renderItem={item => this.renderItem(item)}
                  keyExtractor={item => item.id+'_'}								
                />
              </View>
              <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter, styles.offerWrap]}>
                <View style={styles.titleWrap}>
                  <Text style={styles.title20}>{i18n.t('SpecialOffers')}</Text>
                </View>
                <TouchableOpacity style={styles.viewTextWrap} onPress={this.renderOffersScreen}>
                  <Text style={styles.viewText}>{i18n.t('View')}</Text>
                </TouchableOpacity>
                <MaterialCommunityIcons
								  name='chevron-double-right'
                  size={15} color={COLORS.black}
                  onPress={this.renderOffersScreen}
                />
              </View>
              <View style={[styles.flatListWrap]}>
                <FlatList
                  horizontal
                  //pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  data={itemsOfferArr}
                  renderItem={item => this.renderOfferItem(item)}
                  keyExtractor={item => item.id+'_'}								
                />
              </View>
              <View style={[CommonStyle.margin5P]}></View>
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
    backgroundColor: COLORS.white,
  },
  contentSection:{
    //height:'85%',
    marginLeft:15,
  },
  greetingWrap:{
    marginTop:20
  },
  greetingText:{
    fontSize:24,
  },
  userNameText:{
    fontSize:24,
    fontWeight:'bold',
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  addressWrap:{
    marginTop:5
  },
  addressText:{
    fontSize:14,
    //fontWeight:'bold',
    //marginTop:5,
    color: COLORS.black,
    width:'90%'
  },
  bestWrap:{
    marginTop:25
  },
  offerWrap:{
    marginTop:17
  },
  titleWrap:{
    width:'75%'
  },
  title20:{
    fontSize:20,
    fontWeight:'bold',
    color: COLORS.black,
  },
  viewTextWrap:{
    width:'15%'
  },
  viewText:{
    fontSize: 15
  },
  flatListWrap:{
    marginTop:15
  },
  smallItemBox:{
    backgroundColor: COLORS.white,
    marginHorizontal:1,
    marginVertical:2,
    shadowOffset:
    Platform.OS === "ios"
      ? { width: 0, height: 1 }
      : { width: 0, height: 2 },
    shadowColor: COLORS.inputLabel,
    shadowOpacity: 0.9,
    shadowRadius: Platform.OS === "ios" ? 1 : 5,
    elevation: 2,
    borderRadius:8,
    //borderWidth:1,
    //borderColor: COLORS.inactiveIndicator
  },
  itemImage:{
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
    borderColor:COLORS.borderColor,
    width: 125,
    height: 125,
    backgroundColor: COLORS.inputIcon
  },
  height10:{
    height:10
  },
  itemTextBold:{
    marginHorizontal: 10,
    width:105,
    fontSize: 15,
    fontWeight:'bold',
    color: COLORS.black,
    flexWrap: "wrap",
  },
  itemText:{
    marginHorizontal: 10,
    marginTop:5,
    width:105,
    fontSize: 12,
    color: COLORS.inputLabel,
    flexWrap: "wrap",
  },
  itemSeperator:{
    width: 12
  },
  itemOfferImage:{
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
    borderColor:COLORS.borderColor,
    width: 287,
    height: 170,
    backgroundColor: COLORS.inputIcon
  },
  itemOfferTextBold:{
    marginHorizontal: 10,
    width:267,
    fontSize: 17,
    fontWeight:'bold',
    color: COLORS.black,
    flexWrap: "wrap",
  },
  itemEventOfferWrap:{
    marginHorizontal: 10,
    alignItems: "center"
  },
  itemOfferText:{
    width:210,
    fontSize: 15,
    color: COLORS.inputLabel,
    flexWrap: "wrap",
  },
  itemOfferDiscountText:{
    width:52,
    fontSize: 20,
    textAlign:'right',
    fontWeight:'bold',
    color: COLORS.discountRed
  }
});
