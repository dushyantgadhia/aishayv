import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";

import GenericLabel from "./GenericLabel";

Geocoder.init("AIzaSyBNEtBI6JORVhaDuR8bk_k55D9tc-bJuhM");

interface Props {
  addresses: object[];
  onSelectAddress: (address: object) => void;
  showCurrentAddress: boolean;
}

const GenericMap: FunctionComponent<Props> = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState("");

  const sheetRef = useRef(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const statuses = await requestMultiple([
          PERMISSIONS.IOS.LOCATION_ALWAYS,
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        ]);
        if (
          statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED
        ) {
          getCurrentLocation();
        }
      } else {
        const statuses = await requestMultiple([
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ]);
        if (
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
            RESULTS.GRANTED &&
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED
        ) {
          getCurrentLocation();
        }
      }
    } catch {}
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      setCurrentLocation(info.coords);
      // getCurrentAddress(info.coords.latitude, info.coords.longitude);
    });
  };

  const getCurrentAddress = (lat: number, lng: number) => {
    Geocoder.from(lat, lng)
      .then((json) => {
        const addressComponent = json.results[0].address_components[0];
        setCurrentAddress(addressComponent);
      })
      .catch((error) => console.warn(error));
  };

  const renderBottomSheet = () => {
    const { addresses, showCurrentAddress, onSelectAddress } = props;
    return (
      <View style={styles.sheetMainCotainer}>
        <View style={styles.sheetContainer}>
          <View style={styles.addressContainer}>
            {addresses.map((address, index) => (
              <TouchableOpacity
                style={styles.addressWrapper}
                key={`ADDRESS_${index}`}
                onPress={() => onSelectAddress(address)}
              >
                <GenericLabel fontSize={15} lineHeight={18} fontWeight="bold">
                  {address.type}
                </GenericLabel>
                <GenericLabel
                  fontSize={12}
                  lineHeight={14}
                  color="rgb(46, 58, 89)"
                >
                  {address.label}
                </GenericLabel>
              </TouchableOpacity>
            ))}

            {showCurrentAddress && (
              <TouchableOpacity
                style={styles.addressWrapper}
                onPress={() => {
                  onSelectAddress({ label: currentAddress });
                }}
              >
                <GenericLabel fontSize={15} lineHeight={18} fontWeight="bold">
                  Current Location
                </GenericLabel>
                <GenericLabel
                  fontSize={12}
                  lineHeight={14}
                  color="rgb(46, 58, 89)"
                >
                  {currentAddress}
                </GenericLabel>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
      <BottomSheet
        ref={sheetRef}
        snapPoints={["70%", "90%", "100%"]}
        borderRadius={10}
        renderContent={renderBottomSheet}
      />
    </View>
  );
};

export default GenericMap;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  addressWrapper: {
    width: "100%",
    paddingBottom: 14,
    paddingHorizontal: 20,
    marginTop: 10,
    borderBottomColor: "rgba(140, 136, 175, 0.07)",
    borderBottomWidth: 1,
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetMainCotainer: {
    padding: 24,
    height: "100%",
    position: "relative",
  },
  addressContainer: {
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
