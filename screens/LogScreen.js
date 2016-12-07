import React, {
} from 'react';

import {
  ART,
  ScrollView,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';

const {
  Group,
  Shape,
  Surface,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
  scale,
  shape,
};

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

const PaddingSize = 20;
const TickWidth = PaddingSize*2;

const dimensionWindow = Dimensions.get('window');



class LogGraph extends React.Component {

    

  constructor() {
    super();
  {/* Note; A JavaScript date can be written as a string: Wed Dec 07 2016 04:15:07 GMT-0800 (PST) or as a number: 1481112907590.
    * new Date() uses current date and time. Simpler: October 13, 2014 11:13:00.
    * Here is how you can set Dates in Javascript from year -> second. 
    * good example of modern collection work and for loops too.
    * Aside:  good example of type conversions and splitting on whitespace. 
    * does not include leading/trailing whitespace. can do .match(/\S+/g) to get all non-whitespace 
    * chars matched. if no matches, returns null so instead do str.match(/\S+/g) || []
    */}
    data = []
    values = [260, 300, 330, 300, 310, 290, 260, 210, 180, 100, 100, 120, 140, 170, 200, 210, 190, 160, 150, 170, 200, 230, 270, 290];
    days = [9];
    for (let day in days) {
      for (let i = 0; i < 24; i = i + 3) {
        date = "December " + day.toString() + ", " + "2016 " + i.toString() + ":00:00";
        data.push({date: new Date(date), value: values[i]});
      }
    }

    
  
    /* Work around to get horizontal scrolling: assume some width to start */
    graphWidth = Math.round(dimensionWindow.width*.9) - PaddingSize*2;
    graphHeight = Math.round(dimensionWindow.height * .6) - PaddingSize * 2;


    // we'll have PaddingSize pixels for each data point horizontally

    // create D3 scale time object for x-axis for graph
    scaleX = d3.scale.scaleTime()
      .domain([data[0]["date"], data[data.length -1 ].date])
      .range([0, graphWidth]);

  

    allYValues = data.reduce((all, datum) => {
      all.push(datum.value);
      return all;
     }, []);
    // Get the min and max y value from array of values, easily (maybe map?)?
    extentY = d3Array.extent(allYValues);

    // create D3 scale linear object for y-axis for graph
    scaleY =  d3.scale.scaleLinear()
      .domain([extentY[0], extentY[1]]).nice()
      // We invert our range so it outputs using the axis that React uses.
      .range([graphHeight, 0]);


    lineShape = d3.shape.line()
    .x((data) => scaleX(data.date))
    .y((data) => scaleY(data.value))

    this.state = {
      graphUtils: 
      {data,
          scale: {
            x: scaleX,
            y: scaleY,
          },
          path: lineShape(data),
          height: graphHeight,
          width: graphWidth,
          ticks: data.map((datum) => {
            const time = datum.date;
            const value = datum.value;
      
            return {
              x: scaleX(time),
              y: scaleY(value),
              datum,
            };
          }),
       }
    }
  }
 

  render() {
    const {graphUtils} = this.state;
    const {
      x : scaleX,
    } = graphUtils.scale;



    return ( <View style={styles.container}>
        <View style={styles.graph}>
        <Surface width={graphUtils.width} height={graphUtils.height}>
          <Group x={0} y={0}>
            <Shape
              d={graphUtils.path}
              stroke={'yellow'}
              strokeWidth={1}
            />
          </Group>
        </Surface>
        </View>


      <View key={'ticksX'}>
          {graphUtils.ticks.map((tick, index) => {
            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - (TickWidth / 2);
            /* good example of type conversions */
            dateData = tick.datum.date;
            month = parseInt(dateData.getMonth()) + 1;
            month = month.toString() + "-";
            day = dateData.getDate() + " ";
           // year = dateData.getFullYear();
            hours = dateData.getHours() + ":00";
            date = month + day /* year */ + hours;
            return (
              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
                {date}
              </Text>
            );
          })}
        </View>

          <View key={'ticksY'} style={styles.ticksYContainer}>
          {graphUtils.ticks.map((tick, index) => {
            const value = tick.datum.value;

            const tickStyles = {};
            tickStyles.width = TickWidth;
            tickStyles.left = tick.x - Math.round(TickWidth * 0.5);

            tickStyles.top = tick.y + 2 - Math.round(TickWidth * 0.65);

            return (
              <View key={index} style={[styles.tickLabelY, tickStyles]}>
                <Text style={styles.tickLabelYText}>
                  {value}{}
                </Text>
              </View>
            );
          })}
        </View>

        <View key={'ticksYDot'} style={styles.ticksYContainer}>
          {graphUtils.ticks.map((tick, index) => (
            <View
              key={index}
              style={[styles.ticksYDot, {
                left: tick.x,
                top: tick.y,
              }]}
            />
          ))}
        </View>
        </View>
      )
  }
}

    
@withNavigation
class AddButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>
    <TouchableOpacity onPress={this._goToAdd}>
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

   _goToAdd = () => {
    this.props.navigator.push(Router.getRoute('add'));
  }
}

 


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

export default class LogScreen extends React.Component {

    static route = {
      navigationBar: {
        title: 'CGM Log',
        backgroundColor: 'grey',
        tintColor: '#fff',
        renderLeft: (route, props) => <BookButton/>,
        renderRight: (route, props) => <AddButton/>
  }
}
     



    render() {
      
      return (
        <View style={styles.container}>
      {/* note: always need to have one final view rendered */}
      {/* note: for scrollview can only apply, I believe, justifyContent and alignItems attributes via
        * contentContainerStyle options
      */}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true} contentContainerStyle={styles.scroll} 
        >
        <View style={{padding: 30}}>
        <Text style={styles.bloodGlucoseText}>
        g/dl
        </Text>
        <LogGraph/>  
        </View>
      </ScrollView>
      <Text style={styles.dateText}>
        Time
      </Text>
      </View>
    );
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
  },
  scroll: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
  graph: {
    paddingBottom: 80,
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
