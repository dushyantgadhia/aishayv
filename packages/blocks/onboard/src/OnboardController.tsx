import { BlockComponent } from "../../../framework/src/BlockComponent";

// Customizable Area Start
//import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
// Customizable Area End


export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  swiperIndex: number;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class OnboardController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area End

  constructor(props: Props) {

    super(props);
  
    // Customizable Area Start
    this.state = {
      swiperIndex: 0
    };

    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  onSliderChange = (index:number) => {
		//console.log('console->onSliderChange', index);
		this.setState({swiperIndex: index});
	}

	goToLogin = () => {
    //const {swiperIndex} = this.state;
    console.log('console->goToLogin');
		this.props.navigation.navigate('EmailLoginScreen');
	}

}
