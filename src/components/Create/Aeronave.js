import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import {
    Input,
    Button
} from 'react-native-elements';

//LB
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//CP
import apiService from '../../api/api';
import Picker from '../../components/Picker';

const defaultObject = {
    codigo_aeronave: '',
    numero_total_assentos: '',
    tipo_aeronave: '',
}

const Aeronave = ({ api_name, editObj }) => {
    useEffect(() => getTiposAeronave(), [])
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject)
    const [tiposAeronaves, setTiposAeronaves] = useState([])

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

    const getTiposAeronave = async () => {
        await apiService.get(`/tipo`)
            .then(({ data }) => setTiposAeronaves(data))
            .catch((error) => console.error(error))
    }

    return (
        <View style={styles.container}>
            <View>
                <Input
                    label='Código da Aeronave'
                    keyboardType='number-pad'
                    value={info.codigo_aeronave}
                    onChangeText={codigo_aeronave => setInfo({ ...info, codigo_aeronave })}
                />
                <Input
                    label='Total de Assentos'
                    placeholder='Ex: 150'
                    keyboardType='number-pad'
                    value={info.numero_total_assentos}
                    onChangeText={numero_total_assentos => setInfo({ ...info, numero_total_assentos })}
                />
                <Picker
                    label='Tipo da Aeronave'
                    showLabel
                    field='nome_tipo_aeronave'
                    data={tiposAeronaves}
                    returnItem={(item) => setInfo({ ...info, tipo_aeronave: item.nome_tipo_aeronave })}
                />
            </View>
            <Button
                buttonStyle={{ height: 48, borderRadius: 8 }}
                iconRight
                onPress={editObj ? handleUpdate : handleRegister}
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

export default Aeronave;