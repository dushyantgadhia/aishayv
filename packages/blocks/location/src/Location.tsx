import React from "react";
import { StyleSheet, View, Platform, TextInput, Text, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import {FlatList as GestureFlatList, TouchableOpacity as GHTouchableOpacity} from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';


import GenericMap from "../../../components/src/GenericMap";

import LocationController, { Props } from "./LocationController";
import COLORS from "../../../framework/src/Colors";
import { deviceHeight, heightFromPercentage } from "../../../framework/src/Helpers";
import CommonStyle from "../../../framework/src/CommonStyle";

export default class Location extends LocationController {
  constructor(props: Props) {
    super(props);
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.headerSection}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
        <View style={[styles.searchSection, styles.shadow]}>
          <FontAwesome5 style={styles.searchIcon} name="search" size={20} color={COLORS.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={this.state.searchText}
            onFocus={() => {
              this.bs.current.snapTo(1);
            }}
            onSubmitEditing={() => {
              this.state.searchText ? this.bs.current.snapTo(2) : '';
            }}
            onChangeText={(searchText:string) => { this.onSearchChange(searchText) }}
            underlineColorAndroid="transparent"
          />
          <Ionicons style={styles.crossIcon} name="close-circle-sharp" size={20} color={this.state.searchText ? COLORS.black : COLORS.white} onPress={() => this.clearSearchText()} />
        </View>
      </View>
      <View style={styles.searchResultSection}>
        {this.renderSearchResult({item: this.state.region})}
        <GestureFlatList
          showsVerticalScrollIndicator={false}
          legacyImplementation={false}
          data={this.state.predictions}
          renderItem={(item:any) => this.renderSearchResult(item)}
          keyExtractor={(item:any) => item.place_id + '_'}
          //ItemSeparatorComponent={this.itemSeparatorComponentForSearch}
        />
      </View>
    </View>
  )

  renderSearchResult = (itemObj:any) => {
    console.log('renderSearchResult', itemObj);
    return(
      <TouchableOpacity onPress={() => this._onPlaceSelected(itemObj.item.place_id, itemObj.item.type || '')}>
      <View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter, {padding:15, borderBottomWidth:1, borderBottomColor: COLORS.inputLabel}]}>
        {itemObj.item.type == 'current' ? 
          <View style={[CommonStyle.centerStyle,{width:30, height: 30, borderRadius:30, backgroundColor: COLORS.black}]}>
            <FontAwesome name="send" size={15} color={COLORS.white} />
          </View> :
          <View style={[CommonStyle.centerStyle,{width:30, height: 30, borderRadius:30, backgroundColor: COLORS.inactiveIndicator}]}>
            <Ionicons name="location-sharp" size={15} color={COLORS.black} />
          </View>
        }
        {itemObj.item.structured_formatting && <View style={{marginHorizontal: 24}}>
          <Text style={{fontSize: 15, color: COLORS.black, fontWeight: 'bold'}} numberOfLines={1}>{itemObj.item.structured_formatting.main_text}</Text>
          <Text style={{fontSize: 12, color: COLORS.inputValue}} numberOfLines={1}>{itemObj.item.structured_formatting.secondary_text}</Text>
        </View>}
      </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={this.bs}
          snapPoints={['90%', 250]}
          renderContent={this.renderInner}
          //overdragResistanceFactor={200}
          enabledContentGestureInteraction={true}
          enabledGestureInteraction={true}
          enabledInnerScrolling={true}
          //enabledContentTapInteraction={true}
          initialSnap={1}
        />
        <MapView
          // provider={PROVIDER_GOOGLE}
          ref={mapView => (this._map = mapView)}
          style={styles.mapView}
          region={this.state.region}
          showsMyLocationButton={true}
          showsUserLocation={false}
          onPress={({nativeEvent}) => this._setRegion(nativeEvent.coordinate)}
          //onRegionChange={this._onMapRegionChange}
          //onRegionChangeComplete={this._onMapRegionChangeComplete}
        />
        {/*
        <GenericMap {...this.mapProps()} />
        */}
      </View>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView:{width:'100%', height: '100%'},
  panel: {
    height: deviceHeight - heightFromPercentage(10),
    marginHorizontal:15
  },
  headerSection: {
    backgroundColor: COLORS.white,
    //marginHorizontal:15,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom:15,
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
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  searchIcon: {
    padding: 10,
  },
  crossIcon: {
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
  searchResultSection:{
    flex:1,
    backgroundColor: COLORS.white
  }
});
