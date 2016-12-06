import React from 'react';

import {
  Image,
  View,
} from 'react-native';



export default class FeastLogo extends React.Component {

  render() {
    return (
        <Image
        source = {require('../assets/images/feast_banner.png')}
        />
      );
    }
}