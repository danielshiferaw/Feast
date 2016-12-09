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

import LogInformation from '../api/LogInformation';

/* good social library */
import Share, {ShareSheet} from 'react-native-share';



 
 pad = (num) => {
  if (num.length == 1) {
    num = "0" + num;
  }
  return num;
}
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



export default class FoodEntryScreen extends React.Component {

  _share = () => {  

        let shareOptions = {
            title: "From Feast: ",
            url: this.state.image,
         };
        Share.open(shareOptions).then(function(success, activityType) {
          if(success) {
          } else {
             console.log('user did not share');
          }}).catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
          throw error;
        });
    }


   static route = {
    navigationBar: {
      title: <Text style={{fontFamily: Fonts.TextFont, fontSize: 18, color:  'white'}}> Food Entry </Text>,
      backgroundColor: Colors.navBar,
      tintColor: Colors.navTint,
      renderLeft: (route, props) => <View style={{paddingLeft: 7}}><BackButton/></View>,
    }
  }
  
  constructor(props) {
    super(props);
    data = this.props.route.params.data;
    image = "";
        if (data.source) {
          image = data.source;
        } 
        else {
          image = LogInformation.names[data.name];
        }

    const width = this.getWidth(data);
    this.state = {
        data: data,
        carbs: new Animated.Value(width.carbs),
        sugars: new Animated.Value(width.sugars),
        fats: new Animated.Value(width.fats),
        proteins: new Animated.Value(width.proteins),
        image: image,
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
        <View style={{padding: 10}}/>
        {this.state.data.source &&
         <Image source={{ uri: this.state.image}} style={styles.sourceImage} />
        }
       {!this.state.data.source &&
         <Image source={this.state.data.uri} style={styles.sourceImage} />
       }
            <View style={{padding: 5}}/>
          <Text style = {styles.nameText}>
          {data.name}
        </Text>
        <View style={{padding: 2}}/>
        <Text style = {styles.dateText}>
          {data.date}
        </Text>
        <Button textStyle={styles.shareText} style={styles.button} onPress={this._share}>
           <FontAwesome 
            name={'share'}
            size={20}
            color={Colors.tabSelected}
            style = {{left: 150, top: 8}}
        />
        </Button>
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
    marginBottom: 30,
  },
  sourceImage: {
    paddingTop: 20,
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },  
  nameText: {
    color: Colors.textFont,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: Fonts.header,
    fontFamily: Fonts.textFont,
  },
  dateText: {
    color: Colors.textFont,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.textFont,
  },
  buttonView: {
    flexDirection: 'column',
    height: 200,
  },
   nameText: {
    color: Colors.textFont,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: Fonts.header,
    fontFamily: Fonts.textFont,
  },
  dateText: {
    color: Colors.textFont,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.textFont,
  },
  button: {
    height: 20,
    width: 80,
    backgroundColor: Colors.background,
    borderColor: Colors.background,
    justifyContent: 'center',
    marginBottom: 20,
  },
  shareText: {
    textAlign: 'center',
    color: Colors.background,
    fontSize: 14,
    alignSelf: 'stretch',
  },
  graph: {
    marginTop: 30,
    width: 300,
    alignSelf: 'center',
    borderColor: Colors.textFont,
    backgroundColor: 'white',
    height: 210,
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
});