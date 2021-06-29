import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import {
    Input,
    Button
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import apiService from '../../api/api'

const defaultObject = {
    name: '',
    estado: '',
    cidade: '',
}

const Airport = ({ api_name, editObj }) => {

    const [loading, setLoading] = useState(false)
    const [originalState, setOriginalState] = useState(editObj);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject)
    const [editedData, setEditedData] = useState({})

    const handleRegister = async () => {
        setLoading(true)
        await apiService.post(`/${api_name}`, info)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const handleUpdate = async () => {

        await apiService.put(`/${api_name}/${originalState.codigo_aeroporto}`, editedData)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    return (
        <View style={styles.container}>
            <View>
                <Input
                    // disabled={editObj ? true : false}
                    label='Código Aeroporto'
                    keyboardType='number-pad'
                    value={info.codigo_aeroporto}
                    onChangeText={codigo_aeroporto => { setEditedData({ ...editedData, codigo_aeroporto }), setInfo({ ...info, codigo_aeroporto }) }}
                />
                <Input
                    label='Nome'
                    placeholder='Nome do Aeroporto'
                    value={info.nome}
                    onChangeText={nome => { setEditedData({ ...editedData, nome }), setInfo({ ...info, nome }) }}
                />
                <Input
                    label='Cidade'
                    placeholder='Ex: Recife'
                    value={info.cidade}
                    onChangeText={cidade => { setEditedData({ ...editedData, cidade }), setInfo({ ...info, cidade }) }}
                />
                <Input
                    label='Estado'
                    placeholder='Ex: PE'
                    value={info.estado}
                    onChangeText={estado => { setEditedData({ ...editedData, estado }), setInfo({ ...info, estado }) }}
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

export default Airport;