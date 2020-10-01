import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  // Customizable Area Start
  // Customizable Area End
} from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import i18n from '../../framework/src/config/i18n';
import {SHAVY_LOGO_SLOGAN, SHAVY_VAN} from './assets';
import COLORS from "../../framework/src/Colors";

interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface S { }

interface SS { }

class SplashScreen extends BlockComponent<Props, S, SS> {

  static instance:SplashScreen;

  constructor(props: Props) {
    super(props);
    SplashScreen.instance = this;
  }

  render() {
    const { navigation } = this.props;
    const _this = this;

    return (
      <View style={styles.container}>
          <View style={styles.splashWrapper}>
            <View style={styles.splashTopSection}>
              <View style={styles.slogonSection}>
                <Image
                  source={SHAVY_LOGO_SLOGAN}
                  //style={styles.logoImage}
                />
              </View>
              <View style={styles.facilitySection}>
                <Text style={styles.text}>{i18n.t('Haircuts')}</Text>
                <View style={styles.dotStyle} />
                <Text style={styles.text}>{i18n.t('Styles')}</Text>
                <View style={styles.dotStyle} />
                <Text style={styles.text}>{i18n.t('Facial')}</Text>
              </View>
            </View>
            <View style={styles.splashBottomSection}>
              <Image
                source={SHAVY_VAN}
                //style={styles.logoImage}
              />
            </View>
          </View>
        </View>
    );
  }
}
// Customizable Area End

// Customizable Area Start

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: Platform.OS === "web" ? '100vh' : 'auto',
    backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1,backgroundColor:'pink'
  },
  splashWrapper:{
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: COLORS.black
  },
  splashTopSection:{
    height:'65%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black
  },
  splashBottomSection:{
    height:'35%',
    width:'100%',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  slogonSection:{
    height:'90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  facilitySection:{
    flexDirection:'row',
    alignItems:'center'
  },
  text:{
    fontSize: 14,
    color: COLORS.white
  },
  dotStyle:{
    backgroundColor: COLORS.white,
    width: 5,
    height: 5,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    //marginTop: 3,
    //marginBottom: 3
  },
  logoImage:{
    height:'100%',
    width: '100%',
    resizeMode: 'cover'
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  instructions: {
    textAlign: "center",
    color: "#6200EE",
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,

    padding: 10
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 15,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#00000000',
    padding: 18,
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'normal'
  }
});
// Customizable Area End
export default SplashScreen;