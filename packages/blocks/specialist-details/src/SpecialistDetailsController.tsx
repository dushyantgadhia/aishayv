import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { isEmpty } from "../../../framework/src/Helpers";

// Customizable Area Start
//import { imgLogoPath } from "./assets";
const itemsArr = [
	{id:1, duration: 45, service_name: 'Hair Styling', price:25, name: 'Marguerite Cross Day Salon', provider_address: '171 Pagac Drive, Chicago, Illinois, US.', attendee_name: 'Luis Delgado'},
	{id:2, duration: 45, service_name: 'Take care Eyebrows Eyebrows', price:17.5, name: 'Marguerite Cross Day Salon', provider_address: '171 Pagac Drive, Chicago, Illinois, US.', attendee_name: 'Luis Delgado'},
	{id:3, duration: 45, service_name: 'Change Hair Color', price:40, name: 'Marguerite Cross Day Salon', provider_address: '171 Pagac Drive, Chicago, Illinois, US.', attendee_name: 'Luis Delgado'},
	{id:4, duration: 45, service_name: 'Haircuts', price:30, name: 'Marguerite Cross Day Salon', provider_address: '171 Pagac Drive, Chicago, Illinois, US.', attendee_name: 'Luis Delgado'},
]

let commentArray = [
	{id:1, created: '2020-08-20T05:00:05.711Z', rating: '4.0', name: 'Carlos Day', comment: ` Love it !!!
I had a fun party with my new hair. Thank you.`},
	{id:2, created: '2020-08-19T05:00:05.711Z', rating: '5.0', name: 'Carlos Day', comment: 'Good !!! This is a good place for you if you want to cut your hair, service style is very enthusiastic and professional.'},
	{id:3, created: '2020-08-15T05:00:05.711Z', rating: '3.0', name: 'Carlos Day', comment: 'Awesome!!'}
];
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route:any;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  screenName: string;
  index: number;
  specialityIndex: 0,
  services: Array<any>;
  specialistSelected: any;
  routes: Array<any>;
  description: string;
  selectedRatingValue: number;
  maxRatingValue: number;
  comment: string;
  reviews: Array<any>;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class SpecialistDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  resendConfirmationApiCallId: any;
  inputs: object = {};
  // Customizable Area End

  constructor(props: Props) {

    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];
    this.receive = this.receive.bind(this);
    //runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start

    const {params} = props.route;
    const selectedSpecialist:any = params && params.selectedSpecialist || null;

    this.state = {
			screenName: 'SpecialistDetails Screen',
			index:0,
      specialityIndex:0,
      services: itemsArr,
      specialistSelected: selectedSpecialist,
			routes:[{key: 'About', title: 'About'},{key: 'Review', title: 'Review'}],
			description: 'Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo. Repeat Mark Michael is specialist, Hair style, Haircut consectetur adipiscing elit, sed do eiusmod tempor incididunt enim labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam commodo consequat. consectetur adipiscing elit, sed do eiusmod commodo.',
			selectedRatingValue:4,
			maxRatingValue:5,
			comment:'',
			reviews: commentArray,
		};
		this.inputs = {};
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    console.log('SDC->receive', message);
    
    // Customizable Area Start
    if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
      
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId != null) {

        if (apiRequestCallId === this.resendConfirmationApiCallId) {
          if (responseJson && responseJson.success && responseJson.data) {
            this.showAlert('Success', responseJson.message);
            runEngine.unSubscribeFromMessages(this, this.subScribedMessages);            
          } else {
            //Check Error Response
            this.parseApiErrorResponse(responseJson);
          }

          errorReponse ? this.parseApiCatchErrorResponse(errorReponse) : '';
        }
      }
    }
    // Customizable Area End
  }  

  // Customizable Area Start

  setIndex = (index:any) => {
		console.log('console->setIndex', index);
		this.setState({index:index});
	}

	setSpecialityItem = (index:any) => {
		console.log('console->setSpecialityItem', index);
		this.setState({specialityIndex:index});
	}

	bookAppointmentFunc = () => {
    const { services, specialityIndex, specialistSelected} = this.state
    console.log('console->bookAppointmentFunc');
    this.props.navigation.navigate('BookAppointmentScreen', {selectedSpecialist: specialistSelected, selectedService: services[specialityIndex]});
  }
  
  submitReviewFunc = () => {
		const {reviews, selectedRatingValue, comment} = this.state;
		let tempReviews = [...reviews];
		let commentObj = {id:reviews.length + 1, comment: comment, created: new Date(), rating: selectedRatingValue.toFixed(1), name: 'Carlos Day'}
		tempReviews.unshift(commentObj);
		console.log('console->submitReviewFunc', tempReviews);
		this.setState({reviews: tempReviews, comment:''});
	}

	setRating = (rating:any) => {
		console.log('console->setRating', rating);
		this.setState({selectedRatingValue: rating});
	}

	_handleInputChange = (field:string, value:any) => {
		this.setState({ [field]: value });
	}

}
