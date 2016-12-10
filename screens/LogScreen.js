import React, {
} from 'react';

import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

/* good native Button */
import Button from 'apsl-react-native-button';


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
import LogInformation from '../api/LogInformation';



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
@withNavigation
class AddButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>

    <Button style={{backgroundColor: Colors.navBar, borderColor: Colors.navBar}} onPress={this._goToCustomAdd}>
     <FontAwesome 
      name={'plus'}
        size={20}
        color={'white'}
        style = {{"bottom": 0}}
      />
      </Button>
    </View>
      )
  }

   _goToCustomAdd = () => {
    this.props.navigator.push(Router.getRoute('add'));
  }
}



export default class LogScreen extends React.Component {

    static route = {
      navigationBar: {
          title: <Text style={{fontFamily: Fonts.textFont, fontSize: 18, color:  'white'}}> View Log </Text>,
         backgroundColor: Colors.navBar,
        tintColor: Colors.navTint,
        renderLeft: (route, props) => <View style={{paddingLeft: 7}}><BackButton/></View>,
        renderRight: (route, props) => <View style={{paddingRight: 7}}><AddButton/></View>
  }
}
     
    _goToBook = () => {
    this.props.navigator.push(Router.getRoute('book'));
  }

    _goToEntry = (data) => {
      this.props.navigator.push(Router.getRoute('foodEntry', {data: data}));
    }

    /* Simulated Action Bar below */

    render() {
      
      return (
        <View style={styles.container}>
     
      <View style = {styles.actionBar}>
        <TouchableOpacity style = {styles.actionButtonHighlight} onPress={this._goToLog}>
              <Text style={styles.actionText}>
                Blood Sugar Graph
              </Text>
          </TouchableOpacity>
           <TouchableOpacity style = {styles.actionButton} onPress={this._goToBook}>
            <Text style={styles.actionText}>
                Food Entries List
            </Text>
          </TouchableOpacity>
      </View>
      <View style={styles.graph}>
          <View>
         <Image source={require('../assets/images/cgm_graph.png')} style={styles.sourceImage}/>
         </View>
         <TouchableOpacity onPress= {() => {this._goToEntry(LogInformation.logs[2]);}}>
         <Image source={require('../assets/images/food_photos/lamb_gyro.jpg')} style={styles.lambImage}/>
         </TouchableOpacity>
           <TouchableOpacity onPress= {() => {this._goToEntry(LogInformation.logs[1]);}}>
         <Image source={require('../assets/images/food_photos/egg_biscut.jpg')} style={styles.eggImage}/>
          </TouchableOpacity>
           <TouchableOpacity onPress= {() => {this._goToEntry(LogInformation.logs[2]);}}>
         <Image source={require('../assets/images/food_photos/pizza.jpg')} style={styles.pizzaImage}/>
          </TouchableOpacity>
      </View>
      <Text style={{color: 'black', fontSize: 17, fontFamily: Fonts.textFont, 
      bottom: 70, left: 20}}>Friday, December 9</Text>
      </View>
      
    );
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
 
  graph: {
    flex: 1,
    alignItems: 'center',
  },
  sourceImage: {
    marginTop: 20,
    height: 360,
    width: 330,
  },
  lambImage: {
    position: 'absolute',
    height: 25,
    width: 25,
    borderRadius: 10,
    top: -237,
    left: -88,
  },
  eggImage: {
    position: 'absolute',
    height: 25,
    width: 25,
    borderRadius: 10,
    top: -220,
    left: -20,
  },
  pizzaImage: {
    position: 'absolute',
    height: 25,
    width: 25,
    borderRadius: 10,
    top: -135,
    left: 70,
  }, 
  actionBar: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 10,
  },
 actionButtonHighlight: {
    flex: 1,
    backgroundColor: Colors.tabSelected,
    borderColor: 'black',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: Colors.fontText,
    fontFamily: Fonts.textFont,
    fontWeight: Fonts.header,
    fontSize: 20,
  },
  actionButton: {
    flex: 1,
    borderColor: 'black',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.actionBar,
  },
  dateText: {
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
  bloodGlucoseText: {
    fontSize: 18,
    textAlign: "right",
    color: "white",
  }
});
