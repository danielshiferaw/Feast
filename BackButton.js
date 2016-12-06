import React from 'react';
import { Text } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

@withNavigation
export default class BackButton extends React.Component {
  render() {
    return <Text onPress={this._goBack}>Go back</Text>
  }

  _goBack = () => {
    if (this.props.navigator.getCurrentIndex() > 0) {
      this.props.navigator.pop();
    }
  }
}