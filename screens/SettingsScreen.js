import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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

   
     

  render() {
    return (
        <ScrollView
        style={styles.container} 
        >



      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
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
  }
});