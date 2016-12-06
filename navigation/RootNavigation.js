import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Notifications,
} from 'exponent';

import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';

import {
  FontAwesome,
} from '@exponent/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';

export default class RootNavigation extends React.Component {
  componentDidMount() {
   // TODO: specify later
   // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
   // TODO: specify later
   // this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation
        tabBarHeight={56}
        initialTab="scan"
        >
        <TabNavigationItem
          id='scan'
          style = {styles.tab}
          selectedStyle = {styles.tab}
          renderIcon={isSelected => this._renderIcon('home', isSelected)}>
          <StackNavigation initialRoute='scan' />
        </TabNavigationItem>

         <TabNavigationItem
          id='log'
          style = {styles.tab}
          selectedStyle = {styles.tab}
          renderIcon={isSelected => this._renderIcon('wpforms', isSelected)}>
          <StackNavigation initialRoute='log' />
        </TabNavigationItem>

        <TabNavigationItem
          id='settings'
          style = {styles.tab}
          selectedStyle = {styles.tab}
          renderIcon={isSelected => this._renderIcon('cog', isSelected)}>
          <StackNavigation initialRoute='settings' />
        </TabNavigationItem>
      </TabNavigation>
    );
  }


  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={30}
        color={isSelected ? Colors.tabIconSelected : "white"}
      />
    );
  }

 /* _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({origin, data}) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  } */

}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#7F7F7F',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});