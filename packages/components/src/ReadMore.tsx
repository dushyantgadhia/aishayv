import React, { Component } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from "react-native";

interface Props {
  renderViewMore: Function;
  renderViewLess: Function;
  afterCollapse: Function;
  afterExpand: Function;
  numberOfLines: number;
  readMoreLabel: string;
  readLessLabel: string;
  textStyle: object|Array<any>;
  readMoreTextStyle: object|Array<any>;
}

interface S {
  // Customizable Area Start
  isFulltextShown: boolean;
  numberOfLines: any;
  // Customizable Area End
}


export default class ReadMore extends Component <Props, S> {

  // Customizable Area Start
  resendConfirmationApiCallId: any;
  trimmedTextHeight: any = null;
  fullTextHeight: any = null;
  shouldShowMore: boolean = false;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.state = {
      isFulltextShown: true,
      numberOfLines: this.props.numberOfLines
    };
  }

  hideFullText = () => {
    if (
      this.state.isFulltextShown &&
      this.trimmedTextHeight &&
      this.fullTextHeight
    ) {
      this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;
      this.setState({
        isFulltextShown: false
      });
    }
  };

  onLayoutTrimmedText = (event: any) => {
    const { height } = event.nativeEvent.layout;

    this.trimmedTextHeight = height;
    this.hideFullText();
  };

  onLayoutFullText = (event: any) => {
    const { height } = event.nativeEvent.layout;

    this.fullTextHeight = height;
    this.hideFullText();
  };

  onPressMore = () => {
    this.setState(
      {
        numberOfLines: null
      },
      () => {
        this.props.afterExpand();
      }
    );
  };

  onPressLess = () => {
    this.setState(
      {
        numberOfLines: this.props.numberOfLines
      },
      () => {
        this.props.afterCollapse();
      }
    );
  };

  getWrapperStyle = () => {
    if (this.state.isFulltextShown) {
      return styles.transparent;
    }
    return {};
  };

  renderViewMore = () => (
    <Text style={[styles.viewMoreText, this.props.readMoreTextStyle]} onPress={this.onPressMore}>
      {this.props.readMoreLabel}
    </Text>
  );

  renderViewLess = () => (
    <Text style={[styles.viewMoreText, this.props.readMoreTextStyle]} onPress={this.onPressLess}>
      {this.props.readLessLabel}
    </Text>
  );

  renderFooter = () => {
    const { numberOfLines } = this.state;

    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.props.renderViewMore || this.renderViewMore)(
          this.onPressMore
        );
      }
      return (this.props.renderViewLess || this.renderViewLess)(
        this.onPressLess
      );
    }
    return null;
  };

  renderFullText = () => {
    if (this.state.isFulltextShown) {
      return (
        <View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      );
    }
    return null;
  };
  
  render() {
    return (
      <View style={this.getWrapperStyle()}>
        <View onLayout={this.onLayoutTrimmedText}>
          <Text
            style={this.props.textStyle}
            numberOfLines={this.state.numberOfLines}
          >
            {this.props.children}
          </Text>
          {this.renderFooter()}
        </View>

        {this.renderFullText()}
      </View>
    )
  }

  static propTypes = {
    numberOfLines: PropTypes.number.isRequired
  };

  static defaultProps = {
    afterCollapse: () => {},
    afterExpand: () => {},
    readMoreLabel: 'Read More',
    readLessLabel: 'Read Less',
    textStyle: {},
    readMoreTextStyle: {}
  };
}

const styles = StyleSheet.create({
  fullTextWrapper: {
    opacity: 0,
    position: "absolute",
    left: 0,
    top: 0
  },
  viewMoreText: {
    color: "#888"
  },
  transparent: {
    opacity: 0
  }
});


