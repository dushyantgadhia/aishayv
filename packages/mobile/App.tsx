import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, YellowBox  } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

//import {createStackNavigator} from 'react-navigation';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/** Screens */
import SplashScreen from "../components/src/SplashScreen";
import OnboardScreen from "../blocks/onboard/src/OnboardBlock";
import EmailLoginScreen from "../blocks/email-login/src/EmailLoginBlock";
import VerificationScreen from "../blocks/verification/src/VerificationBlock";
import ResetPasswordScreen from "../blocks/reset-password/src/ResetPasswordBlock";
import DiscoverScreen from "../blocks/discover/src/DiscoverBlock";
import DiscoverAllScreen from "../blocks/discover-all/src/DiscoverAllBlock";
import OffersScreen from "../blocks/offers/src/OffersBlock";
import SpecialistDetailsScreen from "../blocks/specialist-details/src/SpecialistDetailsBlock";
import OfferDetailScreen from "../blocks/offer-detail/src/OfferDetailBlock";
import ProfilesScreen from "../blocks/profiles/src/ProfilesBlock";
import AccountInformationScreen from "../blocks/account-information/src/AccountInformationBlock";
import InviteFriendsScreen from "../blocks/invite-friends/src/InviteFriendsBlock";
import HomeScreen from '../components/src/HomeScreen';
import InfoPage from '../blocks/info-page/src/InfoPageBlock';
import CountryCodeSelector from '../blocks/country-code-selector/src/CountryCodeSelector';
import CountryCodeSelectorTable from '../blocks/country-code-selector/src/CountryCodeSelectorTable';
import Filteritems from '../blocks/filteritems/src/Filteritems';
import Reviews from '../blocks/reviews/src/Reviews';
import Dashboard from '../blocks/dashboard/src/Dashboard';
import Appointmentmanagement from '../blocks/appointmentmanagement/src/Appointmentmanagement';
import AppointmentsOngoingHistory from '../blocks/appointments-ongoing-history/src/AppointmentsOngoingHistoryBlock';
import NearbyScreen from '../blocks/nearby/src/NearbyBlock';
import Themes from '../blocks/themes/src/Themes';
import EmailAccountLoginBlock from '../blocks/email-account-login/src/EmailAccountLoginBlock';
import Calendar from '../blocks/calendar/src/Calendar';
import Emailnotifications from '../blocks/emailnotifications/src/Emailnotifications';
import Languageoptions from '../blocks/languageoptions/src/Languageoptions';
import Pushnotifications from '../blocks/pushnotifications/src/Pushnotifications';
import Paymentadmin from '../blocks/paymentadmin/src/Paymentadmin';
import Itemavailability from '../blocks/itemavailability/src/Itemavailability';
import Catalogue from '../blocks/catalogue/src/Catalogue';
import EmailAccountRegistration from '../blocks/email-account-registration/src/EmailAccountRegistration';
import Shoppingcart from '../blocks/shoppingcart/src/Shoppingcart';
import ForgotPassword from '../blocks/forgot-password/src/ForgotPassword';
import ForgotPasswordOTP from '../blocks/forgot-password/src/ForgotPasswordOTP';
import NewPassword from '../blocks/forgot-password/src/NewPassword';
import Profilebio from '../blocks/profilebio/src/Profilebio';
import OTPInputAuth from '../blocks/otp-input-confirmation/src/OTPInputAuth';
import Searchengineoptimisationseo from '../blocks/searchengineoptimisationseo/src/Searchengineoptimisationseo';
import Location from '../blocks/location/src/Location';
import Payments from '../blocks/payments/src/Payments';
import Multiplecurrencysupport from '../blocks/multiplecurrencysupport/src/Multiplecurrencysupport';
import Housepricesarviewer from '../blocks/housepricesarviewer/src/Housepricesarviewer';
import Salesreporting from '../blocks/salesreporting/src/Salesreporting';
import Scheduling from '../blocks/scheduling/src/Scheduling';

import COLORS from '../framework/src/Colors';
import StorageProvider from '../framework/src/StorageProvider';
import {setNavigator} from '../framework/src/Helpers';

/**
const HomeStack = createStackNavigator({
  OnboardScreen: { screen: OnboardScreen, navigationOptions: { header: null, title: "Onboard" } },
  EmailLoginScreen: { screen: EmailLoginScreen, navigationOptions: { header: null, title: "EmailLoginScreen" } },
  ResetPasswordScreen: { screen: ResetPasswordScreen, navigationOptions: { header: null, title: "ResetPasswordScreen" } },
  VerificationScreen: { screen: VerificationScreen, navigationOptions: { header: null, title: "VerificationScreen" } },
  DiscoverScreen: { screen: DiscoverScreen, navigationOptions: { header: null, title: "Discover" } },
  DiscoverAllScreen: { screen: DiscoverAllScreen, navigationOptions: { header: null, title: "Discover All" } },
  OfferDetailScreen: { screen: OfferDetailScreen, navigationOptions: { header: null, title: "Offer Detail" } },
  SpecialistDetailsScreen: { screen: SpecialistDetailsScreen, navigationOptions: { header: null, title: "Specialist Details" } },
  OffersScreen: { screen: OffersScreen, navigationOptions: { header: null, title: "Offers" } },
  ProfilesScreen: { screen: ProfilesScreen, navigationOptions: { header: null, title: "Profiles" } },
  AccountInformationScreen: { screen: AccountInformationScreen, navigationOptions: { header: null, title: "Account Information" } },
  Home: {screen: HomeScreen, navigationOptions: {header: null, title: 'Home'}},
  CountryCodeSelector: {
    screen: CountryCodeSelector,
    navigationOptions: {title: 'CountryCodeSelector'},
  },
  CountryCodeSelectorTable: {
    screen: CountryCodeSelectorTable,
    navigationOptions: {title: 'CountryCodeSelectorTable'},
  },
  Filteritems: {screen: Filteritems, navigationOptions: {title: 'Filteritems'}},
  Reviews: {screen: Reviews, navigationOptions: {title: 'Reviews'}},
  Dashboard: {screen: Dashboard, navigationOptions: {title: 'Dashboard'}},
  Appointmentmanagement: {
    screen: Appointmentmanagement,
    navigationOptions: {title: 'Appointmentmanagement'},
  },
  Themes: {screen: Themes, navigationOptions: {title: 'Themes'}},
  EmailAccountLoginBlock: {
    screen: EmailAccountLoginBlock,
    navigationOptions: {title: 'EmailAccountLoginBlock'},
  },
  Calendar: {screen: Calendar, navigationOptions: {title: 'Calendar'}},
  Emailnotifications: {
    screen: Emailnotifications,
    navigationOptions: {title: 'Emailnotifications'},
  },
  Languageoptions: {
    screen: Languageoptions,
    navigationOptions: {title: 'Languageoptions'},
  },
  Pushnotifications: {
    screen: Pushnotifications,
    navigationOptions: {title: 'Pushnotifications'},
  },
  Paymentadmin: {
    screen: Paymentadmin,
    navigationOptions: {title: 'Paymentadmin'},
  },
  Itemavailability: {
    screen: Itemavailability,
    navigationOptions: {title: 'Itemavailability'},
  },
  Catalogue: {screen: Catalogue, navigationOptions: {title: 'Catalogue'}},
  EmailAccountRegistration: {
    screen: EmailAccountRegistration,
    navigationOptions: {header: null, title: 'EmailAccountRegistration'},
  },
  Shoppingcart: {
    screen: Shoppingcart,
    navigationOptions: {title: 'Shoppingcart'},
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {header: null, title: 'ForgotPassword'},
  },
  ForgotPasswordOTP: {
    screen: ForgotPasswordOTP,
    navigationOptions: {title: 'ForgotPasswordOTP'},
  },
  NewPassword: {screen: NewPassword, navigationOptions: {title: 'NewPassword'}},
  Profilebio: {screen: Profilebio, navigationOptions: {title: 'Profilebio'}},
  OTPInputAuth: {
    screen: OTPInputAuth,
    navigationOptions: {title: 'OTPInputAuth'},
  },
  Searchengineoptimisationseo: {
    screen: Searchengineoptimisationseo,
    navigationOptions: {title: 'Searchengineoptimisationseo'},
  },
  Location: {screen: Location, navigationOptions: {title: 'Location'}},
  Payments: {screen: Payments, navigationOptions: {title: 'Payments'}},
  Multiplecurrencysupport: {
    screen: Multiplecurrencysupport,
    navigationOptions: {title: 'Multiplecurrencysupport'},
  },
  Housepricesarviewer: {
    screen: Housepricesarviewer,
    navigationOptions: {title: 'Housepricesarviewer'},
  },
  Salesreporting: {
    screen: Salesreporting,
    navigationOptions: {title: 'Salesreporting'},
  },
  Scheduling: {screen: Scheduling, navigationOptions: {title: 'Scheduling'}},
  InfoPage: {screen: InfoPage, navigationOptions: {title: 'Info'}},
});

*/
/**New NAvigation */
const DiscoverStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

export function PrimaryNavigator() {
	return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="OnboardScreen" component={OnboardScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen name="EmailLoginScreen" component={EmailLoginScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}
        options={{
          title: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen name="EmailAccountRegistration" component={EmailAccountRegistration}
        options={{
          title: "",
          headerShown: false,
          // headerLeft: (props) => (
          //   <HeaderBackButton
          //     {...props}
          //     onPress={() => {
          //       // Do something
          //     }}
          //   />
          // ),
        }}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen}
        options={{
          title: "",
          headerShown: false
        }}
      />
    </Stack.Navigator>
	)
}

function DiscoverStackNavigator() {
  return (
    <DiscoverStack.Navigator 
      initialRouteName="DiscoverScreen"
    >
      <DiscoverStack.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      <DiscoverStack.Screen
        name="OffersScreen"
        component={OffersScreen}
        options={{ headerShown: false }}
      />
    </DiscoverStack.Navigator>
  );
}

function TabNavigator() {
	return (
    <Tab.Navigator
      initialRouteName="DiscoverStackNavigator"
      tabBarOptions={{
        activeTintColor: COLORS.black,
        inactiveTintColor: COLORS.inputIcon,
      }}
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      <Tab.Screen
        name="DiscoverStackNavigator"
        component={DiscoverStackNavigator}
        options={{
          title: "",
          //headerShown: false,
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="earth" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="NearByScreen" 
        component={NearbyScreen}
        options={{
          title: "",
          //headerShown: false,
          tabBarLabel: 'Nearby',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="AppointmentScreen"
        component={AppointmentsOngoingHistory}
        options={{
          title: "",
          //headerShown: false,
          tabBarLabel: 'Appointment',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar-day" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="ProfilesScreen" component={ProfilesScreen}
        options={{
          title: "",
          //headerShown: false,
          tabBarLabel: 'Profiles',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
	)
}

export function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="DiscoverAllScreen"
        component={DiscoverAllScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SpecialistDetailsScreen"
        component={SpecialistDetailsScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="OfferDetailScreen"
        component={OfferDetailScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="AccountInformationScreen"
        component={AccountInformationScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="InviteFriendsScreen"
        component={InviteFriendsScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="BookAppointmentScreen"
        component={Appointmentmanagement}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="AppointmentPaymentScreen"
        component={Payments}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />
      {/*<AuthStack.Screen
        name="MobileSalonScreen"
        component={MobileSalonScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
        options={{headerShown: false}}
      />*/}
    </AuthStack.Navigator>
  );
}

let isUserLoggedinFlag = false;
const isUserLoggedin = async() => {
  const authToken = await StorageProvider.get('authToken') || '';
	console.log('authToken', authToken);
	isUserLoggedinFlag = authToken ? true : false;
}
isUserLoggedin();


const RootStackNav = () => {
  return(
		<Stack.Navigator
			screenOptions={{
				gestureEnabled: true,
				//stackPresentation: "modal",
			}}
			initialRouteName={isUserLoggedinFlag ? "authStack" : "primaryStack"}
		>
			<Stack.Screen
				name="primaryStack"
        component={PrimaryNavigator}
        options={{
          headerShown: false,
        }}
			/>
			<Stack.Screen
				name="authStack"
        component={AuthNavigator}
        options={{
          headerShown: false,
        }}
			/>
		</Stack.Navigator>
	)
}

if (!HomeScreen.instance) {
  const defaultProps = {
    navigation: null,
    id: "OnboardScreen"
  };
  const homeScreen = new HomeScreen(defaultProps);
}

export function App() {
  const [initializing, setInitializing] = useState(true);

  let navigationRef = useRef();

  const setNavRef = (ref) => {
    console.log('setNavRef', ref);
    setNavigator(ref);
    navigationRef = ref;
  }

  async function authChanged (){
    if (initializing)
    setTimeout(() => {
      setInitializing(false);
    }, 3000);
  }
  
  useEffect(() => {
    authChanged();
  }, []);

  if (initializing)
    return (
      <SplashScreen />
    );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        ref={(ref) => {setNavRef(ref)}}
        // onReady={() => {
        //   if(navigationRef && navigationRef.getCurrentRoute()){
        //     routeNameRef.current = navigationRef.getCurrentRoute().name
        //   }
        // }}
        // onStateChange={onNavigationStateChange}
      >
        <RootStackNav />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})

YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "VirtualizedLists should never",
  "componentWillReceiveProps is deprecated",
  "Require cycle:",
  "Failed prop type",
  "Picker has been",
  "Animated:",
  "Can't perform",
  "prop has been",
  "Listitem"
]);
