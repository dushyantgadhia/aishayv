import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import PaymentsController, {
  Props,
  PAYMENT_CONTENT,
} from "./PaymentsController";
import GenericButton from "../../../components/src/GenericButton";
import GenericCard from "../../../components/src/GenericCard";
import GenericLabel from "../../../components/src/GenericLabel";
import GenericInput from "../../../components/src/GenericInput";
import BookingStepIndicator from "../../../components/src/BookingStepIndicator";
import CustomHeader from "../../../components/src/CustomHeader";
import CommonStyle from "../../../framework/src/CommonStyle";
import i18n from '../../../framework/src/config/i18n';
import COLORS from "../../../framework/src/Colors";
import moment from "moment";

export default class Payments extends PaymentsController {
  constructor(props: Props) {
    super(props);
  }

  renderPaymentConfirmation() {
    return (
      <View style={styles.pcWrapper}>
        <GenericCard>
          <View style={styles.pcInfoWrapper}>
            <View style={styles.pcInfoLabelWrapper}>
              <GenericLabel
                fontSize={17}
                lineHeight={20}
                color="rgb(46, 58, 89)"
              >
                Marguerite Cross Day Salon
              </GenericLabel>
              <GenericLabel
                fontSize={12}
                lineHeight={15}
                color="rgba(46, 58, 89, 0.6)"
                mt={8}
              >
                171 Pagac Drive, Chicago, Illinois, US.
              </GenericLabel>
              <GenericLabel
                fontSize={12}
                lineHeight={15}
                color="rgb(46, 58, 89)"
                mt={8}
              >
                1121EH543734
              </GenericLabel>
            </View>
            <View style={styles.pcInfoPaidWrapper} />
          </View>
          <View style={styles.pcServiceWrapper}>
            <View style={styles.pcServiceLabelWrapper}>
              <GenericLabel
                fontSize={15}
                lineHeight={18}
                color="rgb(46, 58, 89)"
              >
                Hair Styling
              </GenericLabel>
              <GenericLabel
                fontSize={15}
                lineHeight={18}
                color="rgb(46, 58, 89)"
              >
                June 15, 2020
              </GenericLabel>
            </View>
            <View style={styles.pcServiceLabelWrapper}>
              <GenericLabel
                fontSize={15}
                lineHeight={18}
                color="rgb(143, 155, 179)"
              >
                Jessie Robertson
              </GenericLabel>
              <GenericLabel
                fontSize={15}
                lineHeight={18}
                color="rgb(46, 58, 89)"
              >
                1:30 - 2:30 PM
              </GenericLabel>
            </View>
          </View>
          <View style={styles.pcBarcodeWrapper}>
            <GenericLabel
              fontSize={15}
              lineHeight={18}
              color="rgb(143, 155, 179)"
            >
              Scan Barcode
            </GenericLabel>
          </View>
        </GenericCard>
      </View>
    );
  }

  renderPayment() {
    const { serviceProviderDetails, selectedServiceDetails, selectedAddress, selectedDate, selectedSlot } = this.state;
    const totalCost = selectedServiceDetails && selectedServiceDetails.price ? '$' + (serviceProviderDetails.tax ? selectedServiceDetails.price + selectedServiceDetails.tax : selectedServiceDetails.price) : 'N/A'
    return (
      <>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.container}
        >
          <View>
            <GenericCard>
              <View style={styles.addressWrapper}>
                <View style={styles.addressIconWrapper} />
                <View style={styles.addressLabelWrapper}>
                  <GenericLabel
                    fontSize={15}
                    lineHeight={18}
                    color="rgb(46, 58, 89)"
                  >
                    {serviceProviderDetails && serviceProviderDetails.name && serviceProviderDetails.name}
                  </GenericLabel>
                  <GenericLabel
                    fontSize={12}
                    lineHeight={15}
                    color="rgba(46, 58, 89, 0.6)"
                  >
                    {serviceProviderDetails && serviceProviderDetails.provider_address && serviceProviderDetails.provider_address}
                  </GenericLabel>
                </View>
              </View>
              <View style={styles.timeWrapper}>
                <GenericLabel
                  fontSize={15}
                  lineHeight={18}
                  color="rgb(46, 58, 89)"
                >
                  {selectedServiceDetails && selectedServiceDetails.service_name && selectedServiceDetails.service_name}
                </GenericLabel>
                <GenericLabel
                  fontSize={15}
                  lineHeight={18}
                  color="rgb(143, 155, 179)"
                  mt={12}
                >
                  {serviceProviderDetails && serviceProviderDetails.attendee_name && serviceProviderDetails.attendee_name}
                </GenericLabel>
                <View style={styles.dateTimeWrapper}>
                  <GenericLabel
                    fontSize={15}
                    lineHeight={18}
                    color="rgb(46, 58, 89)"
                  >
                    {selectedSlot && selectedSlot.start}{selectedSlot && selectedSlot.end && ' - ' + selectedSlot.end}
                  </GenericLabel>
                  <GenericLabel
                    fontSize={15}
                    lineHeight={18}
                    color="rgb(46, 58, 89)"
                  >
                    {selectedDate && moment(selectedDate).format('MMMM DD,YYYY')}
                  </GenericLabel>
                  <GenericLabel
                    fontSize={15}
                    lineHeight={18}
                    color="rgb(46, 58, 89)"
                  >
                    {serviceProviderDetails && serviceProviderDetails.price ? '$' + serviceProviderDetails.price : 'N/A'}
                  </GenericLabel>
                </View>
              </View>
            </GenericCard>
            <GenericCard>
              <View style={styles.amountWrapper}>
                <GenericLabel
                  fontSize={17}
                  lineHeight={20}
                  color="rgb(46, 58, 89)"
                >
                  Total Pay
                </GenericLabel>
                <GenericLabel
                  fontSize={17}
                  lineHeight={20}
                  color="rgb(46, 58, 89)"
                >
                  {totalCost}
                </GenericLabel>
              </View>
            </GenericCard>
            <GenericCard title="Promo Code">
              <View style={styles.promocodeWrapper}>
                <View style={styles.promoInputWrapper}>
                  <GenericInput />
                </View>
                <View style={styles.promoButtonWrapper}>
                  <GenericButton onPress={() => {}} fontSize={15}>
                    Apply
                  </GenericButton>
                </View>
              </View>
            </GenericCard>
            <View style={styles.paymentMethodWrapper}>
              <GenericLabel
                fontSize={17}
                lineHeight={20}
                color="rgb(143, 155, 179)"
                fontWeight="700"
              >
                Payment Methods
              </GenericLabel>
              <GenericLabel
                fontSize={15}
                lineHeight={20}
                color="rgb(46, 58, 89)"
                fontWeight="700"
              >
                Add new method
              </GenericLabel>
            </View>
            <View style={styles.paymentMethodsWrapper}>
              <GenericCard title="">
                <View style={styles.paymentMethodBlock}>
                  <View style={styles.paymentMethodIcon} />
                  <GenericLabel
                    fontSize={15}
                    lineHeight={18}
                    color="rgb(46, 58, 89)"
                    fontWeight="700"
                  >
                    **** **** *325
                  </GenericLabel>
                </View>
              </GenericCard>
            </View>
          </View>
        </ScrollView>
        <View style={styles.nextButtonWrapper}>
          <GenericButton {...this.btnNextProps}>Confirm Payment</GenericButton>
        </View>
      </>
    );
  }

  render() {
    const { activeContent } = this.state;
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
        <BookingStepIndicator
          activeIndex={activeContent === PAYMENT_CONTENT ? 2 : 3}
        />
        {activeContent === PAYMENT_CONTENT
          ? this.renderPayment()
          : this.renderPaymentConfirmation()}
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "rgb(244, 244, 244)",
    flex: 1,
  },
  scrollContainer: {
    width: "100%",
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  titleTextStyle:{
    fontSize:17,
    color: COLORS.inputValue
  },
  addressIconWrapper: {
    backgroundColor: "rgb(143, 155, 179)",
    width: 114,
    height: 68,
    marginRight: 10,
    borderRadius: 8,
  },
  addressWrapper: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(244,244, 244)",
    paddingBottom: 16,
    alignItems: "center",
  },
  addressLabelWrapper: {
    flexDirection: "column",
  },
  timeWrapper: {
    width: "100%",
    paddingVertical: 16,
  },
  dateTimeWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  amountWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promocodeWrapper: {
    width: "100%",
    flexDirection: "row",
  },
  promoInputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  promoButtonWrapper: {
    width: 100,
  },
  nextButtonWrapper: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  paymentMethodWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  paymentMethodsWrapper: {},
  paymentMethodBlock: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  paymentMethodIcon: {
    marginRight: 10,
    width: 50,
    height: 32,
    backgroundColor: "rgb(143, 155, 179)",
    borderRadius: 3,
  },
  pcWrapper: {
    padding: 16,
  },
  pcInfoWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(244,244, 244)",
    paddingBottom: 16,
    flexDirection: "row",
  },
  pcInfoLabelWrapper: {
    flex: 1,
  },
  pcInfoPaidWrapper: {
    flex: 1,
  },
  pcServiceWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(244,244, 244)",
    paddingVertical: 16,
  },
  pcServiceLabelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  pcBarcodeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
  },
});
