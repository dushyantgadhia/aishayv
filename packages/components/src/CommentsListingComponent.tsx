import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {Avatar} from 'react-native-elements';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import COLORS from "../../framework/src/Colors";
import CommonStyle from "../../framework/src/CommonStyle";
import { isEmpty } from "../../framework/src/Helpers";


interface Props {
  reviewsList: Array<any>;
  itemObj: object;
  itemIndex: number;
}


export default class CommentsListingComponent extends Component <Props> {

  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const {reviewsList, itemObj, itemIndex} = this.props;
    return (
      <View
				style={[
					styles.commentBox, reviewsList.length > 1 && itemIndex == 0 && styles.noBorderBottom,
					reviewsList.length > 1 && itemIndex + 1 == reviewsList.length && styles.noBorderTop,
					reviewsList.length > 1 && itemIndex > 0 && itemIndex + 1 < reviewsList.length && styles.noBorder,
				]}
			>
				<View style={[CommonStyle.rowStyle, styles.commentBoxRow]}>
					<View style={styles.avtarSec}>
						<Avatar
							size={44}
							rounded
							title=""
							overlayContainerStyle={{ backgroundColor: COLORS.inputLabel }}
							activeOpacity={0.7}
						/>
					</View>
					<View style={styles.commenterSec}>
						<Text style={styles.commenterName}>{itemObj.name ? itemObj.name : ''}</Text>
						<Text style={styles.commentTime}>{itemObj.created ? moment(itemObj.created).fromNow()+'.' : ''}</Text>
					</View>
					<View style={styles.commentBoxRatingSec}>
						<View style={[CommonStyle.rowStyle, CommonStyle.alignItemsCenter]}>
							<Text style={[styles.ratingText]}>{itemObj.rating + ' '}</Text>
							<FontAwesome
								name='star'
								size={16}
								color={COLORS.orange}
							/>
						</View>
					</View>
				</View>
				{!isEmpty(itemObj.comment) && <Text style={styles.commentTextStyle}>{itemObj.comment}</Text>}
			</View>
    );
  }
  static defaultProps = {
    reviewsList: [],
    itemObj: {},
  };
}

const styles = StyleSheet.create({
  commentBox:{
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  commentBoxRow:{
    marginVertical: 15
  },
  noBorder:{
    borderRadius: 0
  },
  noBorderTop:{
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  noBorderBottom:{
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  avtarSec:{
    width: '15%'
  },
  commenterSec:{
    width: '70%',
    //paddingHorizontal: 15,
    justifyContent: "center"
  },
  commentBoxRatingSec:{
    width: '15%',
    alignItems: 'flex-end'
  },
  commenterName:{
    fontSize:15,
    fontWeight:'bold',
    color: COLORS.inputValue
  },
  commentTime:{
    fontSize:12,
    textTransform: 'capitalize',
    color: COLORS.inputValue
  },
  commentTextStyle:{
    marginBottom:15,
    fontSize:15,
    color: COLORS.inputValue
  },
  ratingText:{
    fontSize: 15,
    color: COLORS.black
  }
});


