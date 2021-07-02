import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

//LB
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Toast from 'react-native-toast-message';

//CP
import apiService from '../../api/api'
import Picker from '../../components/Picker';

const defaultObject = {
    numero_voo: '',
    codigo_tarifa: '',
    quantidade: '',
    restricoes: '',
}

const Tarifa = ({ api_name, editObj, navigation }) => {
    useEffect(() => {
        getVoos()
    }, [])

    const [loading, setLoading] = useState(false);
    const [originalState, setOriginalState] = useState(editObj);
    const [editedData, setEditedData] = useState({});
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
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
        await apiService.put(`${api_name}/${originalState.numero_voo}`, editedData)
            .then((response) => console.log(response))
            .then(goBack)
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
            text2: `Tarifa criada com sucesso!`,
            visibilityTime: 2000,
            autoHide: true,
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Picker
                    field='companhia_aerea'
                    showLabel
                    label='Número do Voo'
                    data={voos}
                    returnItem={(item) => {
                        setEditedData({ ...editedData, numero_voo: item.numero_voo })
                        setInfo({ ...info, numero_voo: item.numero_voo })
                    }}
                />
                <Input
                    label='Código da Tarifa'
                    keyboardType='number-pad'
                    value={info.codigo_tarifa}
                    onChangeText={codigo_tarifa => {
                        setEditedData({ ...editedData, codigo_tarifa })
                        setInfo({ ...info, codigo_tarifa })
                    }}
                />
                <Input
                    label='Quantidade'
                    value={info.quantidade}
                    keyboardType='number-pad'
                    onChangeText={quantidade => {
                        setEditedData({ ...editedData, quantidade })
                        setInfo({ ...info, quantidade })
                    }}
                />
                <Input
                    label='Restrições'
                    // placeholder='Ex: Recife'
                    value={info.restricoes}
                    onChangeText={restricoes => {
                        setEditedData({ ...editedData, restricoes })
                        setInfo({ ...info, restricoes })
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

export default Tarifa;