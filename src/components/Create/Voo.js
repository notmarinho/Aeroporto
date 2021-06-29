import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import {
    Input,
    Button
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import apiService from '../../api/api'

const defaultObject = {
    numero_voo: '',
    companhia_aerea: '',
    dias_da_semana: '',
}

const Voo = ({ api_name, editObj }) => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);

    const handleRegister = async () => {
        setLoading(true)
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

    return (
        <View style={styles.container}>
            <View>
                <Input
                    label='Número Voo'
                    keyboardType='number-pad'
                    value={info.numero_voo}
                    onChangeText={numero_voo => setInfo({ ...info, numero_voo })}
                />
                <Input
                    label='Companhia aerea'
                    value={info.companhia_aerea}
                    onChangeText={companhia_aerea => setInfo({ ...info, companhia_aerea })}
                />
                <Input
                    label='Dias da semana'
                    // placeholder='Ex: Recife'
                    value={info.dias_da_semana}
                    onChangeText={dias_da_semana => setInfo({ ...info, dias_da_semana })}
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

export default Voo;