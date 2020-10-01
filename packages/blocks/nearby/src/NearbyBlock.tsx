import React from "react";
import { SearchBar } from 'react-native-elements';
//import { OutlinedTextField } from 'react-native-material-textfield';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from "reanimated-bottom-sheet";
import {FlatList as GestureFlatList, TouchableOpacity as GHTouchableOpacity} from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from "react-native";

import NearbyController, {
  Props
} from "./NearbyController";

import COLORS from "../../../framework/src/Colors";
import i18n from '../../../framework/src/config/i18n';
import CommonStyle from "../../../framework/src/CommonStyle";
import GenericMap from "../../../components/src/GenericMap";
import GenericCard from "../../../components/src/GenericCard";
import { calculateDelta, deviceHeight, heightFromPercentage, isEmpty, widthFromPercentage } from "../../../framework/src/Helpers";
import {imgMarkerPath} from './assets';

const suggestionsSalon = [
	{id:1, name: 'Brett Gomez Salon', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '4.5 Km', rating: 4.5},
	{id:2, name: 'Gomez Salon', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '5 Km', rating: 4.0},
	{id:3, name: 'Max Petrosky Salon', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '6 Km', rating: 4.5},
	{id:4, name: 'Petrosky Salon', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '7.5 Km', rating: 4.0},
]

const searchSalonServices = [
	{id:1, name: 'Trevor Rice Salon', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '4.5 Km', rating: 4.5},
	{id:2, name: 'Lee Gomez Beauty Hair', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '5 Km', rating: 4.0},
	{id:3, name: 'Marguerite Cross Day Salon', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '6 Km', rating: 4.5},
	{id:4, name: 'Sue Poole House', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '7.5 Km', rating: 4.0},
	{id:5, name: 'Lou Becker Hair Studio', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '7.5 Km', rating: 4.0},
	{id:6, name: 'The Word of Women Salon', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '7.5 Km', rating: 4.0},
	{id:7, name: 'Tommy Henry Barber Shop', address: '817 Rebeca Lodge Suite, Chicago, Illinois, US.', distance: '7.5 Km', rating: 4.0}
]

export default class NearbyBlock extends NearbyController {
  constructor(props: Props) {
    super(props);
    
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View>
        <GestureFlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={suggestionsSalon}
          renderItem={item => this.renderSalonSuggestion(item)}
          keyExtractor={item => item.id + '_'}
        //ItemSeparatorComponent={this.itemSeparatorComponent}
        />
        {this.itemSeparatorComponentForSearch()}
      </View>
      <View style={styles.headerSection}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
        <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter, styles.addressWrap]}>
          <FontAwesome5
            name="map-marker-alt"
            color={COLORS.inactiveIndicator} size={17}
            style={styles.smallIconWrap}
          />
          <Text style={styles.addressText} numberOfLines={1}>{this.state.address}</Text>
        </View>

        <View style={[styles.searchSection, styles.shadow]}>
          <FontAwesome5 style={styles.searchIcon} name="search" size={20} color={COLORS.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Find a salon, services,…"
            value={this.state.searchString}
            onFocus={() => {
              console.log('onFocus', this.bs);
              this.bs.current.snapTo(1);
            }}
            onSubmitEditing={() => {
              this.state.searchString ? this.bs.current.snapTo(2) : '';
            }}
            onChangeText={(searchText) => { this.onSearchChange(searchText) }}
            underlineColorAndroid="transparent"
          />
          <Ionicons style={styles.searchIcon} name="close-circle-sharp" size={20} color={this.state.searchString ? COLORS.black : COLORS.white} onPress={() => this.clearSearchText()} />
        </View>
      </View>
      <View style={styles.searchResultSection}>
        <GestureFlatList
          showsVerticalScrollIndicator={false}
          legacyImplementation={false}
          data={searchSalonServices}
          renderItem={item => this.renderSearch(item)}
          keyExtractor={item => item.id + '_'}
          ItemSeparatorComponent={this.itemSeparatorComponentForSearch}
        />
      </View>
    </View>
  )

  renderHeader = () => (
    <View>
      <View style={styles.locationHeader}>
        <View style={styles.nearYouWrap}>
          <Text style={styles.nearYouText}>
            {i18n.t('MobileSalonNearYou')}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            CommonStyle.centerStyle,
            styles.locationIconWrap
          ]}
          onPress={() => {this.backToLocation()}}
        >
          <Ionicons
            name={"filter-outline"}
            color={COLORS.black}
            size={22}
          />
        </TouchableOpacity>
      </View>
    </View>
  )

  bs = React.createRef();

  reusableBlock = (item:any) => {
    return (
      <TouchableOpacity style={[CommonStyle.rowStyle]} onPress={() => {}}>
        <View style={styles.salonIconWrapper} />
        <View style={styles.salonDetailWrapper}>
          <Text style={styles.listSalonText} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter]}>
            <Text style={styles.listAddressText} numberOfLines={1}>
              {item.address}
            </Text>
          </View>
          <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter]}>
            <Text style={styles.listratingDistText}>
              {item.rating}
            </Text>
            <FontAwesome
              name='star'
              size={14}
              color={COLORS.orange}
              style={{ marginLeft: 5 }}
            />
            <View style={styles.ratingDistWrap} />
            <Text style={styles.listratingDistText}>
              {item.distance}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  itemSeparatorComponent = () => {
		return <View style={styles.itemSeperator} />
  }

  renderSalonSuggestion = ({item, index}) => {
    return (
      <View style={[CommonStyle.rowStyle]}>
        {index == 0 && this.itemSeparatorComponent()}
        <View style={styles.salonItemWrapper}>
          {this.reusableBlock(item)}
        </View>
        {this.itemSeparatorComponent()}
      </View>
    );
  }

  itemSeparatorComponentForSearch = () => {
		return <View style={styles.itemSeperatorForSearch} />
  }

  renderSearch = ({item, index}) => {
    return (
      <View style={styles.searchItemWrapper}>
        {this.reusableBlock(item)}
      </View>
    );
  }  

  render() {
    const { address, currentLocation, initialRegion } = this.state;
		return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <View style={styles.container}>        
          <View style={styles.fullContainer}>
            <BottomSheet
              ref={this.bs}
              snapPoints={['90%', 250]}
              renderContent={this.renderInner}
              //renderHeader={this.renderHeader}
              //enabledManualSnapping
              //enabledBottomInitialAnimation
              //enabledBottomClamp
              //overdragResistanceFactor={200}
              enabledHeaderGestureInteraction={true}
              enabledContentGestureInteraction={true}
              enabledGestureInteraction={true}
              enabledInnerScrolling={true}
              //enabledContentTapInteraction={true}
              initialSnap={1}
            />
            {(currentLocation || initialRegion) && (<>
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                ref={(mapView:any) => (this._map = mapView)}
                initialRegion={this.state.initialRegion || {
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                  ...calculateDelta()
                }}
                showsUserLocation={true}
                showsMyLocationButton={false}
                onRegionChangeComplete={this.onMapRegionChangeComplete}                
              >                
                {this.state.markers.length > 0 && this.state.markers.map((item, index) => {
                  return (
                    <View key={"marker" + index}>
                      <Marker
                        coordinate={item.latLng}
                        image={imgMarkerPath}
                      >
                      </Marker>
                    </View>
                  );
                })
                }
              </MapView>
            </>)}
            {this.renderHeader()}
            {/*<View style={{position: 'absolute', bottom: 162}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                legacyImplementation={false}
                data={suggestionsSalon}
                renderItem={item => this.renderSalonSuggestion(item)}
                keyExtractor={item => item.id + '_'}
                //ItemSeparatorComponent={this.itemSeparatorComponent}
              />
            </View>*/}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
  keyboardPadding: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  fullContainer:{
    height: '100%',
    backgroundColor: COLORS.white,
  },
  locationHeader:{
    flexDirection:'row',
    justifyContent:'flex-end',
    position:'absolute',
    bottom: deviceHeight - heightFromPercentage(20),
    right: 15
  },
  nearYouWrap:{ width: '85%' },
  nearYouText:{ color: COLORS.inputValue, fontSize: 17, fontWeight: 'bold', textAlign: 'center' },
  locationIconWrap:{ backgroundColor: COLORS.white, width:36, height:36, borderRadius: 8 },
  salonItemWrapper: {
    //flex: 0.7,
    width:265,
    borderRadius: 8,
    padding: 15,
    backgroundColor: COLORS.white,
  },
  searchItemWrapper: {
    //flex: 0.7,
    //borderRadius: 8,
    //padding: 15,
    //backgroundColor: COLORS.white,
  },
  itemSeperator:{ width: 15 },
  itemSeperatorForSearch:{ height: 15 },
  salonIconWrapper: {
    backgroundColor: COLORS.inputLabel,
    width: 87,
    height: 68,
    marginRight: 10,
    borderRadius: 8,
  },
  salonDetailWrapper: {
    flex:1,
    flexDirection: "column",
    justifyContent: 'space-between'
  },
  listSalonText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.inputValue
  },
  listAddressText:{
    fontSize:12,
    color: COLORS.inputValue
  },
  listratingDistText:{
    fontSize:12,
    fontWeight: 'bold',
    color: COLORS.inputValue
  },
  ratingDistWrap:{
    marginHorizontal: 10,
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.inactiveIndicator
  },
  smallIconWrap:{paddingRight:5},
  addressWrap:{
    marginBottom:18
  },
  addressText:{
    fontSize:15,
    color: COLORS.inputValue,
  },
  searchSection: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
      padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: COLORS.white,
    color: '#424242',
  },
  shadow:{
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
    borderRadius:8,
  },
  search: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: deviceHeight - widthFromPercentage(10),
    //paddingVertical:10,
    //backgroundColor: COLORS.white,
    //borderTopLeftRadius: 20,
    //borderTopRightRadius: 20,
    //marginHorizontal:15
  },
  headerSection: {
    backgroundColor: COLORS.white,
    marginHorizontal:15,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom:15,
  },
  searchResultSection:{
    flex:1,
    backgroundColor: COLORS.borderColor,
    marginHorizontal:15,
    padding:15
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    width: '100%',
    height: 225,
    marginTop: 30,
  },
  map: {
    height: '100%',
    width: '100%',
  }
});
