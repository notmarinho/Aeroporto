import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

//LB
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Toast from 'react-native-toast-message';

//CP
import apiService from '../../api/api'

const defaultObject = {
    nome_tipo_aeronave: '',
    qtd_max_assento: '',
    companhia: '',
}

const TipoAeronave = ({ getFields, isToUpdate, api_name, editObj, navigation }) => {
    const [loading, setLoading] = useState(false)
    const [originalState, setOriginalState] = useState(editObj);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject)

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
        await apiService.put(api_name, info)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
    }

    const callToastMessage = () => {
        Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: `Tipo de Aeronave criado com sucesso!`,
            visibilityTime: 2000,
            autoHide: true,
        });
    }


    return (
        <View style={styles.container}>
            <View>
                <Input
                    label='Tipo da aeronave'
                    value={info.nome_tipo_aeronave}
                    onChangeText={nome_tipo_aeronave => setInfo({ ...info, nome_tipo_aeronave })}
                />
                <Input
                    label='Quantidade de Assentos'
                    placeholder='Ex: 200'
                    keyboardType='number-pad'
                    value={info.qtd_max_assento}
                    onChangeText={qtd_max_assento => setInfo({ ...info, qtd_max_assento })}
                />
                <Input
                    label='Companhia Aerea'
                    placeholder='Ex: Recife'
                    value={info.companhia}
                    onChangeText={companhia => setInfo({ ...info, companhia })}
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

export default TipoAeronave;