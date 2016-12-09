import Exponent from 'exponent';
import React from 'react';
import {
  Alert,
  AppRegistry,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  NavigationProvider,
  StackNavigation,
  withNavigation,
} from '@exponent/ex-navigation';

import Router from './navigation/Router';

/* critical example of preloading and caching assets for later. also look into back-end work
 * with registering for push notifications
 */

import cacheAssetsAsync from './utilities/cacheAssetsAsync';


@withNavigation
class BackButton extends React.Component {
  render() {
    return <Text onPress={this._goBack} style={styles.back}>Back</Text>
  }

  _goBack = () => {
    if (this.props.navigator.getCurrentIndex() > 0) {
        this.props.navigator.pop();
      }
  }                           
}

class App extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  cacheImages = (images) => {

  }

  async _loadAssetsAsync() {
    /*
    try {
      await cacheAssetsAsync({images: [require("./assets/images/food_photos/vanilla_cupcake.jpg"), 
        require("./assets/images/food_photos/tacos.jpg"), require("./assets/images/food_photos/veggie_burger.jpg"),
   require("./assets/images/food_photos/lamb_gyro.jpg"), require("./assets/images/food_photos/egg_biscut.jpg"),
   require("./assets/images/food_photos/steak_with_mushrooms.jpg"), require("./assets/images/food_photos/pizza.jpg"), 
   require("./assets/images/question.png"),],
   fonts: [],
          });
    } catch(e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({appIsReady: true});
    }
    */
    this.setState({appIsReady: true});
  }

   

  render() {

    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          <NavigationProvider router={Router}>
              <StackNavigation id="root" 
                                
              initialRoute={Router.getRoute('rootNavigation')} />
            </NavigationProvider>

            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}

      </View>
      );
    } else {
      return (
        <Exponent.Components.AppLoading />
        );
      }
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  back: {
    color: 'white',
  }
});


Exponent.registerRootComponent(App);
