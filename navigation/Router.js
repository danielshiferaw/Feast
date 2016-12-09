import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import FoodScreen from '../screens/FoodScreen';
import LogScreen from '../screens/LogScreen';
import ScanScreen from '../screens/ScanScreen'
import SettingsScreen from '../screens/SettingsScreen';
import AddScreen from '../screens/AddScreen';
import BookScreen from '../screens/BookScreen';
import ScanCheckScreen from '../screens/ScanCheckScreen';
import FoodEntryScreen from '../screens/FoodEntryScreen';


import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  food: () => FoodScreen,
  log: () => LogScreen,
  scan: () => ScanScreen,
  scanCheck: () => ScanCheckScreen,
  settings: () => SettingsScreen,
  add: () => AddScreen,
  book: () => BookScreen,
  rootNavigation: () => RootNavigation,
  foodEntry: () => FoodEntryScreen,
}));
