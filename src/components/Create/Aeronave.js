import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

//LB
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

//CP
import apiService from '../../api/api';
import Picker from '../../components/Picker';

const defaultObject = {
    codigo_aeronave: '',
    numero_total_assentos: '',
    tipo_aeronave: '',
}

const Aeronave = ({ api_name, editObj, navigation }) => {
    useEffect(() => getTiposAeronave(), [])
    const [loading, setLoading] = useState(false);
    const [originalState, setOriginalState] = useState(editObj);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject)
    const [tiposAeronaves, setTiposAeronaves] = useState([])
    const [editedData, setEditedData] = useState({})

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
        console.log('ESTADO ORIGINAL, ', originalState);
        
        await apiService.put(`${api_name}/${originalState.tipo_aeronave}`, editedData)
            .then(goBack)
            .catch((error) => console.error(error))
    }

    const getTiposAeronave = async () => {
        await apiService.get(`/tipo`)
            .then(({ data }) => setTiposAeronaves(data))
            .catch((error) => console.error(error))
    }

    const callToastMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: `Aeronave criada com sucesso!`,
            visibilityTime: 2000,
            autoHide: true,
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Input
                    label='Código da Aeronave'
                    keyboardType='number-pad'
                    value={info.codigo_aeronave}
                    onChangeText={codigo_aeronave => { setEditedData({ ...editedData, codigo_aeronave }), setInfo({ ...info, codigo_aeronave }) }}
                />
                <Input
                    label='Total de Assentos'
                    placeholder='Ex: 150'
                    keyboardType='number-pad'
                    value={info.numero_total_assentos}
                    onChangeText={numero_total_assentos => { setEditedData({ ...editedData, numero_total_assentos }), setInfo({ ...info, numero_total_assentos }) }}
                />
                <Picker
                    label='Tipo da Aeronave'
                    showLabel
                    field='nome_tipo_aeronave'
                    data={tiposAeronaves}
                    returnItem={(item) => { setEditedData({ ...editedData, tipo_aeronave: item.nome_tipo_aeronave }), setInfo({ ...info, tipo_aeronave: item.nome_tipo_aeronave }) }}
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

export default Aeronave;