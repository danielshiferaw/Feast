import React, {
} from 'react';

import {
  ScrollView,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
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

import LogInformation from '../api/LogInformation';
const dimensionWindow = Dimensions.get('window');


@withNavigation
class BookButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>
    <TouchableOpacity onPress={this._goToBook}>
   {/* need to have text inside of Touchable Opacity for callbuck func to work, I believe  with text in it*/}
     <Text style={styles.hiddenText}>"          "</Text>
     <FontAwesome 
      name={'book'}
        size={20}
        color={'white'}
        style = {{"bottom": 0}}
      />
            </TouchableOpacity> 

      </View>
      )
  }

   _goToBook = () => {
    this.props.navigator.push(Router.getRoute('book'));
  }
}

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



/* Good example of how to work with TextInput */
export default class AddScreen extends React.Component {

    static route = {
      navigationBar: {
        title: 'Food Entry',
        backgroundColor: 'grey',
        tintColor: '#fff',
        renderRight: (route, props) => <BookButton/>,
        renderLeft: (route, props) => <BackButton/>
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.name ? this.props.route.params.name : '',
      carbsText: this.props.route.params.carbs ? this.props.route.params.carbs.toString() : '',
      sugarsText: this.props.route.params.sugars ? this.props.route.params.sugars.toString() : '',
      fatsText: this.props.route.params.fats ? this.props.route.params.fats.toString() : '',
      proteinsText: this.props.route.params.proteins ? this.props.route.params.proteins.toString() : '',
    };
  }
     


   _goToBook = () => {   
    dateData = new Date();
    month = parseInt(dateData.getMonth()) + 1;
    month = month.toString() + "-";
    day = dateData.getDate() + " ";
    hours = dateData.getHours() + ":00";
    date = month + day + hours;
    LogInformation.logs.push({date: date, name: this.state.name, carbs: this.state.carbsText, sugars: this.state.sugarsText,
      fats: this.state.fatsText, proteins: this.state.proteinsText, source: this.props.route.params.source});
    this.props.navigator.push(Router.getRoute('book'));
  }


    render() {
    
      return (
        <View style={styles.container}>
        <Text style={styles.label}> 
            Enter in all nutrition values in grams 
            </Text>
             <View style={styles.input}>
            <Text style={styles.label}> 
            Name: 
            </Text>
              <TextInput
              style={styles.textInput}
              defaultValue={this.state.name}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              />
            </View>
          <View style={styles.input}>
            <Text style={styles.label}> 
            Carbs: 
            </Text>
              <TextInput
              style={styles.textInput}
              defaultValue={this.state.carbsText}
              onChangeText={(carbsText) => this.setState({carbsText})}
              value={this.state.carbsText}
              />
            </View>
            <View style={styles.input}>
            <Text style={styles.label}> 
            Sugars: 
            </Text>
              <TextInput
              style={styles.textInput}
              defaultValue={this.state.sugarsText}
              onChangeText={(sugarsText) => this.setState({sugarsText})}
              value={this.state.sugarsText}
              />
            </View>
             <View style={styles.input}>
            <Text style={styles.label}> 
            Fats: 
            </Text>
              <TextInput
              style={styles.textInput}
              defaultValue={this.state.fatsText}
              onChangeText={(fatsText) => this.setState({fatsText})}
              value={this.state.fatsText}
              />
            </View>
            <View style={styles.input}>
            <Text style={styles.label}> 
            Proteins:
            </Text>
              <TextInput
              style={styles.textInput}
              onChangeText={(proteinsText) => this.setState({proteinsText})}
              defaultValue={this.state.proteinsText}
              value={this.state.proteinsText}
              />
            </View>
             <View style={styles.input}>
             <Text style={styles.label}> 
            Image:   
            </Text>
              {this.props.route.params.source &&
                 <View style = {styles.sourceImageView}>
                <Image source={{uri: this.props.route.params.source}} style={styles.sourceImage} />  
                </View> 
              }
              {!this.props.route.params.source &&
                 <Text>  </Text> 
              }
             </View>  
            
             <Button style = {styles.addButton}  textStyle={styles.addText} onPress={this._goToBook}>
              Add to Log!
            </Button>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    padding: 40,
    flex: 1,
    justifyContent: "space-between",

  },  
  input: {
    flexDirection: 'row',
  },
  label: {
    color: 'white',
    fontSize: 24,
    paddingRight: 10,
    alignSelf: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    height: 50,
    width: 150,
  //  width: 150,
  },
  textInputWrap: {
     backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: "#40E0D0", 
    width: 150,
    height: 75,
    alignSelf: "center",
  },
  addText: {
    color: "white",
    fontSize: 24,
  },
  sourceImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
   /* important: if you want to just specify child elements' positions according to the parent and not
   * affect the position of other child elements, use absolute positioning (avoid messing with
   * margins/paddings to achieve that effect) but then relative positioning won't work.
   */
  sourceImageView: {
   
  },
  /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
  textInput: {
    backgroundColor: '#333333',
    flex: .15,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    fontSize: 20,
    color: "white",
  },
});