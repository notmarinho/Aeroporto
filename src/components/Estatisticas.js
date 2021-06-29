import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';
import { fonts } from '../commounStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const Estatisticas = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.value}>0</Text>
                <Text style={styles.label}>AVIÕES</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.value}>0</Text>
                <Text style={styles.label}>AEROPORTOS</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.value}>0</Text>
                <Text style={styles.label}>VOOS</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: SCREEN_WIDTH,
        paddingHorizontal: 20,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    value: {
        fontSize: 25,
        color: '#979dac',
        fontFamily: fonts.bold
    },
    label: {
        fontSize: 16,
        fontFamily: fonts.light,
    }
});

export default Estatisticas;