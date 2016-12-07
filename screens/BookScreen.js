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
  TouchableOpacity,
  // often better than ScrollView b/c of optimization on top of ScrollView
  ListView,
  TextInput,
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
import Settings from '../api/Settings';


@withNavigation
class LogButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>
    <TouchableOpacity onPress={this._goToLog}>
   {/* need to have text inside of Touchable Opacity for callbuck func to work, I believe  with text in it*/}
     <Text style={styles.hiddenText}>"          "</Text>
     <FontAwesome 
      name={'line-chart'}
        size={20}
        color={'white'}
        style = {{"bottom": 0}}
      />
            </TouchableOpacity> 

      </View>
      )
  }

   _goToLog = () => {
    this.props.navigator.push(Router.getRoute('log'));
  }
}

@withNavigation
class AddButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>
    <TouchableOpacity onPress={this._goToAdd}>
   {/* need to have text inside of Touchable Opacity for callbuck func to work, I believe  with text in it*/}
     <Text style={styles.hiddenText}>"       "</Text>
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

   _goToAdd = () => {
     this.props.navigator.push(Router.getRoute('add'));
  }
}


@withNavigation
class Row extends React.Component {

   _goToSocial = () => {   
    this.props.navigator.push(Router.getRoute('social', {source: this.props.source}));
  }

  render() {
    return (
      <View style={styles.list}>
          <View style={styles.row}>   
         {this.props.source &&
         <Image source={{ uri: this.props.source}} style={styles.sourceImage} />
          }
           {!this.props.source &&
         <Image source={{ uri: '../assets/images/question.png'}} style={styles.sourceImage} />
          }
          {this.props.date &&
         <Text style = {styles.text}>
         Date: {this.props.date}
          </Text>
          }
          </View>
          <View style={styles.row}>
          {this.props.name && 
         <Text style = {styles.text}>
         Name: {this.props.name}
         </Text>
          }
          {this.props.carbs && Settings.settings.carbs &&
         <Text style = {styles.text}>
         Carbs: {this.props.carbs}
         </Text>
          }
          </View>
          <View style={styles.row}> 
          {this.props.sugars && Settings.settings.sugars &&
         <Text style = {styles.text}>
         Sugars: {this.props.sugars}
         </Text>
          }
       {this.props.proteins && Settings.settings.proteins &&
         <Text style = {styles.text}>
         Fats: {this.props.proteins}
         </Text>
       }
       </View>
       <View>
       {this.props.fats && Settings.settings.fats &&
         <Text style = {styles.text}>
         Proteins: {this.props.fats}
         </Text>
         
       }
       <Button style = {styles.addButton}  textStyle={styles.addText} onPress={this._goToSocial}>
              No, just go to Log!
        </Button>
       </View>
        </View>
      );
  }
  
}

/* Good example of how to work with TextInput */
export default class AddScreen extends React.Component {

    static route = {
      navigationBar: {
        title: 'Food Entry',
        backgroundColor: 'grey',
        tintColor: '#fff',
        renderRight: (route, props) => <AddButton/>,
        renderLeft: (route, props) => <LogButton/>
    }
  }

  data = LogInformation.logs;


  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(LogInformation.logs),
    };
  }
     


  

  


  // good way to know how to dump map values into props, I believe
  // sources for assign for renderRow must be an object?
    render() {
      return (
        <View style={styles.container}>
        { (this.data.length != 0) &&
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} />}
      />
      }
    {(this.data.length == 0) &&
      <View style = {styles.noData}>
        <Text style = {styles.noDataText}>
       No food entries yet :(. Scan food or press the plus
        icon in the top right of your screen to add your 
        own entry.
        </Text>
      </View>
      }
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
    paddingTop: 20,
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 20,
    color: 'white',
    padding: 40,
  },
  list: {
    flex: 1,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    height: 100,
  },
  text: {
    marginLeft: 12,
    fontSize: 20,
    color: 'white',
  },
  sourceImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
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
  /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
});