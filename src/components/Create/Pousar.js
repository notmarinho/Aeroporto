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
    nome_tipo_aeronave: '',
    codigo_aeroporto: '',
}

const Pousar = ({ api_name, editObj }) => {
    useEffect(() => {
        getAeronave()
        getAeroportos()
    }, [])

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [aeronaves, setAeronaves] = useState([])
    const [aeroportos, setAeroportos] = useState([])

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

    const getAeroportos = async () => {
        await apiService.get(`/aeroporto`)
            .then(({ data }) => setAeroportos(data))
            .catch((error) => console.error(error))
    }

    return (
        <View style={styles.container}>
            <View>
                <Picker
                    label='Tipo de Aeronave'
                    showLabel
                    field='nome_tipo_aeronave'
                    data={aeronaves}
                    returnItem={(item) => setInfo({ ...info, nome_tipo_aeronave: item.nome_tipo_aeronave })}
                />
                <Picker
                    label='Aeroporto'
                    showLabel
                    field='nome'
                    data={aeroportos}
                    returnItem={(item) => setInfo({ ...info, codigo_aeroporto: item.codigo_aeroporto })}
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

export default Pousar;