import React from "react";
// Customizable Area Start
import { StyleSheet, View, ScrollView } from "react-native";
// Customizable Area End

import GenericCalendarList from "../../../components/src/GenericCalendarList";
import GenericCard from "../../../components/src/GenericCard";
import GenericButton from "../../../components/src/GenericButton";
import GenericSelectionButton from "../../../components/src/GenericSelectionButton";
import GenericInput from "../../../components/src/GenericInput";
import BookingStepIndicator from "../../../components/src/BookingStepIndicator";

import CalendarController, { Props } from "./CalendarController";

const TestTimes = [
  { id: 1, label: "7:30 - 8:30 AM" },
  { id: 2, label: "8:30 - 9:30 AM" },
  { id: 3, label: "9:30 - 10:30 AM" },
  { id: 4, label: "10:30 - 11:30 AM" },
  { id: 5, label: "11:30 - 12:30 AM" },
  { id: 6, label: "12:30 - 1:30 PMM" },
];

export default class Calendar extends CalendarController {
  constructor(props: Props) {
    super(props);
    this.state = {
      address: "",
      selectedTime: "",
    };
  }

  renderTimeSlots() {
    const { selectedTime } = this.state;
    return TestTimes.map((item, index) => {
      return (
        <View style={styles.timeSlot} key={`TIME_SLOT_${index}`}>
          <GenericSelectionButton
            isSelected={selectedTime === item.id}
            onPress={() => this.setState({ selectedTime: item.id })}
          >
            {item.label}
          </GenericSelectionButton>
        </View>
      );
    });
  }

  render() {
    const { address } = this.state;
    return (
      <View style={styles.mainContainer}>
        <BookingStepIndicator activeIndex={1} />
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.scrollWrapper}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <GenericCard>
                <GenericCalendarList />
              </GenericCard>
              <GenericCard title="Available Slot">
                <View style={styles.timeSlotsWrapper}>
                  {this.renderTimeSlots()}
                </View>
              </GenericCard>
              <GenericCard title="Your Address">
                <GenericInput value={address} onChange={() => {}} />
              </GenericCard>
            </View>
          </ScrollView>
          <GenericButton onPress={() => {}}>Next</GenericButton>
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
});
// Customizable Area End
