import React from 'react';

import {
  ScrollView,
  PropTypes,
  StyleSheet,
  Text,
  View,
  Animated, 
  Component,
  TouchableHighlight,
  Dimensions,
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
     <Text style={styles.hiddenText}>"       "</Text>
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

data = {
    "carbs": 50, 
    "sugars": 30, 
    "fats": 10, 
    "proteins": 5,
  };

export default class FoodScreen extends React.Component {

   static route = {
    navigationBar: {
      title: 'Nutrition Info',
      backgroundColor: 'grey',
      tintColor: '#fff',
      renderLeft: (route, props) => <BackButton/>
    }
  }
  
  constructor() {
    super();
    const width = this.getWidth(data);
    this.state = {
        carbs: new Animated.Value(width.carbs),
        sugars: new Animated.Value(width.sugars),
        fats: new Animated.Value(width.fats),
        proteins: new Animated.Value(width.proteins),
      };
    }

    

    getWidth (data) {
      const deviceWidth = Dimensions.get('window').width;
      const maxWidth = 350;
      const indicators = ['carbs', 'sugars', 'fats', 'proteins'];
      const unit = {
        carbsUnit: Math.floor(maxWidth / 100),
        sugarsUnit: Math.floor(maxWidth / 100),
        fatsUnit: Math.floor(maxWidth / 100),
        proteinsUnit: Math.floor(maxWidth / 100),
      };

      let width = {};
      let widthCap; // Give with a max cap
      indicators.forEach(item => {
          widthCap = data[item] * unit[`${item}Unit`] || 5
          width[item] = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50);
      });

      return width;
  }
  

 

   


  render() {
    const {carbs, sugars, fats, proteins} = this.state;
    return (
        <View
        style={styles.container} 
        >
        <Text style = {styles.text}>
          Rice
        </Text>


        <View style={styles.item}>
          <Text style={styles.label}>Carbs</Text>
          <View style = {styles.data}>
            {carbs &&
          <Animated.View style={[styles.bar, styles.points, {width: carbs}]} />
          }
          <Text style={styles.dataNumber}>{data.carbs}</Text>
          </View>
          </View>
          <View style={styles.item}>
          <Text style={styles.label}>Sugars</Text>
          <View style = {styles.data}>
            {sugars &&
          <Animated.View style={[styles.bar, styles.assists, {width: fats}]} />
        }
          <Text style={styles.dataNumber}>{data.sugars}</Text>
          </View>
          </View>
          <View style={styles.item}>
          <Text style={styles.label}>Fats</Text>
          <View style = {styles.data}>
            {fats &&
          <Animated.View style={[styles.bar, styles.rebounds, {width: sugars}]} />
        }
          <Text style={styles.dataNumber}>{data.fats}</Text>
          </View>
          </View>
          <View style={styles.item}>
          <Text style={styles.label}>Proteins</Text>
          <View style = {styles.data}>
           {proteins &&
          <Animated.View style={[styles.bar, styles.steals, {width: proteins}]} />
          }
           <Text style={styles.dataNumber}>{data.proteins}</Text>
          </View>  
          </View>  
             <TouchableOpacity
        onPress = {this._goToLog}
        >
        <Text style = {styles.logText}>
        Log
        </Text>
        </TouchableOpacity>
          </View>
          
       

        
      
    );
  }

  _goToLog = () => {
          this.props.navigator.push(Router.getRoute('log'));
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
    marginTop: 6,
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 48,
  },
  item: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    height: 50,
    width: 50,
  },
  label: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 24,
    position: 'relative',
    top: 2,
    height: 24,
    width: 100,
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 11,
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 20,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  points: {
    backgroundColor: '#F55443'
  },
  assists: {
    backgroundColor: '#FCBD24'
  },
  rebounds: {
    backgroundColor: '#59838B'
  },
  steals: {
    backgroundColor: '#4D98E4'
  },
 
  logText: {
   // position: 'absolute', // used to set fix positions to say set something off of edge of screen?
    color: 'yellow',
    textAlign: 'center',
    fontSize: 36,
  },
    /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
});