import React, { useState, useRef, useEffect, useCallback, useMemo, useRef } from 'react'
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    View,
    ImageBackground
} from 'react-native'

import Picker from '@gregfrench/react-native-wheel-picker'
var PickerItem = Picker.Item;
import BottomSheet from '@gorhom/bottom-sheet';

//CP
import FlyList from '../components/VooList'
import EscolherRota from '../components/EscolherRota'
import Input from '../components/Input'
import ReservaComponent from '../components/ReservarVoo'

//APi
import apiService from '../api/api'

const Reserva = () => {
    const [users, setUsers] = useState([])


    const scrollRef = useRef()

    useEffect(() => {
        callApi()
    }, [])

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <ImageBackground
            resizeMode='cover'
            blurRadius={3}
            // source={{ uri: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80' }}
            ref={scrollRef}
            style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text>Ola mundo</Text>
                <FlatList
                    data={users}
                    contentContainerStyle={{ alignItems: "center" }}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    width: '90%',
                                    marginVertical: 5,
                                    padding: 10,
                                    backgroundColor: "gray",
                                }}>
                                <Text>{item.name} </Text>
                                <Text>{item.email}</Text>
                            </View>
                        )
                    }}
                />
                {/* <FlyList /> */}
                {/* <EscolherRota /> */}
                {/* <ReservaComponent /> */}
            </View>
        </ImageBackground>
    )
}

export default Reserva

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})
