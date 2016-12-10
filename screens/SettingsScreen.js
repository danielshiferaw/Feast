import React from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';

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
import Settings from '../api/Settings';



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


export default class SettingsScreen extends React.Component {

  static route = {
    navigationBar: {
      title: <Text style={{fontFamily: Fonts.textFont, fontSize: 18, color:  Colors.backgroundColor}}> Settings </Text>,
      backgroundColor: Colors.navBar,
        tintColor: Colors.navTint,
        renderLeft: (route, props) => <View style={{paddingLeft: 7}}><BackButton/></View>,
    }
  }

   

  state = {
    carbsValue: Settings.settings.carbs,
    sugarsValue: Settings.settings.sugars,
    proteinsValue: Settings.settings.proteins,
    fatsValue: Settings.settings.fats,
  };
     

  render() {
    return (
        <View
        style={styles.container} 
        >
        <View style={styles.settings}>
       <Image source={require('../assets/images/settings.png')} style={styles.sourceImage}/>
      </View>
      </View>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  settings: {
    flex: 1,
    alignItems: 'center',
  },
  sourceImage: {
    marginTop: 50,
    height: 500,
    width: 400,
  },
});