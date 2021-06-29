import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';


//LB
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//CP
import apiService from '../../api/api'
import Picker from '../../components/Picker';

const defaultObject = {
    numero_voo: '',
    codigo_tarifa: '',
    quantidade: '',
    restricoes: '',
}

const Tarifa = ({ api_name, editObj }) => {
    useEffect(() => {
        getVoos()
    }, [])

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [voos, setVoos] = useState([])

    const handleRegister = async () => {
        setLoading(true)
        console.log(info);
        await apiService.post(`/${api_name}`, info)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const handleUpdate = async () => {
        await apiService.put(`/${api_name}`, info)
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const getVoos = async () => {
        await apiService.get(`/voo`)
            .then(({ data }) => setVoos(data))
            .catch((error) => console.error(error))
    }

    return (
        <View style={styles.container}>
            <View>
                <Picker
                    field='companhia_aerea'
                    showLabel
                    label='Número do Voo'
                    data={voos}
                    returnItem={(item) => setInfo({ ...info, numero_voo: item.numero_voo })}
                />
                <Input
                    label='Código da Tarifa'
                    keyboardType='number-pad'
                    value={info.codigo_tarifa}
                    onChangeText={codigo_tarifa => setInfo({ ...info, codigo_tarifa })}
                />
                <Input
                    label='Quantidade'
                    value={info.quantidade}
                    keyboardType='number-pad'
                    onChangeText={quantidade => setInfo({ ...info, quantidade })}
                />
                <Input
                    label='Restrições'
                    // placeholder='Ex: Recife'
                    value={info.restricoes}
                    onChangeText={restricoes => setInfo({ ...info, restricoes })}
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

export default Tarifa;