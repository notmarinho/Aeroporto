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

export default Home = ({ navigation }) => {
    const buttons = [
        { label: 'Aeroporto', icon: 'airport', labelColor: '', backgroundColor: '#6cb4fa', api_name: 'aeroporto' },
        { label: 'Voos', icon: 'routes', labelColor: '', backgroundColor: '#0077b6', api_name: 'voo' },
        { label: 'Trecho', icon: 'routes', labelColor: '', backgroundColor: '#0077b6', api_name: 'trecho' },
        { label: 'Tipo', icon: 'shield-airplane', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'tipo' },
        { label: 'Aeronave', icon: 'airplane', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'aero' },
        { label: 'Instância', icon: 'airplane', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'instancia' },
        { label: 'Pousar', icon: 'airplane-landing', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'pousar' },
        { label: 'Tarifa', icon: 'cash', labelColor: '', backgroundColor: '#6a9cfd', api_name: 'tarifa' },
    ]

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.banner}>
                <Image
                    resizeMode='cover'
                    source={{ uri: 'https://www.aci-asiapac.aero/f/key_visual/1163/1920p865/DA-1487_1605079540.jpg' }}
                    style={{ flex: 1 }}
                />
                <Text style={styles.title}>Airport Mannager</Text>
            </View>
            <View style={styles.container}>
                <Estatisticas />
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