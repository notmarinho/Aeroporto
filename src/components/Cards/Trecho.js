import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default CardComponent = ({ objToEdit: item, deleteItem, navigation, tipoObj }) => {

    const handleNavigation = () => navigation.navigate('Create', { item: tipoObj, editObj: item })

    return (
        <View style={styles.cardContainer}>
            <View style={styles.infoContainer}>
                <Text>Trecho: {item.numero_trecho}</Text>
                <Text>Voo: {item.numero_voo}</Text>
                <Text>Partida: {item.horario_partida_previsto}</Text>
                <Text>Chegada: {item.horario_chegada_previsto}</Text>
            </View>
            <View style={styles.btnsContainer}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => deleteItem(item)}>
                    <Icon
                        name='delete-outline'
                        size={25}
                        color='red'
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleNavigation}>
                    <Icon
                        name='pencil-outline'
                        size={25}
                        color='blue'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.9,
        height: 100,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        marginVertical: 5,
        padding: 10,
        paddingHorizontal: 15,
    },
    infoContainer: {
        flex: 2
    },
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});