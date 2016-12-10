import React from 'react';

/* note alpabetical convention for imports */
import {
  Animated, 
  Component,
  Dimensions,
  Image,
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
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
import Fonts from '../constants/Fonts';

const dimensionWindow = Dimensions.get('window');



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

export default class FoodScreen extends React.Component {

   static route = {
    navigationBar: {
      title: <Text style={{fontFamily: Fonts.textFont, fontSize: 18, color:  Colors.background}}> Food Entry </Text>,
      backgroundColor: Colors.navBar,
      tintColor: Colors.navTint,
      renderLeft: (route, props) => <View style={{paddingLeft: 7}}><BackButton/></View>,
      renderRight: (route, props) => <View style={{paddingRight: 7}}><AddButton/></View>,
    }
  }
  
  constructor(props) {
    super(props);
    data = this.props.route.params.data;

    const width = this.getWidth(data);
    this.state = {
        data: data,
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
    const {data} = this.state;
    return (
        <View
        style={styles.container} 
        >

        <View style={styles.header}>
        <View style={{padding: 5}}/>
            <Image source={{uri: data.source}} style={styles.sourceImage} />   
            <View style={{padding: 5}}/>
          <Text style = {styles.nameText}>
          {data.name}
        </Text>    
        <View style={{padding: 2}}/>
        <Text style = {styles.dateText}>
          {data.date}
        </Text>
        </View>
         
         <View style = {styles.graph}>
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
          <Animated.View style={[styles.bar, styles.assists, {width: sugars}]} />
        }
          <Text style={styles.dataNumber}>{data.sugars}</Text>
          </View>
          </View>
          <View style={styles.item}>
          <Text style={styles.label}>Fats</Text>
          <View style = {styles.data}>
            {fats &&
          <Animated.View style={[styles.bar, styles.rebounds, {width: fats}]} />
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
          </View>
           <View style={styles.buttonView}>
           { /*
              <View style = {styles.addButton}>

              <Text style={styles.addText} onPress={this._goToAdd}>
                  Add to Log
              </Text>
              </View>
              <View style = {styles.scanButton}>
               <Text style={styles.scanText} onPress={this._goToScan}>
                 Scan another food
                </Text>
              </View> */
            }
            <TouchableHighlight style={styles.button} onPress={this._goToAdd} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Add to Log</Text>
              </TouchableHighlight>
               <TouchableHighlight style={styles.button} onPress={this._goToScan} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Scan another food</Text>
              </TouchableHighlight>
            </View>          
        </View>      
    );
  }

  _goToScan = () => {
          this.props.navigator.push(Router.getRoute('scan'));
  }


   _goToAdd = () => {
          this.props.navigator.push(Router.getRoute('add', {name: this.state.data.name, 
            source: this.state.data.source, carbs: this.state.data.carbs, sugars: this.state.data.sugars, 
            fats: this.state.data.fats , proteins: this.state.data.proteins, date: this.state.data.date}));
    }
}

const styles = StyleSheet.create({
   container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  header: {
    height: 200,
    paddingBottom: 40,
  },
  sourceImage: {
    paddingTop: 100,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },  
  nameText: {
    color: Colors.textFont,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: Fonts.header,
    fontFamily: Fonts.textFont,
  },
  dateText: {
    color: Colors.textFont,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.textFont,
  },
  graph: {
    paddingTop: 10,
   // borderWidth: 2flex ,
    width: 300,
    alignSelf: 'center',
    borderColor: Colors.textFont,
    backgroundColor: 'white',
    flex: 1,
    height: 240,
  },
  /* following few tags give decent idea of how to 
   * have induce circular borders in general
   * and how to style them
   */
  
  item: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    height: 40,
    width: 40,
  },
  label: {
    color: Colors.textFont,
    flex: 1,
    fontSize: 20,
    fontFamily: Fonts.textFont,
    fontWeight: Fonts.header,
    position: 'relative',
    top: 2,
    height: 20,
    width: 100,
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: Colors.textFont,
    fontSize: 12,
    fontFamily: Fonts.textFont,
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 15,
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
    buttonView: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    height: 150,
  },
  buttonText: {
    fontSize: 22,
    color: Colors.background,
    alignSelf: 'center',
    fontWeight: Fonts.header,
    fontFamily: Fonts.textFont,
  },
  button: {
    backgroundColor: Colors.tabSelected,
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  }, 
});