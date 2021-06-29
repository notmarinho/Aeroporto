import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

//LB
import {
    Input,
    Button,
    Text,
} from 'react-native-elements';

//LB
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightFormat } from 'date-fns'

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

const Instancia = ({ api_name, editObj }) => {
    useEffect(() => {
        getAeroportos()
        getVoos()
        getAeronaves()
        getTrecho()
    }, [])

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [showClocks, setShowClocks] = useState({ chegada: false, partida: false });
    const [aeroportos, setAeroportos] = useState([])
    const [aeronaves, setAeronaves] = useState([])
    const [techos, setTrechos] = useState([])
    const [voos, setVoos] = useState([])

    const handleRegister = async () => {
        setLoading(true)
        console.log('DATA SEND\n', info);
        await apiService.post(`/${api_name}`, info)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const handleUpdate = async () => {
        await apiService.put(`/${api_name}`, info)
            .then((response) => console.log(response))
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

    return (
        <ScrollView>
            <Picker
                field='numero_trecho'
                showLabel
                label='Número do Trecho'
                data={voos}
                returnItem={(item) => setInfo({ ...info, numero_trecho: item.numero_voo })}
            />
            <Picker
                field='companhia_aerea'
                showLabel
                label='Número do Voo'
                data={voos}
                returnItem={(item) => setInfo({ ...info, numero_voo: item.numero_voo })}
            />
            <Picker
                field='codigo_aeronave'
                showLabel
                label='Código da Aeronave'
                data={aeronaves}
                returnItem={(item) => setInfo({ ...info, codigo_aeronave: item.numero_voo })}
            />
            <Input
                label='Assentos Disponíveis'
                placeholder='Ex: 25'
                keyboardType='number-pad'
                value={info.numero_assento_disponivel}
                onChangeText={numero_assento_disponivel => setInfo({ ...info, numero_assento_disponivel })}
            />
            <DateTimePicker
                label='Data'
                mode='date'
                returnDate={(data_) => setInfo({ ...info, data_ })} />
            <View style={styles.airportContainer}>
                <View style={styles.boxContainer}>
                    <Text style={styles.boxTitle}>Partida</Text>
                    <Picker
                        // icon={'airport'}
                        field='nome'
                        label='Aeroporto'
                        data={aeroportos}
                        returnItem={(item) => setInfo({ ...info, codigo_aeroporto_partida: item.codigo_aeroporto })} />
                </View>
                <View style={styles.hourContainer}>
                    <DateTimePicker
                        mode='date'
                        returnDate={(horario_partida_previsto) => setInfo({ ...info, horario_partida_previsto })} />
                </View>
            </View>
            <View style={{ ...styles.airportContainer, marginTop: 15 }}>
                <View style={styles.boxContainer}>
                    <Text style={styles.boxTitle}>Chegada</Text>
                    <Picker
                        field='nome'
                        icon={'airport'}
                        label='Aeroporto'
                        data={aeroportos}
                        returnItem={(item) => setInfo({ ...info, codigo_aeroporto_chegada: item.codigo_aeroporto })} />
                </View>
                <View style={styles.hourContainer}>
                    <DateTimePicker
                        mode='date'
                        returnDate={(horario_chegada_previsto) => setInfo({ ...info, horario_chegada_previsto })} />
                </View>
            </View>
            <Button
                buttonStyle={{ height: 48, borderRadius: 5 }}
                iconRight
                onPress={handleRegister}
                loading={loading}
                title="Registrar"
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between'
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