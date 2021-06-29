import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { colors, fonts } from '../commounStyles';


const PickerComponent = ({
    data,
    returnItem,
    label,
    showLabel,
    field
}) => {
    const [selectedItem, setSelectedItem] = useState();
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
                // label='Aeroporto'
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