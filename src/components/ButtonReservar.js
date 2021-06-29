import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

import Lottie from 'lottie-react-native'

const objReserva = {
    label: 'Reserva',
    icon: 'ticket-account',
    labelColor: '',
    backgroundColor: '#6a9cfd',
    api_name: 'reserva'
}

const ButtonReservar = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('ChoseOption', { item: objReserva })}
        >
            <Text style={styles.label}>
                {`Fazer\nReserva`}
            </Text>
            <Lottie
                source={require('../../assets/animation/ticket.json')}
                style={styles.animation}
                autoplay
                loop
                resizeMode='contain'
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        height: 100,
        marginTop: 15,
        width: '85%',
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#304D6D'
    },
    label: {
        fontSize: 20,
        fontFamily: 'WorkSans-Bold',
        color: '#fff'
    },
    animation: {
        width: 80,
        height: 80,
        transform: [
            { translateX: -30 },
            { translateY: -20 }
        ],
    }
});

export default ButtonReservar;