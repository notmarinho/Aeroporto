import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeScreen from './screens/Home'
import CreateScreen from './screens/Create'
import ChoseOptionsScreen from './screens/ChoseOption';
import ReadScreen from './screens/Read'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Create" component={CreateScreen} />
                <Stack.Screen name="ChoseOption" component={ChoseOptionsScreen} />
                <Stack.Screen name="Read" component={ReadScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}