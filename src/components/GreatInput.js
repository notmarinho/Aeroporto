import React, { useCallback, useMemo, useRef } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { fonts } from '../commounStyles';

const GratInput = ({ onChangeText, label, value, placeholder, icon, keyboardType, onPress }) => {
    // ref
    const inputRef = useRef();

    return (
        <>
            <Pressable
                onPress={() => onPress ? onPress() : inputRef.current.focus()}
                style={styles.container}>
                <View style={styles.iconContainer}>
                    <Icon
                        name={icon}
                        size={25}
                        color='#516BFF' />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>{label}</Text>
                    <TextInput
                        editable={onPress ? false : true}
                        value={value}
                        keyboardType={keyboardType}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        ref={inputRef}
                        style={styles.input} />
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        marginBottom: 15,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: '#eceff1'
    },
    label: {
        fontFamily: fonts.bold,
        color: '#8F8F94',
        fontSize: 13,
        opacity: 0.7
    },
    inputContainer: {
        paddingLeft: 20,
        width: '100%',
        height: '100%'
    },
    input: {
        fontSize: 18,
        fontFamily: fonts.bold,
        color: "#303030",
        padding: 0,
        width: '100%'
    }
});

export default GratInput;