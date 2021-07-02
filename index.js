/**
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import { AppRegistry } from 'react-native';
import Home from './src/screens/Create'
import Routes from './src/routes'
import { name as appName } from './app.json';

const App = () => {
    return (
        <SafeAreaProvider>
            <Routes />
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaProvider>
    )
}

AppRegistry.registerComponent(appName, () => App);
