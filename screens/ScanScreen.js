import React from 'react';

import {
  TouchableHighlight,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';


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
      <ScrollView
        contentContainerStyle={styles.container} 
        >

          {(loops <= 3 && !image) && 
          <View style = {styles.scanButton} >
          <TouchableOpacity onPress={this._scan}>  
           <Text style = {styles.scanText}>
            SCAN
            </Text> 
           </TouchableOpacity>  
           </View>
          }
          


         {(loops <= 3 && image) && 
          <View style={styles.scanButton} >
          <Image source={{uri: image}} style={styles.sourceImage} />   
           <Text style = {styles.rotateText}>
            ROTATE 90 DEGREES CLOCKWISE BEFORE SCANNING
            </Text> 
            <View style={{padding: 10}}>
            </View>
            <TouchableOpacity onPress={this._scan}> 
            <Text style = {styles.scanText}>
              SCAN
            </Text>
           </TouchableOpacity>  
           </View>
         }
          

          {loops > 3 &&
            <View>
            <Image source={{uri: image}} style={styles.finalImage} />   
             <Text style = {styles.text}>
                {foodText}
              </Text>
              <View style={{padding: 10}}>
              </View>
              <TouchableOpacity
              onPress = {this._goToFood}
              >
                <Text style = {styles.text}>
                  Yup!
                </Text> 
              </TouchableOpacity>
              <View style={{padding: 10}}>
            </View>
              <TouchableOpacity
                onPress = {this._clear}
              >
                <Text style = {styles.text}>
                  Nope!
                </Text> 
              </TouchableOpacity> 
              </View>
            }
        </ScrollView>
    );


  }

    _goToFood = () => {
      this.props.navigator.push(Router.getRoute('food'));
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
    justifyContent: 'center',
    alignItems: 'center', 
  },
  scanButton: {
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
  scanText: {
    color: 'green',
    textAlign: 'center',
    fontSize: 36,
  },
  rotateText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
  },
  sourceImage: {
    height: 100,
    width: 100,
    alignSelf: "center",
  },
  finalImage: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
  back: {
    alignSelf: 'center',
  },
    /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
});