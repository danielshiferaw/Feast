import React from 'react';

import {
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
import Settings from '../api/Settings';

@withNavigation
class BackButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>
    <TouchableOpacity onPress={this._goBack}>
   {/* need to have text inside of Touchable Opacity for callbuck func to work, I believe  with text in it*/}
     <Text style={styles.hiddenText}>"               "</Text>

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

export default class SettingsScreen extends React.Component {

  static route = {
    navigationBar: {
      title: 'Settings',
      backgroundColor: 'grey',
      tintColor: '#fff',
        renderLeft: (route, props) => <BackButton/>
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
         <View style = {styles.input}>
        <Text style={styles.label}> 
            Show Carbs:
        </Text>
        <Switch
          onValueChange={(value) => {
            Settings.settings.carbs = !Settings.settings.carbs;
            this.setState({carbsValue: Settings.settings.carbs});
          }}
          value={this.state.carbsValue}
          />
        </View>
         <View style = {styles.input}>
        <Text style={styles.label}> 
            Show Sugars:
        </Text>
        <Switch
          onValueChange={(value) => {
            Settings.settings.sugars = !Settings.settings.sugars;
            this.setState({sugarsValue: Settings.settings.sugars});
          }}
          value={this.state.sugarsValue}/>
        </View>
        <View style = {styles.input}>
        <Text style={styles.label}> 
            Show Fats:
        </Text>
        <Switch 
          onValueChange={(value) => {
            Settings.settings.fats = !Settings.settings.fats;
            this.setState({fatsValue: Settings.settings.fats});
          }}
          value={this.state.fatsValue}/>
        </View>
        <View style = {styles.input}>
        <Text style={styles.label}> 
            Show Proteins:
        </Text>
        <Switch
          oonValueChange={(value) => {
            Settings.settings.proteins = !Settings.settings.proteins;
            this.setState({proteinsValue: Settings.settings.proteins});
          }}
          value={this.state.proteinsValue}/>
        </View>
      </View>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
    justifyContent: "space-around",

  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  button: {
    marginTop: 150,
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 36,
  },
  
   /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
  label: {
    color: 'white',
    fontSize: 24,
    paddingRight: 10,
    alignSelf: 'center',
  },
});