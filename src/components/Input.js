import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import Autocomplete from 'react-native-autocomplete-input';

const Input = ({
    label,
    placeholder,
    onButtonPress,
    showButton,
    value,
    onChangeText,
    loading,
    keyboardType,
    autoComplete,
    autoCompleteData,
    onFocus
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.labelFont}>
                {label ? label : 'Label'}
            </Text>
            <View style={styles.inputContainer}>
                {autoComplete
                    ? <Autocomplete
                        value={value}
                        data={autoCompleteData}
                        onChangeText={onChangeText}
                        flatListProps={{
                            keyExtractor: (_, idx) => idx,
                            renderItem: ({ item }) => <Text>{item}</Text>
                        }}
                    />
                    : <TextInput
                        onFocus={onFocus}
                        onChangeText={onChangeText}
                        value={value}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        style={styles.input} />
                }
                {showButton &&
                    <TouchableOpacity
                        onPress={() => onButtonPress(value)}
                        style={styles.btnInput}>
                        {loading &&
                            <ActivityIndicator animating color='#fff' />
                        }
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 73,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    inputContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        alignItems: 'center',
    },
    labelFont: {
        fontWeight: 'bold',
        color: '#C7C7C7'
    },
    input: {
        height: 50,
        borderRadius: 8,
        fontSize: 16,
        padding: 15,
        flex: 1,
    },
    btnInput: {
        width: 45,
        height: 45,
        borderRadius: 8,
        backgroundColor: '#1500FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    }
})
