/**
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { AppRegistry } from 'react-native';
import Home from './src/screens/Create'
import Routes from './src/routes'
import { name as appName } from './app.json';

const App = () => {
    return (
        <SafeAreaProvider>
            <Routes />
        </SafeAreaProvider>
    )
}

AppRegistry.registerComponent(appName, () => App);
