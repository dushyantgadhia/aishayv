import React from "react";

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

import DiscoverAllController, {
  Props
} from "./DiscoverAllController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CustomHeader from '../../../components/src/CustomHeader';
import CommonStyle from "../../../framework/src/CommonStyle";
import { imgLogoBlackPath } from "./assets";
import { isEmpty } from "../../../framework/src/Helpers";

const itemsArr = [
	{id:1, name: 'Mark Michael', speciality: 'Sr. Barber', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:2, name: 'Cecelie Michel', speciality: 'Sr. Barber', rating: '4.0', available: true, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Cecelia Reyes is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Cecelia Reyes is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:3, name: 'Jared Guerren', speciality: 'Sr. Barber', rating: '3.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Jared Guerren is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Jared Guerren is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:4, name: 'Max Petrosky', speciality: 'Sr. Barber', rating: '3.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Jared Guerren is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Jared Guerren is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
]
const hairItemsArr = [
	{id:1, name: 'Rose Hansen', speciality: 'Hair Stylist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:2, name: 'Pearl Austin', speciality: 'Hair Stylist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:3, name: 'Brian Parsons', speciality: 'Hair Stylist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:4, name: 'Mark Michael', speciality: 'Hair Stylist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
]
const makeupItemsArr = [
	{id:1, name: 'Georgia Daniels', speciality: 'Makeup Artist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:2, name: 'Willie Carpen', speciality: 'Makeup Artist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:3, name: 'Theresa Floyd', speciality: 'Makeup Artist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
	{id:4, name: 'Max Petrosky', speciality: 'Makeup Artist', rating: '4.5', available: false, service_provider_id: 4, provider_address: '171 Pagac Drive, Chicago, Illinois, US.', desc: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.'},
]

export default class DiscoverAllBlock extends DiscoverAllController {
  constructor(props: Props) {
    super(props);
    
  }

  renderItem = ({ item, index }) => {
		return(
			<View style={CommonStyle.rowStyle}>
				<TouchableOpacity style={styles.smallItemBox} onPress={() => this.renderDetails(item)}>
					<View style={styles.itemImage}></View>
					<View style={styles.height10} />
					<Text style={styles.itemTextBold}>{item.name}</Text>
					<View style={styles.height10} />
				</TouchableOpacity>
				{this. itemSeparatorComponent()}
			</View>
		)
	}
  
  renderMobileItem = ({ item, index }) => {
		return(
			<View style={CommonStyle.rowStyle}>
				<TouchableOpacity style={styles.smallItemBox} onPress={() => this.renderMobileDetails(item, index)}>
					<View style={styles.itemImage}></View>
					<View style={styles.height10} />
					<Text style={styles.itemTextBold}>{item.name}</Text>
					<View style={styles.height10} />
				</TouchableOpacity>
				{this. itemSeparatorComponent()}
			</View>
		)
	}

	itemSeparatorComponent = () => {
		return <View style={styles.itemSeperator} />
	}

  render() { 
    const { userName, address } = this.state;
		return (
			<View style={styles.container}>
        <View style={styles.fullContainer}>
					<CustomHeader
						containerStyle={[CommonStyle.authHeader,CommonStyle.shadowStyle]}
            backButtonEnabled={true}
            onBackPressFunc={() => this.props.navigation.goBack()}
						centerComponentEnabled
            centerComponent={<Image source={imgLogoBlackPath} />}
            iconTintColor={COLORS.black}
					/>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.contentSection}>
							<View style={[styles.titleWrap]}>
								<Text style={styles.titleText}>{i18n.t('AllSpeicalists')}</Text>
							</View>
							<View style={[CommonStyle.rowStyle,CommonStyle.alignItemsCenter]}>
								<View style={styles.subTitleWrap}>
									<Text style={styles.subTitleText}>{i18n.t('HairStylist')}</Text>
								</View>
							</View>
							<View style={styles.flatListWrap}>
							<FlatList
								horizontal
								//pagingEnabled={true}
								showsHorizontalScrollIndicator={false}
								legacyImplementation={false}
								data={hairItemsArr}
								renderItem={item => this.renderItem(item)}
								keyExtractor={item => item.id + '_'}
							/>
							</View>
							<View style={[CommonStyle.rowStyle,CommonStyle.alignItemsCenter]}>
								<View style={styles.subTitleWrap}>
									<Text style={styles.subTitleText}>{i18n.t('MakeupArtist')}</Text>
								</View>
							</View>
							<View style={styles.flatListWrap}>
							<FlatList
								horizontal
								//pagingEnabled={true}
								showsHorizontalScrollIndicator={false}
								legacyImplementation={false}
								data={makeupItemsArr}
								renderItem={item => this.renderMobileItem(item)}
								keyExtractor={item => item.id+'_'}								
							/>
							</View>
							<View style={[CommonStyle.rowStyle,CommonStyle.alignItemsCenter]}>
								<View style={styles.subTitleWrap}>
									<Text style={styles.subTitleText}>{i18n.t('SrBarber')}</Text>
								</View>
							</View>
							<View style={styles.flatListWrap}>
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
    marginLeft:15,
  },
  titleWrap:{
    width:'95%',
    marginTop:20
  },
  titleText:{
    fontSize:24,
    fontWeight:'bold',
    color: COLORS.inputValue,
  },
  subTitleWrap:{
    width:'95%',
    marginTop:25
  },
  subTitleText:{
    fontSize:17,
    fontWeight:'bold',
    color: COLORS.inputLabel,
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
    borderRadius:8
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
    color: COLORS.inputValue,
    flexWrap: "wrap",
  },
  itemText:{
    marginHorizontal: 10,
    width:105,
    fontSize: 12,
    color: COLORS.inputLabel,
    flexWrap: "wrap",
  },
  itemSeperator:{
    width: 12
  }
});
