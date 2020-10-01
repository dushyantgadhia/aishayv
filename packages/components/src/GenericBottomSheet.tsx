import React, { FunctionComponent } from "react";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

interface Props {
  children?: any;
  sheetRef: any;
  renderContent: any;
}

const GenericBottomSheet: FunctionComponent<Props> = (props) => {
  return (
    <BottomSheet
      ref={props.sheetRef}
      snapPoints={[450, 300, 0]}
      borderRadius={10}
      renderContent={props.renderContent}
    />
  );
};

export default GenericBottomSheet;
