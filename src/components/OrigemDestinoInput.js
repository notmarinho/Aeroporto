import React, { useRef } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard
} from 'react-native'

//LB
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BlurView } from "@react-native-community/blur";
import { colors } from '../commounStyles';

//CONST
const btnSize = 45

const OrigemDestinoInput = ({
    valueOrigem,
    valueDesitino,
    onChangeOrigem,
    onChangeDestino,
    onButtonPress,
    loading,
}) => {
    const destinoRef = useRef()

    const handleButtonPress = () => {
        Keyboard.dismiss()
        onButtonPress()
    }

    return (
        <View style={styles.container}>
            <View style={styles.shapeContainer}>
                <View style={styles.inputContainer}>
                    <View style={styles.headerContainer}>
                        <Icon
                            name='airplane-takeoff'
                            color={colors.secondary}
                            size={25} />
                        <Text style={styles.txtHeader}>Origem</Text>
                    </View>
                    <TextInput
                        value={valueOrigem}
                        onChangeText={onChangeOrigem}
                        style={styles.input}
                        onSubmitEditing={() => destinoRef.current.focus()}
                        blurOnSubmit={false}
                        returnKeyType='next'
                        placeholder='Origem'
                    />
                    <View style={{ ...styles.headerContainer, marginTop: 10, }}>
                        <Icon
                            name='airplane-landing'
                            color={colors.secondary}
                            size={25} />
                        <Text style={styles.txtHeader}>Destino</Text>
                    </View>
                    <TextInput
                        ref={destinoRef}
                        value={valueDesitino}
                        onChangeText={onChangeDestino}
                        style={styles.input}
                        placeholder='Seu Destino'
                    />
                </View>
                <TouchableOpacity
                    onPress={handleButtonPress}
                    style={styles.btnSearch}>
                    {loading
                        ? <ActivityIndicator animating color={'#fff'} />
                        : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={styles.txtBtn}>Pesquisar</Text>
                            <Icon name='magnify' color='#fff' size={18} />
                        </View>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrigemDestinoInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-end',
        opacity: 0.98
    },
    shapeContainer: {
        width: '90%',
        backgroundColor: colors.primary,
        paddingVertical: 15,
        alignItems: 'flex-end',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40
    },
    inputContainer: {
        width: '90%',
        paddingVertical: 10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtHeader: {
        fontWeight: 'bold',
        color: colors.muttedText,
        marginLeft: 15,
        fontSize: 15
    },
    input: {
        fontWeight: 'bold',
        color: colors.secondary,
        fontSize: 30,
        padding: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingLeft: 10
    },
    btnSearch: {
        // position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: btnSize * 3,
        height: btnSize,
        borderRadius: 20,
        backgroundColor: colors.darkPrimary,
        zIndex: 5,
        right: 15,
    },
    txtBtn: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
        marginRight: 5
    }
})
