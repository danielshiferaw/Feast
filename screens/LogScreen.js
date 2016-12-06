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
const TickWidth = PaddingSize * 2;
const AnimationDurationMs = 500;

const dimensionWindow = Dimensions.get('window');



class LogGraph extends React.Component {

    

  constructor() {
    super();
    data = [

    {date: new Date(2016, 11, 1), value: 150},
    {date: new Date(2016, 11, 2), value: 100},
    {date: new Date(2016, 11, 3), value: 200},
    {date: new Date(2016, 11, 4), value: 50},
    {date: new Date(2016, 11, 5), value: 100},
    {date: new Date(2016, 11, 6), value: 250},
    {date: new Date(2016, 11, 7), value: 150},
    {date: new Date(2016, 11, 8), value: 200},
    {date: new Date(2016, 11, 9), value: 150},
    {date: new Date(2016, 11, 10), value: 100},
  ];
  
    graphWidth = Math.round(dimensionWindow.width * 0.9) - PaddingSize * 2;
    graphHeight = Math.round(dimensionWindow.height * 0.5) - PaddingSize * 2;


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

    const tickXFormat = scaleX.tickFormat(null, '%b %d');




    return ( <View style={styles.container}>
      {tickXFormat}
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

            return (
              <Text key={index} style={[styles.tickLabelX, tickStyles]}>
                {tickXFormat(tick.datum.date)}
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
                  {value}
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
class BackButton extends React.Component {
  render() {
  return (
    <View style = {{alignItems: "center"}}>
    <TouchableOpacity onPress={this._goBack}>
   {/* need to have text inside of Touchable Opacity for callbuck func to work, I believe  with text in it*/}
     <Text style={styles.hiddenText}>"          "</Text>
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

/* Get data you need for line graph! */
export default class LogScreen extends React.Component {

    static route = {
      navigationBar: {
        title: 'Log',
        backgroundColor: 'grey',
        tintColor: '#fff',
        renderLeft: (route, props) => <BackButton/>
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
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            alwaysBounceVertical={true} contentContainerStyle={styles.scroll} 
        >
        <LogGraph/>  
      </ScrollView>
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
  button: {
    marginTop: 150,
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 36,
  },
  logText: {
    color: 'green',
    textAlign: 'center',
    fontSize: 36,
  },
    /* hack to make sure text for back button does not show */
  hiddenText: {
    color: "#4c4c4c",
    fontSize: 10,
  },
  graph: {
    paddingBottom: 40,
  }

});
