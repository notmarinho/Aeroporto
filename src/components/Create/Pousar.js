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
    nome_tipo_aeronave: '',
    codigo_aeroporto: '',
}

const Pousar = ({ api_name, editObj, navigation }) => {
    useEffect(() => {
        getAeronave()
        getAeroportos()
    }, [])

    const [loading, setLoading] = useState(false);
    const [originalState, setOriginalState] = useState(editObj);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [aeronaves, setAeronaves] = useState([]);
    const [aeroportos, setAeroportos] = useState([]);
    const [editedData, setEditedData] = useState({});

    console.log('API NAME: ', api_name);

    const handleRegister = async () => {
        await apiService.post(api_name, info)
            .then((response) => {
                if (response.status != 200) {
                    throw new Error('Erro ao criar pode pousar')
                }
            })
            .then(callToastMessage)
            .then(goBack)
            .catch((error) => console.error(error))
    }

    const goBack = () => {
        navigation.goBack()
    }

    const handleUpdate = async () => {
        await apiService.put(api_name, editedData)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
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

    const callToastMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: `Pouso criada com sucesso!`,
            visibilityTime: 2000,
            autoHide: true,
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Picker
                    label='Tipo de Aeronave'
                    showLabel
                    field='tipo_aeronave'
                    data={aeronaves}
                    returnItem={(item) => {
                        setEditedData({ ...editedData, nome_tipo_aeronave: item.tipo_aeronave })
                        setInfo({ ...info, nome_tipo_aeronave: item.tipo_aeronave })
                    }}
                />
                <Picker
                    label='Aeroporto'
                    showLabel
                    field='nome'
                    data={aeroportos}
                    returnItem={(item) => {
                        setEditedData({ ...editedData, nome_tipo_aeronave: item.tipo_aeronave })
                        setInfo({ ...info, codigo_aeroporto: item.codigo_aeroporto })
                    }}
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

export default Pousar;