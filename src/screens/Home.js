import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    View,
    ImageBackground,
    Dimensions
} from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

import ButtonHome from '../components/ButtonHome'
import ButtonReservar from '../components/ButtonReservar'
import Estatisticas from '../components/Estatisticas'

import apiService from '../api/api'

export default Home = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getEstatisticas()
        });
        return unsubscribe;
    }, [navigation]);
    const [estatisticas, setEstatisticas] = useState({ aeroportos: 0, voos: 0, avioes: 0 })

    const getEstatisticas = async () => {
        const aeroportos = await apiService.get('aeroporto').then(({ data }) => { return data.length })
        const voos = await apiService.get('voo').then(({ data }) => { return data.length })
        const avioes = await apiService.get('aero').then(({ data }) => { return data.length })
        setEstatisticas({ aeroportos, voos, avioes })
    }

    const buttons = [
        { label: 'Aeroporto', icon: 'airport', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'aeroporto' },
        { label: 'Voos', icon: 'routes', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'voo' },
        { label: 'Trecho', icon: 'routes', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'trecho' },
        { label: 'Tipo', icon: 'shield-airplane', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'tipo' },
        { label: 'Aeronave', icon: 'airplane', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'aero' },
        { label: 'Instância', icon: 'airplane', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'instancia' },
        { label: 'Pousar', icon: 'airplane-landing', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'pousar' },
        { label: 'Tarifa', icon: 'cash', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'tarifa' },
        { label: 'Mapa', icon: 'map-marker-radius-outline', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'tarifa' },
    ]

    return (
        <View style={{ flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.banner}>
                <Image
                    resizeMode='cover'
                    source={{ uri: 'https://www.aci-asiapac.aero/f/key_visual/1163/1920p865/DA-1487_1605079540.jpg' }}
                    style={{ flex: 1 }}
                />
                <Text style={styles.title}>Companhia Aerea</Text>
            </View>
            <View style={styles.container}>
                <Estatisticas aeroportos={estatisticas.aeroportos} voos={estatisticas.voos} avioes={estatisticas.avioes} />
                <ButtonReservar navigation={navigation} />
                <FlatList
                    data={buttons}
                    keyExtractor={(_, idx) => idx}
                    renderItem={({ item }) => <ButtonHome item={item} navigation={navigation} />}
                    numColumns={3}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        backgroundColor: '#fff',
        transform: [{ translateY: -15 }],
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // paddingTop: 20
    },
    banner: {
        width: SCREEN_WIDTH,
        height: 200,
    },
    title: {
        fontSize: 30,
        fontFamily: 'WorkSans-Bold',
        color: '#fff',
        position: "absolute",
        bottom: 30,
        left: 20,
    },
    buttonContainer: {

    }
});