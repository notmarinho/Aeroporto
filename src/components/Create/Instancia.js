import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

//LB
import { Input, Button, } from 'react-native-elements';
import { lightFormat } from 'date-fns'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

//CP
import apiService from '../../api/api'
import { colors, fonts } from '../../commounStyles';
import DateTimePicker from '../DatePicker'
import Picker from '../Picker'

const defaultObject = {
    numero_voo: '',
    numero_trecho: '',
    data_: lightFormat(new Date(), 'dd/MM/yyyy'),
    numero_assento_disponivel: '',
    codigo_aeronave: '',
    codigo_aeroporto_partida: '',
    codigo_aeroporto_chegada: '',
    horario_partida: lightFormat(new Date(), 'dd/MM/yyyy'),
    horario_chegada: lightFormat(new Date(), 'dd/MM/yyyy'),
};

const Instancia = ({ api_name, editObj, navigation }) => {
    useEffect(() => {
        getAeroportos()
        getVoos()
        getAeronaves()
        getTrecho()
    }, [])

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [editedData, setEditedData] = useState({});
    const [originalState, setOriginalState] = useState(editObj);
    const [aeroportos, setAeroportos] = useState([])
    const [aeronaves, setAeronaves] = useState([])
    const [trechos, setTrechos] = useState([])
    const [voos, setVoos] = useState([])

    const handleRegister = async () => {
        await apiService.post(api_name, info)
            .then(callToastMessage)
            .then(goBack)
            .catch((error) => console.error(error))
    }

    const goBack = () => {
        navigation.goBack()
    }

    const handleUpdate = async () => {
        await apiService.put(`/${api_name}/${originalState.numero_voo}`, editedData)
            .then((response) => console.log(response))
            .then(goBack)
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const getAeroportos = async () => {
        await apiService.get(`/aeroporto`)
            .then(({ data }) => setAeroportos(data))
            .catch((error) => console.error(error))
    }

    const getVoos = async () => {
        await apiService.get(`/voo`)
            .then(({ data }) => setVoos(data))
            .catch((error) => console.error(error))
    }

    const getAeronaves = async () => {
        await apiService.get(`/aero`)
            .then(({ data }) => setAeronaves(data))
            .catch((error) => console.error(error))
    }

    const getTrecho = async () => {
        await apiService.get(`/trecho`)
            .then(({ data }) => setTrechos(data))
            .catch((error) => console.error(error))
    }

    const callToastMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: `Instânica criada com sucesso!`,
            visibilityTime: 2000,
            autoHide: true,
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Picker
                    field='numero_trecho'
                    showLabel
                    label='Número do Trecho'
                    data={trechos}
                    returnItem={({
                        numero_trecho,
                        codigo_aeroporto_chegada,
                        codigo_aeroporto_partida,
                        horario_chegada_previsto,
                        horario_partida_previsto,
                        numero_voo,
                    }) => {
                        setEditedData({
                            ...editedData,
                            numero_trecho,
                            numero_voo,
                            horario_partida: horario_partida_previsto,
                            horario_chegada: horario_chegada_previsto,
                            codigo_aeroporto_chegada,
                            codigo_aeroporto_partida
                        }),
                            setInfo({
                                ...info,
                                numero_trecho,
                                numero_voo,
                                horario_partida: horario_partida_previsto,
                                horario_chegada: horario_chegada_previsto,
                                codigo_aeroporto_chegada,
                                codigo_aeroporto_partida
                            })
                    }}
                />
                <Picker
                    field='codigo_aeronave'
                    showLabel
                    label='Código da Aeronave'
                    data={aeronaves}
                    returnItem={({ codigo_aeronave }) => { setEditedData({ ...editedData, codigo_aeronave }), setInfo({ ...info, codigo_aeronave }) }}
                />
                <Input
                    label='Assentos Disponíveis'
                    placeholder='Ex: 25'
                    keyboardType='number-pad'
                    value={info.numero_assento_disponivel}
                    onChangeText={numero_assento_disponivel => { setEditedData({ ...editedData, numero_assento_disponivel }), setInfo({ ...info, numero_assento_disponivel }) }}
                />
                <DateTimePicker
                    initialDate={editObj ? editObj.data_ : null}
                    label='Data'
                    mode='date'
                    returnDate={(data_) => { setEditedData({ ...editedData, data_ }), setInfo({ ...info, data_ }) }} />
            </View>
            <Button
                buttonStyle={{ height: 48, borderRadius: 5 }}
                iconRight
                onPress={editObj ? handleUpdate : handleRegister}
                loading={loading}
                title={editObj ? "Atualizar " : "Registrar "}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15
    },
    airportContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    boxContainer: {
        flex: 1,
    },
    boxTitle: {
        fontFamily: fonts.bold,
        color: '#85949d',
        fontSize: 14.5,
        paddingLeft: 10
    },
    hourContainer: {
        flex: 1,
        transform: [
            { translateY: 33 },
            { translateX: -15 }
        ],
        alignItems: 'flex-end',
    }
});

export default Instancia;