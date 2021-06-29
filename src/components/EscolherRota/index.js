import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'


import Input from '../Input'
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import OrigemDestino from '../OrigemDestinoInput'


const index = ({

}) => {
    const [origem, setOrigem] = useState('')
    const [destino, setDestino] = useState('')
    const [loadingVoo, setLoadingVoo] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [itemList, setItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(2);
    const [cidades, setCidades] = useState(['Recife', 'São Paulo', 'Rio de Janeiro', 'Curitiba'])


    const seachVoo = (numVoo) => {
        if (numVoo) {
            setLoadingVoo(true)
            setTimeout(() => {
                console.log('Seu voo é esse: ', numVoo);
                setItemList(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'])
                setLoadingVoo(false)
            }, 2500);
        } else {
            alert('Insira o número de algum voo')
        }
    }

    const searchFly = () => {
        console.log('Btn pressed');
        setLoadingBtn(true)
        setTimeout(() => {
            setLoadingBtn(false)
        }, 1500);
    }

    return (
        <View>
            <View style={styles.headerContainer}>

            </View>
            <OrigemDestino
                valueOrigem={origem}
                valueDesitino={destino}
                onChangeOrigem={setOrigem}
                onChangeDestino={setDestino}
                onButtonPress={searchFly}
                loading={loadingBtn}
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    headerContainer: {
        height: '45%',
        width: '100%',
    },
    txtTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    btnContainer: {
        padding: 10,
        borderRadius: 8,
        width: '100%',
        height: 50,
        marginTop: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
