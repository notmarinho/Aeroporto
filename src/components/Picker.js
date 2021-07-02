import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import _ from 'lodash';
import { Picker } from '@react-native-picker/picker';
import { colors, fonts } from '../commounStyles';
import { useFocusEffect } from '@react-navigation/native';

const PickerComponent = ({
    data,
    returnItem,
    label,
    showLabel,
    field,
    initialValue,
    fieldFilter,
}) => {
    useEffect(() => {
        if (initialValue) {
            findOBJ()
        }
    }, [])
    const [selectedItem, setSelectedItem] = useState();

    const findOBJ = () => {
        const item = _.find(data, { [fieldFilter]: initialValue })
        console.log('INITIAL VALUE: ', item);
        setSelectedItem(item)
    }

    const handleChange = (item, index) => {
        returnItem(item)
        setSelectedItem(item)
    }

    return (
        <View style={{ ...styles.container, marginBottom: showLabel ? 15 : 0 }}>
            {showLabel &&
                <Text style={styles.label}>
                    {label}
                </Text>
            }
            <Picker

                selectedValue={selectedItem}
                onValueChange={handleChange}
                mode='dropdown'
                fontFamily={fonts.regular}>
                {[{ [field]: showLabel ? 'Selecionar' : label }, ...data].map(item => {
                    return <Picker.Item
                        key={item}
                        label={item[field]}
                        value={item} />
                })}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    pickerContainer: {
        flexDirection: 'row',
    },
    label: {
        paddingLeft: 9,
        fontSize: 16,
        fontFamily: fonts.bold,
        color: colors.muttedText
    }
});

export default PickerComponent;