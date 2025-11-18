console.log('=== INDEX.JS IS LOADING ===');
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.log('=== REGISTERING COMPONENT ===');
AppRegistry.registerComponent(appName, () => App);
console.log('=== COMPONENT REGISTERED ===');