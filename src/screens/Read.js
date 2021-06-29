import React, { useState, useEffect } from 'react';
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
import apiService from '../api/api'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors, fonts } from '../commounStyles';

const CardComponent = ({ objToEdit, deleteItem, navigation, tipoObj }) => {
    const handleNavigation = () => {
        navigation.navigate('Create', { item: tipoObj, editObj: objToEdit })
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.infoContainer}>
                <Text>Aeroporto: {objToEdit.nome}</Text>
                <Text>Cidade: {objToEdit.cidade}</Text>
                <Text>Estado: {objToEdit.estado}</Text>
                <Text>Codigo: {objToEdit.codigo_aeroporto}</Text>
            </View>
            <View style={styles.btnsContainer}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => deleteItem(objToEdit)}>
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

    useEffect(() => getItems(), [])

    const getItems = async () => {
        await apiService.get(`/${api_name}`)
            .then(({ data }) => {
                console.log(`Called API: ${api_name}\n `);
                console.log('DATA: ', data);
                setData(data)
            })
            .catch((error) => console.error(error))
    }

    const deleteItem = async (item) => {
        console.log('ITEM A SER DELETADO\n', item);
        console.log('API: ', api_name)
        switch (api_name) {
            case 'aeroporto':
                console.log({ codigo_aeroporto: "006854" })
                await apiService.delete(`/aeroporto`, {}, { data: { codigo_aeroporto: item.codigo_aeroporto } })
                    .then(res => console.log(res))
                    .catch(e => console.error(e))
                break
            case 'voo':
                await apiService.delete(api_name, { numero: item.numero }).then(res => console.log(res));
                break
            case 'tipo':
                await apiService.delete(api_name, { tipo: item.tipo }).then(res => console.log(res));
                break
            case 'aero':
                await apiService.delete(api_name, { tipo: item.tipo }).then(res => console.log(res));
                break
            case 'instancia':
                await apiService.delete(api_name, { numero: item.numero }).then(res => console.log(res));
                break
            case 'trecho':
                await apiService.delete(api_name, { codigo: item.codigo }).then(res => console.log(res));
                break
            case 'pousar':
                await apiService.delete(api_name, { codigo: item.codigo }).then(res => console.log(res));
                break
            case 'tarifa':
                await apiService.delete(api_name, { numero: item.numero }).then(res => console.log(res));
                break
            case 'reserva':
                await apiService.delete(api_name, { numero: item.numero }).then(res => console.log(res));
                break
        }
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

    return (
        <View style={styles.container}>
            <FlatList
                ListEmptyComponent={<EmptyComponent />}
                contentContainerStyle={{ alignItems: 'center', paddinVertical: 30 }}
                data={data}
                keyExtractor={(_, idx) => idx}
                renderItem={({ item: objToEdit }) =>
                    <CardComponent
                        objToEdit={objToEdit}
                        deleteItem={handleDelete}
                        tipoObj={item}
                        navigation={navigation} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
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