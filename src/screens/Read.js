import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import apiService from '../api/api'
import { colors, fonts } from '../commounStyles';

import Aeroporto from '../components/Cards/Aeroporto';
import Voo from '../components/Cards/Voo';
import Aeronave from '../components/Cards/Aeronave';
import Instancia from '../components/Cards/Instancia';
import Trecho from '../components/Cards/Trecho';
import Tarifa from '../components/Cards/Tarifa';
import Tipo from '../components/Cards/Tipo';
import Pousar from '../components/Cards/Pousar';
import Reserva from '../components/Cards/Reserva';


const EmptyComponent = () => {
    return (
        <View style={styles.emptyContainer}>
            <Image
                source={require('../../assets/imgs/AirportArea.png')}
                style={styles.imgEmpty}
                resizeMode='contain'
            />
            <Text style={styles.titleBold}>Nada foi encontrado!</Text>
            <Text style={styles.description}>Tente adicionar algum registro para que ele seja visualizado nesta pagina.</Text>
        </View>
    )
}

const Read = ({ route, navigation }) => {
    const { item } = route.params
    const { api_name } = item
    const [data, setData] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getItems()
        });
        return unsubscribe;
    }, [navigation]);

    const getItems = async () => {
        await apiService.get(`/${api_name}`)
            .then(({ data }) => setData(data))
            .catch((error) => console.error(error))
    }

    const deleteItem = async (item) => {
        const { codigo_aeroporto, tipo_aeronave, numero, numero_voo, codigo, numero_trecho } = item;
        let config = { data: {} }
        switch (api_name) {
            case 'aeroporto':
                config = { data: { codigo_aeroporto } }
                break
            case 'voo':
                config = { data: { numero_voo } }
                break
            case 'aero':
                config = { data: { tipo: tipo_aeronave } }
                break
            case 'instancia':
                config = { data: { numero: numero_voo } }
                break
            case 'trecho':
                config = { data: { numero } }
                break
            case 'tarifa':
                config = { data: { numero } }
                break
            case 'reserva':
                config = { data: { numero: numero_voo } }
                break
            case 'pousar':
                config = { data: { codigo } }
                break
        }
        await apiService.delete(api_name, {}, config).then(getItems);
    }

    const handleDelete = (item) => {
        Alert.alert(
            "Deletar",
            "Você deseja deletar este item?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => deleteItem(item) }
            ]
        );
    }

    console.log(data);

    const cardSelector = ({ item: objToEdit }) => {
        console.log('API NAME: ', api_name);
        switch (api_name) {
            case 'aeroporto':
                return <Aeroporto objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
            case 'voo':
                return <Voo objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
            case 'aero':
                return <Aeronave objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
            case 'instancia':
                return <Instancia objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
            case 'trecho':
                return <Trecho objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
            case 'tarifa':
                return <Tarifa objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
            case 'tipo':
                return <Tipo objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
            case 'pousar':
                return <Pousar objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
            case 'reserva':
                return <Reserva objToEdit={objToEdit} deleteItem={handleDelete} tipoObj={item} navigation={navigation} />
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                ListEmptyComponent={<EmptyComponent />}
                contentContainerStyle={{ flex: 1, alignItems: 'center', paddingVertical: 50, }}
                data={data}
                keyExtractor={(_, idx) => idx}
                renderItem={cardSelector} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    emptyContainer: {
        marginTop: 100,
        width: '100%',
        height: 300,
        alignItems: 'center',
    },
    imgEmpty: {
        width: '100%',
        height: 150
    },
    titleBold: {
        marginTop: 20,
        // marginBottom: 5,
        fontSize: 20,
        fontFamily: fonts.bold,
        color: colors.muttedText
    },
    description: {
        fontSize: 14,
        fontFamily: fonts.regular,
        color: colors.muttedText,
        textAlign: 'center',
        paddingHorizontal: 20,
    }
});

export default Read;