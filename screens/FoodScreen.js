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
  Image,
} from 'react-native';

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
const dimensionWindow = Dimensions.get('window');


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

@withNavigation
class AddButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>
    <TouchableOpacity onPress={this._goToCustomAdd}>
   {/* need to have text inside of Touchable Opacity for callbuck func to work, I believe  with text in it*/}
     <Text style={styles.hiddenText}>"          "</Text>
     <FontAwesome 
      name={'plus'}
        size={20}
        color={'white'}
        style = {{"bottom": 0}}
      />
            </TouchableOpacity> 

      </View>
      )
  }

   _goToCustomAdd = () => {
    this.props.navigator.push(Router.getRoute('add'));
  }
}

export default class FoodScreen extends React.Component {

   static route = {
    navigationBar: {
      title: 'Nutrition Info',
      backgroundColor: 'grey',
      tintColor: '#fff',
      renderLeft: (route, props) => <BackButton/>,
      renderRight: (route, props) => <AddButton/>
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
        <View style = {styles.sourceImageView}>
                <Image source={{uri: this.props.route.params.source}} style={styles.sourceImage} />   
        </View>  
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
          <View style={styles.button}>
        <Button style = {styles.addButton}  textStyle={styles.addText} onPress={this._goToAdd}>
              Add to Log!
        </Button>
        <View style={{padding: 10}}>
        </View>
        <Button style = {styles.logButton}  textStyle={styles.logText} onPress={this._goToLog}>
              No, just go to Log!
        </Button>
        </View>
        </View>
          
       

        
      
    );
  }

  _goToLog = () => {
          this.props.navigator.push(Router.getRoute('log'));
  }


   _goToAdd = () => {
          this.props.navigator.push(Router.getRoute('add', {name: 'Rice', source: this.props.route.params.source, 
            carbs: data.carbs, sugars: data.sugars, fats: data.fats , proteins: data.proteins}));
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
    marginTop: 6,
    flexDirection: 'column',
  },
  button: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: "space-around",
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
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 48,
  },
  addButton: {
    backgroundColor: "#40E0D0", 
    width: 150,
    height: 50,
    alignSelf: "center",
  },
  addText: {
    color: "white",
    fontSize: 19,
  },
   logButton: {
    backgroundColor: "#0000CD", 
    width: 150,
    height: 50,
    alignSelf: "center",
  },
    logText: {
    color: "white",
    fontSize: 18,
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
    /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
});