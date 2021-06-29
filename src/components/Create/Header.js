import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { fonts } from '../../commounStyles'

const Header = ({ title, onBackButtonPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onBackButtonPress ? onBackButtonPress : () => console.log('Nenhuma ação atribuida')}
                style={styles.btnBack}>
                <Icon
                    size={30}
                    name="arrow-left" />
            </TouchableOpacity>
            <Text style={styles.title}>
                {title ? title : 'Header Title'}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    btnBack: {
        width: 45,
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        transform: [
            { translateX: -5 },
            // { translateY: -5 }
        ]
    },
    title: {
        fontFamily: fonts.regular,
        fontSize: 30,
        marginLeft: 5,
    },
});

export default Header;