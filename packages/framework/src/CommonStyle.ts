import { StyleSheet, Platform } from "react-native";
import COLORS from './Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  wrapper: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  headerContainer:{
    backgroundColor:COLORS.black,
    height: '10%',
  },
  authHeader:{
    height:'10%',
    backgroundColor: COLORS.white
  },
  formContainer: {
    width: "80%"
  },
  textAlignCenter:{
    textAlign: 'center'
  },
  labelTextStyle: {
    //fontSize: 16,
    color: COLORS.inputLabel
  },
  error: {
    color: COLORS.red,
    fontSize: 14
  },
  scrollStyle: {
    width: "100%"
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center"
  },
  shadowStyle: {
    shadowOffset:
      Platform.OS === "ios"
        ? { width: 0, height: 1 }
        : { width: 0, height: 2 },
    shadowColor: COLORS.inputLabel,
    shadowOpacity: 0.9,
    shadowRadius: Platform.OS === "ios" ? 3 : 5,
    elevation: 5
  },
  boxShadowStyle: {
    backgroundColor: COLORS.white,
    marginHorizontal:2,
    marginVertical:1,
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
  toastModal: {
    borderRadius: 20,
    marginHorizontal: 15,
    paddingHorizontal: '12%',
    paddingVertical: 100,
    alignContent: "center",
    justifyContent: "center",
  },
  clearModal: {
    borderRadius: 5,
    marginHorizontal: 50,
    height: 220,
    backgroundColor: COLORS.red
  },
  productDetailImageModal: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.red,
    height: 280,
    width: 280,
    backgroundColor: COLORS.white,
    alignSelf: "center"
  },
  imageThumb: {
    resizeMode: "contain",
    width: "100%",
    height: "100%"
  },
  flexContainer: {
    flex: 1,
    width: "100%"
  },
  rowStyle: {
    flexDirection: "row"
  },
  flexStart: {
    justifyContent: "flex-start"
  },
  flexEnd: {
    justifyContent: "flex-end"
  },
  jCCenter: {
    justifyContent: "center"
  },
  spaceBetween: {
    justifyContent: "space-between",    
  },
  alignItemsCenter:{
    alignItems: "center"
  },
  styleCenter: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  centerStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  width100P:{
    width: '100%'
  },
  subView: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  emptyList: {
    alignItems: "center",
    marginTop: 100
  },
  emptyListFilter: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100
  },
  crossIconView: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: 20,
    height: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  backIconView: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: 30,
    height: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  crossImage: {
    tintColor: COLORS.red,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  searchTextInput: {
    width: "80%"
  },
  errorReport: {
    width: "70%",
    color: COLORS.red,
    fontSize: 15,
    marginLeft: "28.8%"
  },
  margin5P:{
    marginTop:'5%'
  },
  margin10P:{
    marginTop:'10%'
  },
  margin15P:{
    marginTop:'15%'
  },
  margin20P:{
    marginTop:'20%'
  },
  margin25P:{
    marginTop:'25%'
  },
  margin30P:{
    marginTop:'30%'
  },
  margin35P:{
    marginTop:'35%'
  },
  margin40P:{
    marginTop:'40%'
  }
});
