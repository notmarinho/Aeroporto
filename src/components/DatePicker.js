import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

//LB
import { lightFormat } from 'date-fns'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//CP
import { fonts, colors } from '../commounStyles';

const DatePicker = ({
    returnDate,
    returnTime,
    returnDateTime,
    mode,
    label,
}) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        console.log('SELECTED DATE ', selectedDate);
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        returnDate(lightFormat(currentDate, 'dd/MM/yyyy'))
        setDate(currentDate);
    };

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <View style={label ? styles.container : {}}>
            {label &&
                <Text style={styles.label}>
                    Data
                </Text>
            }
            <TouchableOpacity
                style={label ? styles.btnWithLabel : {}}
                onPress={handleShow}>
                <View style={styles.labelContainer}>
                    <Icon name='calendar' size={25} color={colors.primary} />
                    <Text style={styles.txtDate}>{lightFormat(date, 'dd/MM/yyyy')}</Text>
                </View>
                {show &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        transform: [{ translateX: 10 }],
        marginBottom: 20
    },
    btnWithLabel: {
        marginTop: 10,
    }, 
    label: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: colors.muttedText
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtDate: {
        fontFamily: fonts.bold,
        color: colors.muttedText,
        marginLeft: 5
    }
});

export default DatePicker;