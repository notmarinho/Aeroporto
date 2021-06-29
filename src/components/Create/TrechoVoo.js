import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

//LB
import {
    Input,
    Button,
    Text
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//CP
import apiService from '../../api/api'
import { colors, fonts } from '../../commounStyles';
import DateTimePicker from '../DatePicker'
import Picker from '../Picker'

const defaultObject = {
    numero_voo: '',
    numero_trecho: '',
    codigo_aeroporto_partida: '',
    codigo_aeroporto_chegada: '',
    horario_partida_previsto: new Date(),
    horario_chegada_previsto: new Date(),
};

const TrechoVoo = ({ api_name, editObj }) => {
    useEffect(() => {
        getAeroportos()
        getVoos()
    }, [])

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [showClocks, setShowClocks] = useState({ chegada: false, partida: false });
    const [aeroportos, setAeroportos] = useState([])
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

    return (
        <View style={styles.container}>
            <View>
                <Input
                    label='Numero do Trecho'
                    keyboardType='number-pad'
                    value={info.numero_trecho}
                    onChangeText={numero_trecho => setInfo({ ...info, numero_trecho })}
                />
                <Picker
                    field='companhia_aerea'
                    showLabel
                    label='Número do Voo'
                    data={voos}
                    returnItem={(item) => setInfo({ ...info, numero_voo: item.numero_voo })}
                />
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
            </View>
            <Button
                buttonStyle={{ height: 48, borderRadius: 5 }}
                iconRight
                onPress={handleRegister}
                loading={loading}
                title="Registrar"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
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

export default TrechoVoo;