import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import FoodScreen from '../screens/FoodScreen';
import LogScreen from '../screens/LogScreen';
import ScanScreen from '../screens/ScanScreen'
import SettingsScreen from '../screens/SettingsScreen';
import SocialScreen from '../screens/SocialScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  food: () => FoodScreen,
  log: () => LogScreen,
  scan: () => ScanScreen,
  settings: () => SettingsScreen,
  social: () => SocialScreen,
  rootNavigation: () => RootNavigation,
}));
