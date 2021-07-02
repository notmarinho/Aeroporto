import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ButtonHome = ({ item, navigation }) => {
    const navigationHandle = () => {
        navigation.navigate('ChoseOption', { item })
    }

    return (
        <TouchableOpacity
            onPress={navigationHandle}
            style={{ ...styles.container, backgroundColor: item.backgroundColor ? item.backgroundColor : '#FFAEBC' }}>
            <Icon
                name={item.icon ? item.icon : 'rocket'}
                color='#fff'
                size={20}
            />
            <Text style={styles.label}>
                {item.label.toUpperCase()}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.81 / 3,
        height: SCREEN_WIDTH * 0.81 / 3,
        margin: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    label: {
        fontSize: 14,
        fontFamily: 'WorkSans-Regular',
        letterSpacing: 1.2,
        color: '#fff',
        textAlign: 'center',
        marginTop: 5
    }
});

export default ButtonHome;

