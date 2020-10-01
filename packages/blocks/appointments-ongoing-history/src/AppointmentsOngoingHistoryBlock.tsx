import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  FlatList
} from "react-native";
import { TabView, TabBar } from 'react-native-tab-view';
import { Calendar } from "react-native-calendars";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";

import GenericCard from "../../../components/src/GenericCard";
import GenericLabel from "../../../components/src/GenericLabel";
import {GenericSwitch} from "../../../components/src/GenericSwitch";

import CommonStyle from "../../../framework/src/CommonStyle";
import i18n from "../../../framework/src/config/i18n";
import COLORS from "../../../framework/src/Colors";
// Customizable Area End

import AppointmentsOngoingHistoryController, {
  Props,
  configJSON
} from "./AppointmentsOngoingHistoryController";
import { imgBarCodePath } from "./assets";

const appointmentDetails = {
  salonName: 'Marguerite Cross Day Salon Long',
  addressSelected: '171 Pagac Drive, Chicago, Illinois, Chicago, Illinois, US.',
  slot: '1:30 - 2:30 PM',
  servicePerson: 'Jessie Robertson',
  service: "Men's Haircuts"
};

export default class AppointmentsOngoingHistory extends AppointmentsOngoingHistoryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  
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
  
  renderDayComponent = ({date, state}) => {
    const {selectedDate, minDate, appointmentDates} = this.state;
    const selectedDateFlag = moment(date.dateString).isSame(selectedDate, 'day');
    const pastDate = moment(date.dateString).isBefore(minDate, 'day');
    const dayBackColor = selectedDateFlag ? COLORS.black : COLORS.white;
    const dotColor = selectedDateFlag ? COLORS.white : pastDate ? COLORS.inputLabel : COLORS.orange;
    const dayTextColor = selectedDateFlag ? COLORS.white : state === 'disabled' ? COLORS.inputLabel : COLORS.black;
    selectedDateFlag ? console.log('selectedDate date',date):'';
    return (
      <TouchableWithoutFeedback onPress={() => {this.selectDate(date)}}>
      <View style={[styles.selectedDateWrap, { backgroundColor: dayBackColor }]}>
        <Text style={[styles.calenderDayText, { color: dayTextColor }]}>
          {date.day}
        </Text>
        {appointmentDates.indexOf(date.dateString) > -1 &&
          <View style={[styles.calendarDot, { backgroundColor: dotColor }]} />
        }
      </View>
      </TouchableWithoutFeedback>
    );
  }

  renderAppointmentComponent = (appointmentDetails:any, showBarcode: boolean = false) => {
    return (
      <GenericCard>
        <View style={styles.addressWrapper}>
          <View style={styles.addressIconWrapper} />
          <View style={styles.addressLabelWrapper}>
            <GenericLabel
              fontSize={17}
              //lineHeight={18}
              color={COLORS.inputValue}
              fontWeight={'bold'}
              numberOfLines={2}
            >
              {appointmentDetails.salonName}
            </GenericLabel>
            <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter]}>
              <FontAwesome5
                name="map-marker-alt"
                color={COLORS.inactiveIndicator} size={15}
                style={styles.smallIconWrap}
              />
              <GenericLabel
                fontSize={12}
                color={COLORS.inputValue}
                style={{ width: '90%' }}
                numberOfLines={1}
              >
                {appointmentDetails.addressSelected}
              </GenericLabel>
            </View>
          </View>
        </View>
        <View style={[styles.timeWrapper, showBarcode && styles.timeWrapperBorder]}>
          <View style={[CommonStyle.rowStyle, CommonStyle.spaceBetween]}>
            <GenericLabel
              fontSize={15}
              //lineHeight={18}
              color={COLORS.inputValue}
              fontWeight={'bold'}
            >
              {appointmentDetails.service}
            </GenericLabel>
            {appointmentDetails.slot && <GenericLabel
              fontSize={15}
              //lineHeight={18}
              color={COLORS.inputValue}
              fontWeight={'bold'}
            >
              {appointmentDetails.slot}
            </GenericLabel>}
          </View>
          <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter, CommonStyle.spaceBetween, styles.personNameRow]}>
            <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter]}>
              <MaterialCommunityIcons
                name="account"
                color={COLORS.inactiveIndicator}
                size={15}
                style={styles.smallIconWrap}
              />
              <GenericLabel
                fontSize={15}
                color={COLORS.inputLabel}
              >
                {appointmentDetails.servicePerson}
              </GenericLabel>
            </View>
            {appointmentDetails.date && <GenericLabel
              fontSize={15}
              color={COLORS.inputValue}
              fontWeight={'bold'}
            >
              {moment(appointmentDetails.date).format('MMMM DD, YYYY')}
            </GenericLabel>}
          </View>
        </View>
        {showBarcode && <View style={styles.barCodeWrapper}>
          <View style={[CommonStyle.rowStyle, CommonStyle.centerStyle, CommonStyle.spaceBetween]}>
            <GenericLabel
              fontSize={15}
              //lineHeight={18}
              color={COLORS.inputLabel}
            >
              {'Scan Barcode'}
            </GenericLabel>
            <View style={styles.barCodeIconWrapper}>
              <Image source={imgBarCodePath} style={styles.barCodeImage} />
            </View>
          </View>
        </View>}
      </GenericCard>
    );
  }
  // Customizable Area End

  render() {
    const {
      index,
      selectedDate,
      minDate,
      appointmentDates,
      calendarViewRefreshObj,
      appointmentHistory
    } = this.state;
    return (
      //Merge Engine DefaultContainer
      <View style={styles.container}>
        <View style={styles.fullContainer}>
          {/** Tab section */}
          <View style={CommonStyle.rowStyle}>
            {this.renderTabView()}
          </View>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                //this.hideKeyboard();
              }}
            >
              {/* Customizable Area Start */}
              {/* Merge Engine UI Engine Code */}
              <View>
                {/** Ongoing section */}
                {index == 0 && <>
                <GenericCard>
                  <Calendar
                    minDate={minDate}
                    markedDates={calendarViewRefreshObj}
                    dayComponent={this.renderDayComponent}
                    renderArrow={(direction:any) => (<FontAwesome name={`angle-${direction}`} size={20} color={COLORS.ReviewBlack}/>)}
                    //renderHeader={(date) => {return(<Text>{moment(date.dateString).format('MMMM, YYYY')}</Text>)}}
                  />
                </GenericCard>
                {appointmentDates.indexOf(moment(selectedDate).format('YYYY-MM-DD')) > -1 ? <>
                {this.renderAppointmentComponent(appointmentDetails, true)}

                <GenericCard>
                  <View style={[CommonStyle.rowStyle,CommonStyle.centerStyle, CommonStyle.spaceBetween]}>
                    <Text>{i18n.t('Remind')}</Text>
                    <GenericSwitch
                      //testID={'testID'}
                      // eslint-disable-next-line react-native/no-inline-styles
                      value={this.state.reminder}
                      onValueChange={value => {this.setReminder(value)}}
                      barHeight={30}
                      backgroundActive={COLORS.orange}
                      backgroundInactive={COLORS.inputLabel}
                      renderActiveText={false}
                      renderInActiveText={false}
                      circleSize={30}
                      renderInsideCircle={() => this.state.reminder ? <FontAwesome name={'check'} size={15} color={COLORS.orange}/> : <View/>}
                      circleBorderWidth={1}
                      circleBorderActiveColor={COLORS.orange}
                      circleBorderInactiveColor={COLORS.inputLabel}
                      circleActiveColor={COLORS.white}
                      circleInActiveColor={COLORS.inactiveIndicator}
                      switchRightPx={2}
                      switchLeftPx={2}
                      switchWidthMultiplier={2}
                      switchBorderRadius={28}
                    />
                  </View>
                </GenericCard>
                </> : 
                <GenericCard>
                  <Text style={styles.noAppText}>{i18n.t('NoAppointmentForDay')}</Text>
                </GenericCard>
                }
                </>}
                {/** History section */}
                {index == 1 && <>
                {appointmentHistory.length ?
                <FlatList
                  showsVerticalScrollIndicator={false}
                  //scrollEnabled={false}
                  legacyImplementation={false}
                  data={appointmentHistory}
                  renderItem={itemObj => this.renderAppointmentComponent(itemObj.item)}
                  keyExtractor={item => item.id+'_'}
                  //ItemSeparatorComponent={() => this.itemSeparatorComponent(12)}
                /> : 
                <GenericCard>
                  <Text style={styles.noAppText}>{i18n.t('NoAppointmentHistory')}</Text>
                </GenericCard>
                }
                </>}
                <View style={styles.screenBottomSpace}/>                
              </View>
              {/* Merge Engine UI Engine Code */}
              {/* Customizable Area End */}
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1    
  },
  fullContainer:{
    height: '100%',
    backgroundColor: COLORS.borderColor,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
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
  addressIconWrapper: {
    backgroundColor: "rgb(143, 155, 179)",
    width: 114,
    height: 68,
    marginRight: 10,
    borderRadius: 8,
  },
  barCodeIconWrapper: {
    backgroundColor: "rgb(143, 155, 179)",
    width: '60%',
    height: 60
  },
  barCodeImage:{width:'100%', height:'100%', resizeMode: 'cover'},
  addressWrapper: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(244,244,244)",
    paddingBottom: 16,
  },
  addressLabelWrapper: {
    flex:1,
    flexDirection: "column",
    justifyContent: 'center'
  },
  smallIconWrap:{paddingRight:5},
  personNameRow:{marginTop:10},
  timeWrapper: {
    width: "100%",
    paddingTop: 14,
  },
  timeWrapperBorder:{
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(244,244,244)",
  },
  dateTimeWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  barCodeWrapper: {
    width: "100%",
    paddingTop: 14,
  },
  selectedDateWrap:{
    alignItems:'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    paddingTop:10
  },
  calenderDayText:{ textAlign: 'center', fontSize:15 },
  calendarDot:{width:5, height:5, borderRadius:5},
  switchActive:{borderRadius:32, borderWidth:2, borderColor:COLORS.orange},
  noAppText:{textAlign: 'center', fontSize:15, color:COLORS.ReviewBlack },
  screenBottomSpace:{height:15}
});
// Customizable Area End
