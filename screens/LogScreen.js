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
        title: <Text style={{fontFamily: 'American Typewriter', fontSize: 24, color:  Colors.tabSelected,}}> Feast </Text>,
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
        <Button style = {styles.actionButtonHighlight}  textStyle={styles.actionText} >
              Blood Sugar
        </Button>
         <Button style = {styles.actionButton}  textStyle={styles.actionText} onPress={this._goToBook}>
              Food Entries
        </Button>
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
    height: 300,
    width: 300,
  },
  lambImage: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    top: -198,
    left: -76,
  },
  eggImage: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    top: -174,
    left: -14,
  },
  pizzaImage: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    top: -105,
    left: 57,
  }, 
  actionBar: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 10,
  },
  actionButtonHighlight: {
    flex: .45,
    backgroundColor: Colors.tabSelected,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
  actionText: {
    color: Colors.textFont,
  },
  actionButton: {
    flex: .45,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: Colors.actionBar,
  }, 
  tickLabelX: {
    paddingTop: 5,
    position: 'absolute',
    bottom: 0,
    width: 50,
    fontSize: 14,
    textAlign: 'center',
    color: "white",
  },

  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    fontSize: 14,
    textAlign: 'center',
    color: "white"
  },

  ticksYDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'black',
    borderRadius: 100,
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
