import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

//LB
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//CP
import apiService from '../../api/api'

const defaultObject = {
    name: '',
    estado: '',
    cidade: '',
}

const Airport = ({ api_name, editObj, navigation }) => {
    const [loading, setLoading] = useState(false)
    const [originalState, setOriginalState] = useState(editObj);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject)
    const [editedData, setEditedData] = useState({})

    const handleRegister = async () => {
        await apiService.post(`/${api_name}`, info)
            .then(resetState)
            .then(goBack)
            .then(callToastMessage)
    }

    const goBack = () => {
        navigation.goBack()
    }

    const handleUpdate = async () => {
        await apiService.put(`${api_name}/${originalState.codigo_aeroporto}`, editedData)
            .then((response) => console.log(response))
            .then(goBack)
            .catch(handleError)
    }

    const resetState = () => setInfo(defaultObject)

    const toggleLoading = () => setLoading(!loading)

    const handleError = (error) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
            // visibilityTime: 4000,
            autoHide: true,
        });
    }

    const callToastMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: `Aeroporto criado com sucesso!`,
            visibilityTime: 2000,
            autoHide: true,
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Input
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
    }
});

export default Airport;