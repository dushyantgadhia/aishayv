import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

import SpecialistDetailsController, {
  Props
} from "./SpecialistDetailsController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CommentsListingComponent from '../../../components/src/CommentsListingComponent';
import ReadMore from '../../../components/src/ReadMore';
import ReviewBoxComponent from '../../../components/src/ReviewBoxComponent';
import SalonDetailComponent from '../../../components/src/SalonDetailComponent';
import CommonStyle from "../../../framework/src/CommonStyle";
import { isEmpty } from "../../../framework/src/Helpers";

//const initialLayout = { width: Dimensions.get('window').width };


export default class SpecialistDetailsBlock extends SpecialistDetailsController {

  constructor(props: Props) {
    super(props);    
  }

  renderSpecialityItem = ({ item, index }) => {
		const { specialityIndex } = this.state;
		return(
			<TouchableOpacity style={[CommonStyle.rowStyle, styles.itemBox]}
				onPress={() => { this.setSpecialityItem(index) }}
			>
				<View style={styles.itemImage}></View>
				<View style={styles.detailsSection}>
					<Text style={styles.itemTitle} numberOfLines={1}>{item.service_name}</Text>
					<View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter]}>
						<Text style={styles.itemDuration}>{item.duration+ ' Min'}</Text>
						<View style={styles.dotStyle}></View>
						<Text style={styles.itemCost}>{'$' + item.price}</Text>
					</View>
				</View>
				<View style={styles.checkSection}>
					{specialityIndex == index &&
					<Ionicons
						name='checkmark-circle'
						size={34}
						color={COLORS.black}
					/>}
				</View>
			</TouchableOpacity>
		)
	}

	itemSeparatorComponent = (hParam:any) => {
		return <View style={{height:hParam}} />
	}
	
	// renderScene = SceneMap({
	// 	About: this.FirstRoute,
	// 	Review: this.SecondRoute,
	// })

	renderTabs = (item:object, tabIndex:any) => (
		<TouchableOpacity key={item.key}
			style={tabIndex == this.state.index ? styles.tabBarActive : styles.tabBar}
			onPress={() => { this.setIndex(tabIndex) }}
		>
			<Text
				style={tabIndex == this.state.index ? styles.tabBarLabelActive : styles.tabBarLabel}
			>{item.title}</Text>
		</TouchableOpacity>
	)

	renderTabBar = (props:any) => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: 'black'}}
			style={{ backgroundColor: 'white'}}
			renderLabel={({ route, focused, color }) => (
				<Text style={focused ? styles.tabBarLabelActive : styles.tabBarLabel}>
					{route.title}
				</Text>
			)}
		/>
	);

	renderTabView = () => {
		const { index, routes } = this.state;
		return (
			<TabView
				navigationState={{ index, routes }}
				onIndexChange={this.setIndex}
				renderTabBar={this.renderTabBar}
				// renderScene={this.renderScene}
				renderScene={({ route }) => {
					/* ... */
        }}
				// initialLayout={initialLayout}
			/>
		)
	}

	renderComments = ({item, index}) => {
		const { reviews } = this.state;
		return (
			<>
				<CommentsListingComponent
					reviewsList={reviews}
					itemObj={item}
					itemIndex={index}
				/>
			</>
		)
	}

  render() { 
    const { index, specialistSelected, description, selectedRatingValue, maxRatingValue, comment, reviews, services } = this.state;
		return (
      <SafeAreaView style={styles.container}>
        <View style={styles.fullContainer}>
          <View>
            <SalonDetailComponent
              onBackPressFunc={() => this.props.navigation.goBack()}
              backButtonEnabled={true}
              salonName={specialistSelected && specialistSelected.name || ''}
              salonRating={specialistSelected && specialistSelected.rating || ''}
              callBtnEnabled={false}
              msgBtnEnabled={false}
              showAvailbility={specialistSelected && specialistSelected.available || false}
              availbility={i18n.t('Available')}
							//unAvailbility={i18n.t('Unavailable')}
            />
          </View>
          {/** Tab section */}          
          <View style={CommonStyle.rowStyle}>
            {this.renderTabView()}
          </View>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
            <View style={styles.contentSection}>
              {/** About section */}
              {index == 0 && <>
                {!isEmpty(specialistSelected) && !isEmpty(specialistSelected.desc) && <View style={styles.infoBox}>
                  <Text style={styles.infoTitle}>{i18n.t('Information')}</Text>
                  <ReadMore
                    key={'description'}
                    numberOfLines={specialistSelected.desc ? 6 : 1}
                    textStyle={styles.infoDesc}
                    readMoreTextStyle={styles.readMoreText}
                    readMoreLabel={i18n.t('ReadMore')}
                    readLessLabel={i18n.t('ReadLess')}
                  >
                    {specialistSelected.desc}
                  </ReadMore>
                </View>}
                <Text style={styles.specTitle}>{i18n.t('Specialities')}</Text>
                <FlatList
                  //pagingEnabled={true}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  legacyImplementation={false}
                  data={services}
                  renderItem={item => this.renderSpecialityItem(item)}
                  keyExtractor={item => item.id + '_'}
                  ItemSeparatorComponent={() => this.itemSeparatorComponent(12)}
                />
                <View style={styles.aboutSecBottom} />
              </>}
              {/** Review & comments section */}
              {index == 1 && <>
                <ReviewBoxComponent
                  setRatingFunc={this.setRating}
                  handleInputChange={this._handleInputChange}
                  submitReviewFunc={() => this.submitReviewFunc()}
                  reviewQuestion={i18n.t('ReviewQuestion1')}
                  maxRatingValue={maxRatingValue}
                  selectedRatingValue={selectedRatingValue}
                  inputs={this.inputs}
                  commentValue={comment}
                  containerStyle={{}}
                />
                <View style={styles.commentBoxWrap}>
                  <FlatList
                    //pagingEnabled={true}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    legacyImplementation={false}
                    data={reviews}
                    renderItem={item => this.renderComments(item)}
                    keyExtractor={item => item.id + '_'}
                    ItemSeparatorComponent={() => this.itemSeparatorComponent(1)}
                  />
                </View>
              </>}
            </View>
          </ScrollView>
          {index == 0 && <>
            <Button
              title={i18n.t('BookAppointment')}
              //loading={loginLoader}
              buttonStyle={styles.floatingButton}
              containerStyle={styles.floatingButtonContainer}
              onPress={() => this.bookAppointmentFunc()}
            />
          </>
          }
        </View>
      </SafeAreaView>
		)
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
  contentSection:{
    //height:'85%',
    margin:15,
  },
  topSection: {
    height:200,
    paddingHorizontal:15,
    backgroundColor: COLORS.inputIcon
  },
  backSection: {
    paddingTop:15,
    height:55,
    //backgroundColor: COLORS.red
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
  tabBar:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50
  },
  tabBarActive:{
    borderBottomColor: COLORS.black,
    borderBottomWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50
  },
  tabBarLabel:{
    fontSize: 20,
    color: COLORS.inputIcon
  },
  tabBarLabelActive:{
    fontSize: 20,
    //fontWeight: 'bold',
    color: COLORS.black
  },
  infoBox:{
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    marginBottom:12
  },
  infoTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black
  },
  infoDesc:{
    paddingTop: 10,
    fontSize: 15,
    color: COLORS.infoGray
  },
  readMoreText:{
    fontSize: 15,
    color: COLORS.black
  },
  specTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12
  },
  itemBox:{
    backgroundColor: COLORS.white,
    marginHorizontal:1,
    marginVertical:1,
    shadowOffset:
    Platform.OS === "ios"
      ? { width: 0, height: 1 }
      : { width: 0, height: 2 },
    shadowColor: COLORS.inputLabel,
    shadowOpacity: 0.9,
    shadowRadius: Platform.OS === "ios" ? 1 : 5,
    elevation: 2,
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
    width: '64%',
    justifyContent: 'center',
    padding: 12
    //backgroundColor: COLORS.orange,
  },
  checkSection:{
    width: '15%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 12
    //backgroundColor: COLORS.red,
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
    color: COLORS.black
  },
  dotStyle:{
    marginHorizontal:10,
    width:5,
    height:5,
    borderRadius:5,
    backgroundColor: COLORS.inactiveIndicator
  },
  aboutSecBottom:{
    height: 50
  },
  floatingButtonContainer:{
    position: 'absolute',
    bottom: 10,
    //right: 10,
    width: '100%',
  },
  floatingButton:{
    marginHorizontal: 15,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.black,
  },
  reviewBox:{
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop:24,
    paddingBottom:19,
    justifyContent:'center'
  },
  reviewTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.ReviewBlack
  },
  reviewQue:{
    fontSize: 15,
    paddingTop:13,
    textAlign: 'center',
    color: COLORS.ReviewBlack
  },
  ratingSec:{
    marginTop: 30,
    marginBottom: 46
  },
  commentContainerStyle:{
    width:'80%',
  },
  commentInputStyle:{
    width:'80%',
    justifyContent:'center',
    backgroundColor: COLORS.inactiveIndicator,
    minHeight: 50,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 15,
    color: COLORS.ReviewBlack
  },
  sendContainerStyle:{
    width:'15%'
  },
  sendButtonStyle:{
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.black
  },
  commentBoxWrap:{
    marginTop: 15
  },
  commentBox:{
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  commentBoxRow:{
    marginVertical: 15
  },
  noBorder:{
    borderRadius: 0
  },
  noBorderTop:{
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  noBorderBottom:{
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  avtarSec:{
    width: '10%'
  },
  commenterSec:{
    width: '75%',
    paddingHorizontal: 15,
    justifyContent: "center"
  },
  commentBoxRatingSec:{
    width: '15%',
    alignItems: 'flex-end'
  },
  commenterName:{
    fontSize:15,
    fontWeight:'bold',
    color: COLORS.inputValue
  },
  commentTime:{
    fontSize:12,
    color: COLORS.inputValue
  },
  commentTextStyle:{
    marginBottom:15,
    fontSize:15,
    color: COLORS.inputValue
  }
});
