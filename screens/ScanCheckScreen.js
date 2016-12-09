import React from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

/* good native Button */
import Button from 'apsl-react-native-button';

import {
 ImagePicker,
} from "exponent";

import {
  NavigationProvider,
  StackNavigation,
  withNavigation,
} from '@exponent/ex-navigation';

import Router from '../navigation/Router';

import {
  FontAwesome,
} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const dimensionWindow = Dimensions.get('window');
const weekDayMap = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const monthMap = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 
 pad = (num) => {
  if (num.length == 1) {
    num = "0" + num;
  }
  return num;
}
@withNavigation
class BackButton extends React.Component {


  /* if anything complicated required that is set
   * at initialization, do in constructor or didMount or whatever
   * but  not elsewhere!
   */
  constructor(props) {
    super(props);
    if (this.props.navigator.getCurrentIndex() > 0) {
      this.state = {
        back: true,
      }
    } 
    else {
      this.state = {
        back: false
      }
    }
  }

  render() {
    let {back} = this.state;
  return (
    <View style = {{alignItems: "center"}}>
    {back &&

    <View >
    <Button style={{backgroundColor: Colors.navBar, borderColor: Colors.navBar}} onPress={this._goBack}>
     <FontAwesome 
      name={'chevron-left'}
        size={20}
        color={'white'}
        style = {{"bottom": 0}}
      />
      </Button>
      </View>
    }
    </View>
    )
  }

   _goBack = () => {
    if (this.props.navigator.getCurrentIndex() > 0) {
      this.props.navigator.pop();
    }
  }
}


export default class ScanCheckScreen extends React.Component {

  constructor(props) {
    super(props);
    dateData = new Date();
    weekDay = weekDayMap[dateData.getDay(dateData)];
    month = monthMap[parseInt(dateData.getMonth())];
    day = dateData.getDate();
    hours = dateData.getHours();
    m = "AM";
    if (hours == 0) {
      hours = 12;
    }
    else if (hours >= 12) {
        m = "PM";
        if (hours > 12) {
          hours = hours - 12;
        }
    }
    minutes = dateData.getMinutes().toString();
    date = weekDay + " " + month + " " + day + 
      "\n"+ pad(hours) + ":" + pad(minutes) + " " + m;
    /* Later on, extract nutrition information knowing food */
    data = {
      "name": this.props.route.params.food,
      "carbs": 50, 
      "sugars": 30, 
      "fats": 10, 
      "proteins": 5,
      "source": this.props.route.params.source,
      'date': date,
    };

    this.state = {
      data: data, 
      foodText: this.props.route.params.foodText,   
    }
  }
  

   static route = {
    navigationBar: {
      title: <Text style={{fontFamily: Fonts.textFont, fontSize: 18, color:  Colors.backgroundColor}}> Review Scan </Text>,
      backgroundColor: Colors.navBar,
      tintColor: Colors.navTint,
      renderLeft: (route, props) => <View style={{paddingLeft: 7}}><BackButton/></View>
    }
  } 


  
  /* maybe consider utility of having button for action
   * versus just text and also of limiting color 
   * used throughout app and of icons for actions.
   * especially good if you organize as list view component
   * of sorts for just text
   */
  render() {
    let { foodText } = this.state;
    let {data} = this.state;
 

    return (
      <View
        style={styles.container} 
        >
             <View style = {styles.finalImageView}>
                <Image source={{uri: data.source}} style={styles.finalImage} />   
              </View>  
               <View style={{padding: 7}}>
              </View>
              <Text style = {styles.foodText}>
                    {foodText}
              </Text>
              <View style={{padding: 7}}>
              </View>
              <View style={styles.buttonView}>
               <TouchableHighlight style={styles.button} onPress={this._goToFood} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableHighlight>
               <TouchableHighlight style={styles.button} onPress={this._goToScan} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>No, re-scan</Text>
              </TouchableHighlight>
            </View>
        </View>
    );

  }

    _goToScan = () => {
      this.props.navigator.push(Router.getRoute('scan'));
    }

    _goToFood = () => {
      this.props.navigator.push(Router.getRoute('food', {data: this.state.data, }));
    }

  
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingBottom: 30,
  }, 
 foodText: {
    color: Colors.textFont,
    fontFamily: Fonts.textFont,
    fontSize: 28,  
    width: 200,
    textAlign: 'center',
    paddingBottom: 20,
    alignSelf: 'center',
    fontWeight: Fonts.header,
  },
  /* flex is awesome--take advatange of! */
  buttonView: {
    flexDirection: 'column',
    height: 200,
  },
  buttonText: {
    fontSize: 22,
    color: Colors.background,
    alignSelf: 'center',
    fontWeight: Fonts.header,
    fontFamily: Fonts.textFont,
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: Colors.tabSelected,
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  }, 
   finalImage: {
    height: 180,
    width: 180,
    borderRadius: 90,
    alignSelf: "center",
  },
   finalImageView: {
    paddingTop: 25,
    alignSelf: "center",
    paddingBottom: 20,
  },
  centerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    alignSelf: 'center',
  },
});