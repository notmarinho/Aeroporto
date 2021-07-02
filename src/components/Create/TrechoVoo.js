import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

//LB
import { Input, Button, Text } from 'react-native-elements';
import { lightFormat } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import AnotherPicker from '@react-native-picker/picker'

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
    horario_partida_previsto: lightFormat(new Date(), 'dd/MM/yyyy'),
    horario_chegada_previsto: lightFormat(new Date(), 'dd/MM/yyyy'),
};

const TrechoVoo = ({ api_name, editObj, navigation }) => {
    useEffect(() => {
        getAeroportos()
        getVoos()
    }, [])

    const [loading, setLoading] = useState(false);
    const [originalState, setOriginalState] = useState(editObj);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [showClocks, setShowClocks] = useState({ chegada: false, partida: false });
    const [aeroportos, setAeroportos] = useState([])
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
        await apiService.put(`${api_name}/${originalState.numero_trecho}`, info)
            .then((response) => console.log(response))
            .then(goBack)
            .catch((error) => console.error(error))
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

    const callToastMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: `Trecho criado com sucesso!`,
            visibilityTime: 2000,
            autoHide: true,
        });
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
                {/* <AnotherPicker>
                    {voos.map((item) => {
                        return (
                            <AnotherPicker.Item
                                mode='dropdown'
                                onValueChange={(item, index) => console.log(item, index)}
                                key={item} />
                        )
                    })}
                </AnotherPicker> */}
                <Picker
                    field='companhia_aerea'
                    fieldFilter='numero_voo'
                    showLabel
                    initialValue={editObj ? editObj.numero_voo : null}
                    label='Número do Voo'
                    data={voos}
                    returnItem={(item) => setInfo({ ...info, numero_voo: item.numero_voo })}
                />
                <View style={styles.airportContainer}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxTitle}>Partida</Text>
                        <Picker
                            // icon={'airport'}
                            fieldFilter='codigo_aeroporto'
                            initialValue={editObj ? editObj.codigo_aeroporto_partida : null}
                            field='nome'
                            label='Aeroporto'
                            data={aeroportos}
                            returnItem={(item) => setInfo({ ...info, codigo_aeroporto_partida: item.codigo_aeroporto })} />
                    </View>
                    <View style={styles.hourContainer}>
                        <DateTimePicker
                            initialDate={editObj?.horario_partida_previsto}
                            mode='date'
                            returnDate={(horario_partida_previsto) => setInfo({ ...info, horario_partida_previsto })} />
                    </View>
                </View>
                <View style={{ ...styles.airportContainer, marginTop: 15 }}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxTitle}>Chegada</Text>
                        <Picker
                            field='nome'
                            fieldFilter='codigo_aeroporto'
                            initialValue={editObj ? editObj.codigo_aeroporto_chegada : null}
                            icon={'airport'}
                            label='Aeroporto'
                            data={aeroportos}
                            returnItem={(item) => setInfo({ ...info, codigo_aeroporto_chegada: item.codigo_aeroporto })} />
                    </View>
                    <View style={styles.hourContainer}>
                        <DateTimePicker
                            initialDate={editObj?.horario_chegada_previsto}
                            mode='date'
                            returnDate={(horario_chegada_previsto) => setInfo({ ...info, horario_chegada_previsto })} />
                    </View>
                </View>
            </View>
            <Button
                buttonStyle={{ height: 48, borderRadius: 5 }}
                iconRight
                onPress={editObj ? handleUpdate : handleRegister}
                loading={loading}
                title={editObj ? "Atualizar  " : "Registrar  "}
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

export default TrechoVoo;