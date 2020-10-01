import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";

import GenericCalendarList from "../../../components/src/GenericCalendarList";
import GenericCard from "../../../components/src/GenericCard";
import GenericButton from "../../../components/src/GenericButton";
import GenericSelectionButton from "../../../components/src/GenericSelectionButton";
import GenericInput from "../../../components/src/GenericInput";
import BookingStepIndicator from "../../../components/src/BookingStepIndicator";
import CustomHeader from "../../../components/src/CustomHeader";
import CommonStyle from "../../../framework/src/CommonStyle";
import i18n from '../../../framework/src/config/i18n';
import COLORS from "../../../framework/src/Colors";
import { Button } from 'react-native-elements';

import AppointmentmanagementController, {
  Props,
  configJSON,
} from "./AppointmentmanagementController";
import GenericLabel from "../../../components/src/GenericLabel";

export default class Appointmentmanagement extends AppointmentmanagementController {
  constructor(props: Props) {
    super(props);
  }

  renderTimeSlots() {
    const { selectedTime, timeSlots } = this.state;

    if (timeSlots.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <GenericLabel align="center">No timeslots available</GenericLabel>
        </View>
      );
    }

    return timeSlots.map((item:any, index:any) => {
      return (
        <View style={styles.timeSlot} key={`TIME_SLOT_${index}`}>
          <GenericSelectionButton
            isSelected={selectedTime === item.id}
            onPress={() => this.onSlotSelect(item)}
            testID={`TIME_SLOT_${index}`}
          >
            {`${item.start} - ${item.end}`}
          </GenericSelectionButton>
        </View>
      );
    });
  }

  render() {
    const { address } = this.state;
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          containerStyle={[CommonStyle.authHeader]}
          backButtonEnabled={true}
          onBackPressFunc={() => this.props.navigation.goBack()}
          iconTintColor={COLORS.black}
          headerTitle={i18n.t('BookAppointment')}
          titleTextStyle={styles.titleTextStyle}
        />
        <BookingStepIndicator activeIndex={1} />
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.scrollWrapper}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <GenericCard>
                <GenericCalendarList {...this.calendarProps} testID={`CALENDAR`}/>
              </GenericCard>
              <GenericCard title="Available Slot">
                <View style={styles.timeSlotsWrapper}>
                  {this.renderTimeSlots()}
                </View>
              </GenericCard>
              <GenericCard title="Your Address">
                <TouchableOpacity {...this.locationInputProps}>
                  <GenericInput
                    value={address}
                    editable={false}
                    onChange={() => {}}
                  />
                </TouchableOpacity>
              </GenericCard>
            </View>
          </ScrollView>
          <Button
            title={i18n.t('Next')}
            buttonStyle={styles.buttonStyle}
            disabledStyle={styles.disabledButtonStyle}
            //containerStyle={styles.buttonStyleWrap}
            {...this.btnNextProps()}
          />
        </View>
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  container: {},
  scrollWrapper: {
    flex: 1,
  },
  titleTextStyle:{
    fontSize:17,
    color: COLORS.inputValue
  },
  timeSlotsWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlot: {
    marginBottom: 10,
    width: "48%",
  },
  emptyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: COLORS.black,
    height:50,
    borderRadius:8
  },
  disabledButtonStyle:{
    backgroundColor: COLORS.darkGray
  }
});
// Customizable Area End
