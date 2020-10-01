import React from "react";
import Swiper from 'react-native-swiper';
import { Badge } from 'react-native-elements';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import OffersController, {
  Props
} from "./OffersController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CustomHeader from '../../../components/src/CustomHeader';
import CommonStyle from "../../../framework/src/CommonStyle";

const itemsOfferArr = [
	{id:1, name: 'Haircut & Beard Promotion', event: 'Cool Summer Event!', discount: '15%', price: 100, offerPrice: 85, fromTime: '2020-10-10T05:00:05.711Z', toTime: '2020-10-10T17:30:00.711Z' },
	{id:2, name: 'Owen Promption', event: 'Opening Event', discount: '12%', price: 100, offerPrice: 88, fromTime: '2020-10-12T05:00:05.711Z', toTime: '2020-10-12T17:30:00.711Z' },
	{id:3, name: 'Makeup Promotion', event: 'Bridal Makeup Event', discount: '10%', price: 100, offerPrice: 90, fromTime: '2020-10-14T05:00:05.711Z', toTime: '2020-10-14T17:30:00.711Z' },
	{id:4, name: 'Max Petrosky Max Promotion', event: 'Max Promotion Event', discount: '5%', price: 100, offerPrice: 85, fromTime: '2020-10-16T05:00:05.711Z', toTime: '2020-10-16T17:30:00.711Z' },
]

export default class OffersBlock extends OffersController {
  constructor(props: Props) {
    super(props);
    
  }

	renderItem = ({ item, index }) => {
		return(
			<TouchableOpacity style={[CommonStyle.rowStyle, CommonStyle.boxShadowStyle, styles.itemBox]}
				onPress={() => { this.renderOfferDetails(item) }}
			>
				<View style={styles.itemImage}></View>
				<View style={styles.detailsSection}>
					<Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
					<Text style={styles.itemEventText} numberOfLines={1}>{item.event}</Text>
					<View style={[CommonStyle.rowStyle, styles.alignItemsEnd]}>
						<Text style={styles.itemCost}>{' $' + item.price + ' '}</Text>
						<Text style={styles.itemOfferCost}>{'$' + item.offerPrice}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	itemSeparatorComponent = (hParam:any) => {
		return <View style={{height:hParam}} />
	}

	bellIcon = () => {
		return(
			<View style={styles.bellIconWrap}>
				<SimpleLineIcons
					name='bell'
					size={25}
					color={COLORS.inputIcon}
					onPress={() => console.log('Noti')}
				/>
				<Badge
					badgeStyle={{backgroundColor: COLORS.black}}
					containerStyle={{ position: 'absolute', top: -4, right: -4 }}
					value={this.state.notificationCount}
				/>
			</View>
		)
	}

  render() { 
    const { notificationCount } = this.state;
		return (
			<View style={styles.container}>
        <View style={styles.fullContainer}>
					<CustomHeader
						containerStyle={[CommonStyle.authHeader,CommonStyle.shadowStyle]}
						backButtonEnabled={true}
            onBackPressFunc={() => this.props.navigation.goBack()}
            iconTintColor={COLORS.black}
						headerTitle={i18n.t('PromotionsAndOffers')}
						rightComponentEnabled
						rightComponent={this.bellIcon()}
					/>
					<ScrollView showsVerticalScrollIndicator={false}>
							<View style={styles.SliderWrap}>
								<Swiper
									showsButtons={false}
									autoplay
									//style={{height:'88%'}}
									dot={<View style={styles.inactiveDots} />}
									activeDot={<View style={styles.activeDots} />}
									//onIndexChanged={this.onSliderChange}
								>
									<View style={styles.slide1}>
									</View>
									<View style={styles.slide2}>
									</View>
									<View style={styles.slide3}>
									</View>
								</Swiper>
							</View>
							<View style={styles.contentSection}>
								<Text style={styles.specTitle}>{i18n.t('SpecialOffers')}</Text>
								<FlatList
									showsVerticalScrollIndicator={false}
									scrollEnabled={false}
									legacyImplementation={false}
									data={itemsOfferArr}
									renderItem={item => this.renderItem(item)}
									keyExtractor={item => item.id+'_'}
									ItemSeparatorComponent={() => this.itemSeparatorComponent(12)}
								/>
								<View style={[CommonStyle.margin5P]} />
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
  headerTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.inputValue
  },
  contentSection:{ marginHorizontal:15 },
  bellIconWrap:{marginRight:5},
  SliderWrap:{ height:228, marginTop:2 },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  activeDots:{
    width: 11,
    height: 11,
    borderRadius: 11,
    borderColor: COLORS.white,
    borderWidth:1,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  inactiveDots:{
    backgroundColor: COLORS.white,
    width: 11,
    height: 11,
    borderRadius: 11,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  specTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 17,
    marginBottom: 15
  },
  itemBox:{ backgroundColor: COLORS.white, borderRadius: 8, },
  itemImage:{
    height: 108,
    width: '27%',
    backgroundColor: COLORS.inputIcon,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  detailsSection:{
    width: '73%',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  itemTitle:{
    fontSize:17,
    fontWeight: 'bold',
    color: COLORS.inputValue
  },
  itemEventText:{
    fontSize:15,
    color: COLORS.infoGray
  },
  alignItemsEnd:{
    marginTop:10,
    justifyContent: 'flex-end',
    alignItems:'flex-end'
  },
  itemCost:{
    fontSize:12,
    textDecorationLine: 'line-through',
    paddingRight:5,
    color: COLORS.inputLabel
  },
  itemOfferCost:{
    fontSize:20,
    fontWeight: 'bold',
    color: COLORS.discountRed
  }
});
