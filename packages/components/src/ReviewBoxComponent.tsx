import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import StarRating from 'react-native-star-rating';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from "../../framework/src/Colors";
import CommonStyle from "../../framework/src/CommonStyle";
import i18n from "../../framework/src/config/i18n";


interface Props {
  setRatingFunc: Function;
  handleInputChange: Function;
  submitReviewFunc: Function;
  reviewQuestion: string;
  maxRatingValue: number|string;
  selectedRatingValue: number;
  inputs: object;
  commentValue: string;
  containerStyle: object|Array<any>;
}


export default class ReviewBoxComponent extends Component <Props> {

  // Customizable Area Start
  inputs: object = {};
  // Customizable Area End

  constructor(props: Props) {
    super(props);
  }
  
  render() {
    return (
      <View style={[styles.reviewBox,this.props.containerStyle]}>
        <Text style={styles.reviewTitle}>{i18n.t('YourReview')}</Text>
        <Text style={styles.reviewQue}>{this.props.reviewQuestion}</Text>
        <View style={[CommonStyle.rowStyle, { justifyContent: 'center' }]}>
          <View style={styles.ratingSec}>
            <StarRating
              disabled={false}
              maxStars={this.props.maxRatingValue}
              rating={this.props.selectedRatingValue}
              selectedStar={(rating:any) => this.props.setRatingFunc(rating)}
              emptyStarColor={COLORS.inactiveIndicator}
              fullStarColor={COLORS.orange}
              starStyle={{ marginHorizontal: 7.5 }}
              starSize={32}
              iconSet={'FontAwesome'}
              emptyStar={'star'}
              fullStar={'star'}
            />
          </View>
        </View>
        <View style={[CommonStyle.rowStyle, CommonStyle.spaceBetween]}>
          <TextInput
            placeholder='Say something...'
            ref={input => {
              this.props.inputs.comment = input;
            }}
            //lineWidth={0}
            //activeLineWidth={0}
            value={this.props.commentValue}
            placeholderTextColor={COLORS.ReviewBlack}
            style={styles.commentInputStyle}
            onChangeText={(val:any) => this.props.handleInputChange("comment", val)}
            //containerStyle={styles.commentContainerStyle}
            multiline
          />
          <Button
            icon={<Ionicons name='send' size={24} color={COLORS.white} />}
            buttonStyle={styles.sendButtonStyle}
            containerStyle={styles.sendContainerStyle}
            onPress={() => this.props.submitReviewFunc()}
          />
        </View>
      </View>
    )
  }
  static defaultProps = {
    setRatingFunc: () => {},
    handleInputChange: () => {},
    submitReviewFunc: () => {},
    reviewQuestion: '',
    maxRatingValue: '',
    selectedRatingValue: 4,
    inputs: {},
    commentValue: '',
    containerStyle: {}
  };
}

const styles = StyleSheet.create({
  reviewBox:{
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop:24,
    paddingBottom:19,
    justifyContent:'center'
  },
  reviewTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.ReviewBlack
  },
  reviewQue:{
    fontSize: 15,
    paddingTop:13,
    textAlign: 'center',
    color: COLORS.ReviewBlack
  },
  ratingSec:{
    marginTop: 30,
    marginBottom: 46
  },
  commentContainerStyle:{
    width:'80%',
  },
  commentInputStyle:{
    width:'80%',
    justifyContent:'center',
    backgroundColor: COLORS.inactiveIndicator,
    minHeight: 50,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 15,
    color: COLORS.ReviewBlack
  },
  sendContainerStyle:{
    width:'15%'
  },
  sendButtonStyle:{
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.black
  }
});


