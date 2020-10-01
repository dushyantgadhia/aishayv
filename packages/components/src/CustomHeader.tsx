import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from "../../framework/src/Colors";
import CommonStyle from "../../framework/src/CommonStyle";
import { isEmpty } from "../../framework/src/Helpers";


interface Props {
  onBackPressFunc: Function;
  backButtonEnabled: Boolean;
  rightComponentEnabled: Boolean;
  centerComponentEnabled: Boolean;
  headerTitle: string;
  iconTintColor: string;
  rightComponent: any;
  centerComponent: any;
  containerStyle: object|Array<any>;
  leftComponentStyle: object|Array<any>;
  titleComponentStyle: object|Array<any>;
  titleTextStyle: object|Array<any>;
  rightComponentStyle: object|Array<any>;
}


export default class CustomHeader  extends Component <Props> {

  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const {
      backButtonEnabled,
      onBackPressFunc,
      headerTitle,
      iconTintColor,
      containerStyle,
      leftComponentStyle,
      rightComponentStyle,
      rightComponentEnabled,
      centerComponentEnabled,
      rightComponent,
      centerComponent,
      titleComponentStyle,
      titleTextStyle
    } = this.props;
    return (
      <View style={[styles.headerContainer, CommonStyle.rowStyle, containerStyle]}>
        <View style={[styles.leftSection, leftComponentStyle]}>
          {backButtonEnabled &&
            <Ionicons
              name='arrow-back'
              size={25}
              color={iconTintColor}
              onPress={() => onBackPressFunc()}
            />
          }
        </View>
        <View style={[styles.titleSection, titleComponentStyle]}>
          {!isEmpty(headerTitle) ?
            <Text style={[styles.headerTitleText, titleTextStyle]}>{headerTitle}</Text>
            : centerComponentEnabled ?
              <View>{centerComponent}</View>
              : <View />
          }
        </View>
        {rightComponentEnabled &&
          <View style={[styles.rightSection, rightComponentStyle]}>
            {rightComponent}
          </View>
        }
      </View>
    )
  }
  static defaultProps = {
    onBackPressFunc: () => {},
    backButtonEnabled: false,
    centerComponentEnabled: false,
    rightComponentEnabled: false,
    headerTitle:'',
    iconTintColor: COLORS.white,
    rightComponent: (<View/>),
    centerComponent: (<View/>),
    containerStyle: {},
    leftComponentStyle: {},
    titleComponentStyle: {},
    titleTextStyle: {},
    rightComponentStyle: {}
  };
}

const styles = StyleSheet.create({
  headerContainer: {
    height: '10%',
    width: '100%',
    //paddingHorizontal:15,
    backgroundColor: COLORS.black
  },
  leftSection:{
    width:'15%',
    justifyContent:'center',
    alignItems:'center',
  },
  titleSection:{
    width:'70%',
    justifyContent:'center',
    alignItems:'center',
  },
  rightSection:{
    width:'15%',
    justifyContent:'center',
    alignItems:'center',
  },
  headerTitleText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.inputValue
  }
});


