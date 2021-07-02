import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, FlatList, Pressable, TouchableOpacity, Keyboard } from 'react-native';

//LB
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightFormat } from 'date-fns';
import Toast from 'react-native-toast-message';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

//CP
import apiService from '../../api/api';
import GreatInput from '../../components/GreatInput';
import { colors, fonts } from '../../commounStyles';
import { findObj } from '../../functions'

const defaultObject = {
    nome_cliente: '',
    telefone_cliente: '',
    numero_voo: '',
    numero_trecho: '',
    numero_assento: '',
    data_: lightFormat(new Date(), 'dd/MM/yyyy'),
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const Reserva = ({ api_name, editObj, navigation }) => {
    // refs
    const sheetRef = useRef(null);

    useEffect(() => {
        getAeronave()
        getInstancia()
        getAeroportos()
    }, [])

    //Keyboard
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                console.log('ABRIU') // or some other action
                closeBottomSheet()
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                console.log('FECHOU')
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const [loading, setLoading] = useState(false);
    const [originalState, setOriginalState] = useState(editObj);
    const [info, setInfo] = useState(editObj ? editObj : defaultObject);
    const [aeronaves, setAeronaves] = useState([])
    const [aeroportos, setAeroportos] = useState([])
    const [instancias, setInstancias] = useState([])
    const [labelInstancia, setLabelInstancia] = useState('')
    const [editedData, setEditedData] = useState({})

    const handleRegister = async () => {
        console.log(info);
        await apiService.post(api_name, info)
            .then(response => {
                if (response.status != 200) {
                    throw new Error('Erro ao criar')
                }
            })
            .then(callToastMessage)
            .then(() => navigation.navigate('Success'))
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
            .finally(() => setLoading(false))
    }

    const getAeronave = async () => {
        await apiService.get(`/aero`)
            .then(({ data }) => setAeronaves(data))
            .catch((error) => console.error(error))
    }

    const getInstancia = async () => {
        await apiService.get(`/instancia`)
            .then(({ data }) => setInstancias(data))
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
            text2: `Reserva criada com sucesso!`,
            visibilityTime: 2000,
            autoHide: true,
        });
    }

    const handleSelectedInstancia = (instancia, label) => {
        closeBottomSheet()
        setInfo({
            ...info,
            numero_trecho: instancia.numero_trecho,
            numero_voo: instancia.numero_voo,
            data_: instancia.data_
        })
        setLabelInstancia(label)
    }

    const cardFlatList = ({ item }) => {
        let aeroportoPartida = findObj(aeroportos, item.codigo_aeroporto_partida, 'codigo_aeroporto', 'nome');
        let aeroportoChegada = findObj(aeroportos, item.codigo_aeroporto_chegada, 'codigo_aeroporto', 'nome');

        return (
            <Pressable
                onPress={() => handleSelectedInstancia(item, `${aeroportoPartida} - ${aeroportoChegada}`)}
                style={styles.cardContainer}>
                <View style={styles.iconContainer}>
                    <Icon
                        name='airplane'
                        size={25}
                        color='#516BFF'
                    />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.boxContainer}>
                        <Icon name='airplane-takeoff' size={20} color={colors.muttedText} />
                        <Text style={styles.txtAeroporto}>{aeroportoPartida}</Text>
                        <Text style={styles.txtHorario}>{item.horario_partida} </Text>
                    </View>
                    <View style={styles.boxContainer}>
                        <Icon name='airplane-landing' size={20} color={colors.muttedText} />
                        <Text style={styles.txtAeroporto}>{aeroportoChegada} </Text>
                        <Text style={styles.txtHorario}>{item.horario_chegada} </Text>
                    </View>


                </View>
            </Pressable>
        )
    }

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'lightgray',
                padding: 16,
                height: 450,
                width: SCREEN_WIDTH
            }}
        >
            <FlatList
                keyExtractor={(_, idx) => idx}
                data={instancias}
                renderItem={cardFlatList}
            />
            {/* <Button onPress={() => sheetRef.current.snapTo(1)} />
            <Text>Swipe down to close</Text> */}
        </View>
    );

    const handleSelectPicker = () => {
        sheetRef.current.snapTo(0)
    }

    const closeBottomSheet = () => {
        sheetRef.current.snapTo(1)
    }

    //Animations
    const imageScale = useSharedValue(1);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ scale: imageScale.value }],
        };
    });
    const animateImage = (isKeyboardOpen) => {
        isKeyboardOpen
            ? imageScale.value = withSpring(0.5)
            : imageScale.value = withSpring(1)
    }

    return (
        <>
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/imgs/reserva.jpg')}
                    style={styles.headerImage} />
                <View>
                    <GreatInput
                        label='Nome'
                        icon='account'
                        placeholder='Nome e Sobrenome'
                        value={info.nome_cliente}
                        onChangeText={nome_cliente => {
                            setEditedData({ ...editedData, nome_cliente })
                            setInfo({ ...info, nome_cliente })
                        }}
                    />
                    <GreatInput
                        label='Telefone'
                        icon='cellphone'
                        placeholder='DDD + Numero'
                        keyboardType='number-pad'
                        value={info.telefone_cliente}
                        onChangeText={telefone_cliente => {
                            setEditedData({ ...editedData, telefone_cliente })
                            setInfo({ ...info, telefone_cliente })
                        }}
                    />
                    <GreatInput
                        label='Numero do Acento'
                        placeholder='Ex: 45'
                        icon='seat'
                        keyboardType='number-pad'
                        value={info.numero_assento}
                        onChangeText={numero_assento => {
                            setEditedData({ ...editedData, numero_assento })
                            setInfo({ ...info, numero_assento })
                        }}
                    />
                    {!editObj &&
                        <GreatInput
                            label='Trecho'
                            placeholder='Partida - Destino'
                            icon='airplane'
                            onPress={handleSelectPicker}
                            keyboardType='number-pad'
                            value={labelInstancia}
                            onChangeText={numero_assento => setInfo({ ...info, numero_assento })}
                        />
                    }

                    <TouchableOpacity
                        onPress={editObj ? handleUpdate : handleRegister}
                        style={styles.button}>
                        <Text style={styles.buttonLabel}>Reservar</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ height: SCREEN_HEIGHT }}>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[400, 0]}
                    initialSnap={1}
                    borderRadius={10}
                    renderContent={renderContent}
                />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15,
    },
    headerImage: {
        width: '100%',
        height: 200,
        transform: [{ translateY: -30 }]
    },
    title: {
        fontSize: 30,
        fontFamily: fonts.bold,
    },
    button: {
        width: '100%',
        height: 55,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#516BFF',
        // trasnform: [{ translateY: -80 }]
    },
    buttonLabel: {
        color: '#fff',
        fontFamily: fonts.bold,
        fontSize: 16,
    },
    //Card
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#eceff1'
    },
    infoContainer: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    boxContainer: {
        width: '45%',
        alignItems: 'center',
    },
    txtHorario: {
        fontSize: 10,
        fontFamily: fonts.bold,
        color: colors.muttedText
    },
    txtAeroporto: {
        fontSize: 14,
        fontFamily: fonts.regular,
    }
});

export default Reserva;