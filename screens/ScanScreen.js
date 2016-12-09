import React from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
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
      /* can only style button borders and that color. for more positioning stuff, do View around, I believe */
    <Button onPress={this._goBack} style={{backgroundColor: Colors.navBar, borderColor: Colors.navBar}}>
     <FontAwesome 
      name={'chevron-left'}
        size={20}
        color={'white'}
        style = {{"bottom": 0}}
      />
      </Button>
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

/* General: Keep design safe and minimalist to start for final products. Otherwise
 * get a hold of fundamental principles, do a lot, copy a lot, experiment and fail,
 * determine style, and go from there
 */
@withNavigation
export default class ScanScreen extends React.Component {
  
  state = {
    foodText: null,
    image: null,
  }

  /* Good example of how to style "banner" for app (may bold for emphasis) */
   static route = {
    navigationBar: {
      title: <Text style={{fontFamily: 'American Typewriter', fontSize: 24, color:  Colors.tabSelected,}}> Feast </Text>,
      backgroundColor: Colors.navBar,
      tintColor: Colors.navTint,
      renderLeft: (route, props) =>  <View style={{paddingLeft: 5}}><BackButton/></View>
    }
  } 


  

  render() {
    let { image } = this.state;
    let { foodText } = this.state;

    return (
      <View
        style={styles.container} 
        >    
        <View>
              <View style={styles.initialScan}>
                  <Button style = {styles.scanButton}
                      onPress={this._scan}>
                    <Button style = {styles.innerScanButton}  textStyle={styles.scanText} onPress={this._scan}>
                    </Button>
                  </Button>
                  <Text style = {styles.scanCue}>
                    SCAN
                </Text> 
              </View>
            </View>
      </View>
    );
  }

    _goToScanCheck = (image, foodText, food) => {
      this.props.navigator.push(Router.getRoute('scanCheck', {source: image, foodText: foodText, food: food}));
    }

   

     _clear= () => {
       this.setState({image: null});
       this.setState({foodText: null});
    }


    _scan = async () => {
      let result = await ImagePicker.launchCameraAsync({allowsEditing: true,
      aspect: [4,3]
    });

      console.log(result);

      if (!result.cancelled) {
        /* In the future, identify food here! */
        food = "muffin";
        this.setState({image: result.uri});
        this.setState({foodText: "Is this a " + food + "?"});
        // string copy!
       image = (' ' + this.state.image).slice(1);
       foodText = (' ' + this.state.foodText).slice(1);
       this._clear(); 
       this._goToScanCheck(image, foodText, food);
      }    
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  initialScan: {
    paddingTop: 200,
    flex: 1,
  },
  
  scanButton: {
    borderColor: Colors.backgroundColor,
    backgroundColor: "black", 
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
  },
  innerScanButton: {
    borderColor: "black",
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
  },
  scanCue: {
    backgroundColor: Colors.backgroundColor,
    borderRadius: 30,
    height: 60,
    width: 60,
    alignSelf: "center",
    borderColor: Colors.backgroundColor,
    fontSize: 20,
    fontFamily: Fonts.textFont,
    color: Colors.header,
    fontWeight: Fonts.header,
  },
  back: {
    alignSelf: 'center',
  },
});