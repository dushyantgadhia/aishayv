import React, { FunctionComponent, useState } from "react";
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import moment from "moment";

import Colors from "../../framework/src/Colors";

interface Props {
  onSelectDate: (selectedDate: string) => void;
}

const DATE_FORMAT = "YYYY-MM-DD";

const GenericCalendarList: FunctionComponent<Props> = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format(DATE_FORMAT)
  );

  const getTheme = () => {
    return {
      // arrows
      arrowColor: Colors.blueGrey,
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: Colors.darkBlueGrey,
      textMonthFontSize: 15,
      textMonthFontWeight: "bold",
      // day names
      textSectionTitleColor: Colors.blueGrey,
      textDayHeaderFontSize: 12,
      // dates
      dayTextColor: Colors.darkBlueGrey,
      textDayFontSize: 15,
      // selected date
      selectedDayBackgroundColor: Colors.black,
      selectedDayTextColor: Colors.white,
      selectedDayBorderRadius: 4,
      // disabled date
      textDisabledColor: Colors.lightBlueGrey,
    };
  };

  return (
    <CalendarProvider
      onDateChanged={(date: string) => {
        setSelectedDate(date);
        onSelectDate(date);
      }}
    >
      <ExpandableCalendar
        disablePan={true} //we need this
        disableWeekScroll={true}
        markingType="custom"
        minDate={moment().format(DATE_FORMAT)}
        markedDates={{
          [selectedDate]: {
            marked: true,
            customStyles: {
              container: {
                backgroundColor: "black",
                borderRadius: 8,
              },
              text: {
                color: "white",
              },
            },
          },
        }}
        hideKnob
        theme={getTheme()}
      />
    </CalendarProvider>
  );
};

export default GenericCalendarList;
