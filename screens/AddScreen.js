import React, {
} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import Button from 'apsl-react-native-button';

/* Provides great facilities for forms, including set-up, data validation, stylying,
 * and so forth
 */
import t from 'tcomb-form-native';

Form = t.form.Form;

import {
 ImagePicker
} from "exponent";


FoodEntry = t.struct({
  name: t.String,              
  carbs: t.String,
  sugars: t.String,
  fats: t.String,
  proteins: t.String,
});

LABEL_COLOR = Colors.textFont;
INPUT_COLOR = Colors.textFont;
ERROR_COLOR = '#a94442';
HELP_COLOR = '#999999';
BORDER_COLOR = Colors.textFont;
DISABLED_COLOR = '#777777';
DISABLED_BACKGROUND_COLOR = '#eeeeee';
FONT_SIZE = 18;
FONT_WEIGHT = '500';

const weekDayMap = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const monthMap = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
/* make sure to initialize beforehand! */
const formStyles = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT,
      textAlign: 'center'
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT,
      textAlign: 'center'
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 30,
      padding: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 30,
      padding: 7,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 30,
      padding: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  select: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  pickerTouchable: {
    normal: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center'
    },
    error: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  pickerValue: {
    normal: {
      fontSize: FONT_SIZE,
      paddingLeft: 7
    },
    error: {
      fontSize: FONT_SIZE,
      paddingLeft: 7
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  dateTouchable: {
    normal: {},
    error: {}
  },
  dateValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5
    },
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5
    }
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 30,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});


options = {  
  stylesheet: formStyles,
  fields: {
    carbs: {
      label: 'Carbs (g)' 
    },
    sugars: {
      label: 'Sugars (g)' 
    },
    fats: {
      label: 'Fats (g)' 
    },
    proteins: {
      label: 'Proteins (g)' 
    },
  }
}

 

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


/* Good example of how to work with TextInput */
export default class AddScreen extends React.Component {



    static route = {
      navigationBar: {
      title: <Text style={{fontFamily: Fonts.textFont, fontSize: 18, color:  Colors.backgroundColor}}> Add Entry </Text>,
      backgroundColor: Colors.navBar,
      tintColor: Colors.navTint,
        renderLeft: (route, props) => <View style={{paddingLeft: 7}}><BackButton/></View>,
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
      source: this.props.route.params.source ? this.props.route.params.source : null,
      date: this.props.route.params.date ? this.props.route.params.date : null,
    };
  }

  onChange = (value)  => {
    this.setState({name: value.name, carbsText: value.carbs, sugarsText: value.sugars, 
      fatsText: value.fats, proteinsText: value.proteins});
  }
     


   _goToBook = () => {   
     // call getValue() to get the values of the form
    let value = this.refs.form.getValue();
    let source = this.state.source;
    let date = this.state.date;
    let uri = this.state.uri;
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of FormEntry
      // if no image put in, set question mark!
      if (source == null) {
        source = null;
        uri = require('../assets/images/question.png');
      } 
      if (this.state.date == null) {
        dateData = new Date();
      weekDay = weekDayMap[dateData.getDay(dateData)];
      month = monthMap[parseInt(dateData.getMonth())];
      day = dateData.getDate();
      hours = dateData.getHours();
      m = "AM";
      if (hours == 0) {
        hours = 12;
      }
      else if (hours >= 12) {
        m = "PM";
        if (hours > 12) {
          hours = hours - 12;
        }
      }
    minutes = dateData.getMinutes().toString();
    date = weekDay + " " + month + " " + day + 
      "\n"+ pad(hours) + ":" + pad(minutes) + " " + m;
        date = date;
      } 
    LogInformation.logs.unshift({date: date, name: this.state.name, carbs: this.state.carbsText, sugars: this.state.sugarsText,
      fats: this.state.fatsText, proteins: this.state.proteinsText, source: source, uri: uri});
      this.setState({ value: null });
      this.props.navigator.push(Router.getRoute('book'));
      return;
    }   
  }

    _pick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true,
      aspect: [4,3]
    });

      console.log(result);

      if (!result.cancelled) {
        this.setState({source: result.uri});
      }    
    }
  


    /* For most elements, styling beyond main facilities of element best to do
     * in surrouding view, at least for now lmao
     */
    render() {
    
      return (
        <View style={styles.container}>
          {this.state.source &&
                 <View style={styles.sourceImageView}>
                <Image source={{uri: this.state.source}} style={styles.sourceImage} />  
                </View>
          }
          {!this.state.source &&
              <View style={styles.sourceImageView}>
                   <Button style={styles.shareButton} onPress={this._pick}>
                    <FontAwesome 
                    name={'download'}
                    size={40}
                    color={Colors.tabSelected}
                    style = {{top: 20}}
                    />
                    </Button>
              </View>
              }
          <View style={styles.form}>
             <Form
              ref="form"
              value={{name: this.state.name, carbs: this.state.carbsText, 
                sugars: this.state.sugarsText, fats: this.state.fatsText, proteins: this.state.proteinsText}}
              type={FoodEntry}
              options={options}
              onChange={this.onChange}
            />
              <TouchableHighlight style={styles.button} onPress={this._goToBook} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Add to Log</Text>
              </TouchableHighlight>
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
  form: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
  },  
  picText: {
    color: 'white',
    height: 60,
    fontSize: 24,
    textAlign: 'center',
  },
  sourceImageView: {
    paddingTop: 20,
    alignItems: 'center',
  },
  /** if you want text to be centered when button is centered apply
    * padding to button view, not Text view
    */
  sourceImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
   buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  shareButton: {
    backgroundColor: Colors.background,
    borderColor: Colors.background,
    justifyContent: 'center',

  },
});