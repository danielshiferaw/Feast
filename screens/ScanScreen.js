import React from 'react';

import {
  Dimensions,
  TouchableHighlight,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

/* good native Button */
import Button from 'apsl-react-native-button';

import {
 ImagePicker
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
const dimensionWindow = Dimensions.get('window');

 
@withNavigation
class BackButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>
    <TouchableOpacity onPress={this._goBack}>
   {/* need to have text inside of Touchable Opacity for callbuck func to work, I believe  with text in it*/}

     <Text style={styles.hiddenText}>"          "</Text>
     <FontAwesome 
      name={'chevron-left'}
        size={20}
        color={'white'}
        style = {{"bottom": 0}}
      />
          </TouchableOpacity> 

      </View>
      )
  }

   _goBack = () => {
    if (this.props.navigator.getCurrentIndex() > 0) {
      this.props.navigator.pop();
    }
  }
}

export default class ScanScreen extends React.Component {

  state = {
    loops: 0,
    foodText: null,
    image: null,
  }
   static route = {
    navigationBar: {
      title: 'Feast',
      backgroundColor: "#4c4c4c",
      tintColor: '#fff',
      renderLeft: (route, props) => <BackButton/>
    }
  } 

 componentWillMount() {            
  }
  

  render() {
    let { image } = this.state;
    let { foodText } = this.state;
    let {loops } = this.state;

    return (
      <View
        style={styles.container} 
        >

          {(loops <= 3 && !image) && 
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
          }
          


         {(loops <= 3 && image) && 
          <View>
            <View style={styles.initialScan}>
              <View style = {styles.sourceImageView}>
                <Image source={{uri: image}} style={styles.sourceImage} />   
              </View>  
               <Button style = {styles.scanButton}
                      onPress={this._scan}>
                  <Button style = {styles.innerScanButton}  textStyle={styles.scanText} onPress={this._scan}>
                  </Button>
               </Button>
                <Text style = {styles.rotateCue}>
                  ROTATE PHONE
                </Text>
                 <Text style = {styles.rotateCue}>
                  90 {"\xB0"} COUNTERCLOCKWISE
                </Text>
                 <Text style = {styles.rotateCue}>
                  THEN SCAN
                </Text>    
              </View>
              <View style ={styles.arrow}>
                  <View style={styles.arrowTail}>
                    <View style={styles.arrowTriangle}>
                  </View>
                </View>
              </View>
           </View>
         }
          

          {loops > 3 &&
            <View style = {styles.checkView}>
             <View style = {styles.finalImageView}>
                <Image source={{uri: image}} style={styles.finalImage} />   
              </View>  
              <Text style = {styles.foodText}>
                    {foodText}
              </Text>
              <View style={{padding: 10}}>
              </View>
              <Button style = {styles.yesButton}  textStyle={styles.yesText} onPress={this._goToFood}>
                Yes!
              </Button>
              <View style={{padding: 10}}>
              </View>
               <Button style = {styles.noButton}  textStyle={styles.noText} onPress={this._clear}>
                No, re-scan!
              </Button>
             </View>
            }
        </View>
    );


  }

    _goToFood = () => {
      this.props.navigator.push(Router.getRoute('food', {source: this.state.image}));
    }

     _clear= () => {
       this.setState({image: null});
       this.setState({foodText: null});
       this.setState({loops: 0});
    }


    _scan = async () => {
      let result = await ImagePicker.launchCameraAsync({allowsEditing: true,
      aspect: [4,3]
    });

      console.log(result);

      if (!result.cancelled) {
        this.setState({image: result.uri});
        this.setState({foodText: "Is your food rice?"});
        this.setState((prevState) => {
          return {loops: prevState.loops + 1};
        });
      }    
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
  },
  checkView: {
    flex: 1,
    flexDirection: "column",
  },
  initialScan: {
    paddingTop: 200,
    flex: 1,
  },
  foodText: {
    color: 'white',
    fontSize: 28,  
    width: 200,
    textAlign: 'center',
    paddingBottom: 20,
    alignSelf: 'center',
  },
  /* following few tags give decent idea of how to 
   * have induce circular borders in general
   * and how to style them
   */
  scanButton: {
    borderColor: "white",
    backgroundColor: "white", 
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
  },
  innerScanButton: {
    borderColor: "black",
    backgroundColor: '#333333',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
  },
  yesButton: {
    backgroundColor: "green", 
    width: 200,
    height: 100,
    alignSelf: "center",
  },
  yesText: {
    color: "white",
    fontSize: 24,
  },
  noButton: {
    backgroundColor: "red", 
    width: 200,
    height: 100,
    alignSelf: "center",
  },
  noText: {
    color: "white",
    fontSize: 24,
  },
  scanCue: {
    backgroundColor: '#333333',
    borderRadius: 30,
    height: 60,
    width: 60,
    alignSelf: "center",
    borderColor: '#333333',
    fontSize: 20,
    color: "white",
  },
  rotateCue: {
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    height: 30,
  }, 
  sourceImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
   /* important: if you want to just specify child elements' positions according to the parent and not
   * affect the position of other child elements, use absolute positioning (avoid messing with
   * margins/paddings to achieve that effect) but then relative positioning won't work.
   */
  sourceImageView: {
    position: "absolute",
    top: 40,
    left: dimensionWindow.width*.37,
  },
   finalImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  /* Does setting absolute for one child set absolute for other children */
   finalImageView: {
    paddingTop: 25,
    alignSelf: "center",
    paddingBottom: 20,
  },
  centerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  finalImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  back: {
    alignSelf: 'center',
  },
  arrow: {
    backgroundColor: 'transparent',
    overflow: 'visible',
    width: 30,
    height: 25
  },
  arrowTail: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 5,
    borderTopColor: '#32CD32',
    borderStyle: 'solid',
    borderTopLeftRadius: 12,
    top: 8,
    left: 137,
    width: 60,
    height: 60,
    alignSelf: "center",
    transform: [
      {rotate: '310deg'}
    ]
  },
  arrowTriangle: {
    backgroundColor: 'transparent',
    width: 0,
    height: 0,
    borderTopWidth: 12,
    borderTopColor: 'transparent',
    borderRightWidth: 12,
    borderRightColor: '#32CD32',
    borderStyle: 'solid',
    transform: [
      {rotate: '125deg'}
    ],
    position: 'absolute',
    // negative numbers allowed!
    top: -10,
    left: 2,
    overflow: 'visible',
  },
  /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
});