import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import {
    Input,
    Button
} from 'react-native-elements';

//LB
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightFormat } from 'date-fns';

//CP
import DateTimePicker from '../DatePicker'
import apiService from '../../api/api';
import Picker from '../../components/Picker';

const defaultObject = {
    nome_cliente: '',
    telefone_cliente: '',
    numero_voo: '',
    numero_trecho: '',
    data_: lightFormat(new Date(), 'dd/MM/yyyy'),
    numero_assento: '',
}

const Reserva = ({ api_name, editObj }) => {
    useEffect(() => {
        getAeronave()
        getVoos()
        getTrechos()
    }, [])

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [aeronaves, setAeronaves] = useState([])
    const [voos, setVoos] = useState([])
    const [trechos, setTrechos] = useState([])

    const handleRegister = async () => {
        setLoading(true)
        console.log(info);
        await apiService.post(`/${api_name}`, info)
            .then((response) => console.log(response))
            .then((response => console.log(response)))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const handleUpdate = async () => {
        await apiService.put(`/${api_name}`, info)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const getAeronave = async () => {
        await apiService.get(`/aero`)
            .then(({ data }) => setAeronaves(data))
            .catch((error) => console.error(error))
    }

    const getVoos = async () => {
        await apiService.get(`/voo`)
            .then(({ data }) => setVoos(data))
            .catch((error) => console.error(error))
    }

    const getTrechos = async () => {
        await apiService.get(`/trecho`)
            .then(({ data }) => setTrechos(data))
            .catch((error) => console.error(error))
    }

    console.log(voos)

    return (
        <View style={styles.container}>
            <View>
                <Input
                    label='Nome'
                    placeholder='Nome e Sobrenome'
                    value={info.nome_cliente}
                    onChangeText={nome_cliente => setInfo({ ...info, nome_cliente })}
                />
                <Input
                    label='Telefone'
                    placeholder='DDD + Numero'
                    value={info.telefone_cliente}
                    onChangeText={telefone_cliente => setInfo({ ...info, telefone_cliente })}
                />
                <DateTimePicker
                    label='Data'
                    mode='date'
                    returnDate={(data_) => setInfo({ ...info, data_ })} />
                <Picker
                    label='Trecho'
                    showLabel
                    field='numero_trecho'
                    data={trechos}
                    returnItem={(item) => setInfo({ ...info, numero_trecho: item.numero_trecho })}
                />
                <Picker
                    label='Voo'
                    showLabel
                    field='companhia_aerea'
                    data={voos}
                    returnItem={(item) => setInfo({ ...info, numero_voo: item.numero_voo })}
                />
            </View>
            <Button
                buttonStyle={{ height: 48, borderRadius: 8 }}
                iconRight
                onPress={handleRegister}
                loading={loading}
                icon={
                    <Icon
                        name="check"
                        size={20}
                        color="white"
                        style={{ marginLeft: 10 }}
                    />
                }
                title="Registrar"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    }
});

export default Reserva;