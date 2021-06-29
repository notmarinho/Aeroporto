import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native'


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')


import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../commounStyles'

const Card = ({ item }) => {
    const Destination = ({ origem, destino }) => {
        return (
            <View style={styles.destinationContainer}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={styles.destinationTxt}>
                        REC
                    </Text>
                    <Icon name='airplane' style={{ transform: [{ rotate: '180deg' }] }} />
                    <Text style={styles.destinationTxt}>
                        SAO
                    </Text>
                </View>
            </View>
        )
    }

    const Time = ({ left, arrive }) => {
        return (
            <View style={styles.timeContainer}>
                <View style={styles.planeContainer}>
                    <View style={{ alignItems: 'center', }}>
                        <Icon name='airplane-takeoff' size={18} />
                        <Text style={styles.timeTxt}>
                            21:30
                        </Text>
                        <Text style={styles.dateTxt}>
                            10/06/1821
                        </Text>
                    </View>
                </View>
                <View style={styles.planeContainer}>
                    <View style={{ alignItems: 'center', }}>
                        <Icon name='airplane-landing' size={20} />
                        <Text style={styles.timeTxt}>
                            01:40
                        </Text>
                        <Text style={styles.dateTxt}>
                            11/06/2021
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <TouchableOpacity style={styles.container}>
            {/* <Destination /> */}
            {/* <Time /> */}
            <View style={{ ...styles.contentContainer }}>
                <View style={styles.infoContainer}>
                    <Text style={styles.txtAbreviacao}>REC</Text>
                    <Text style={styles.txtNomeCidade}>Recife</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.txtLabelDate}>DATE</Text>
                    <Text style={styles.txtHorario}>25 MAIO 20:30</Text>
                </View>
            </View>
            <View style={{ ...styles.contentContainer, alignItems: 'center', }}>
                <View style={styles.iconContainer}>
                    <Icon name='airplane-takeoff' color={colors.secondary} size={25} />
                    <Text style={styles.txtFlytime}>1H 20M</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={{ ...styles.infoContainer, alignItems: 'flex-end' }}>
                    <Text style={styles.txtAbreviacao}>REC</Text>
                    <Text style={styles.txtNomeCidade}>Recife</Text>
                </View>
                <View style={{ ...styles.infoContainer, alignItems: 'flex-end' }}>
                    <Text style={styles.txtLabelDate}>DATE</Text>
                    <Text style={styles.txtHorario}>25 MAIO 20:30</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.90,
        height: 180,
        borderRadius: 8,
        marginTop: 20,
        flexDirection: 'row',
        marginVertical: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.secondary
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    infoContainer: {
        flex: 1,
        paddingTop: 10,
    },
    txtAbreviacao: {
        color: colors.secondary,
        fontSize: 30,
    },
    txtNomeCidade: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },
    txtLabelDate: {
        fontSize: 16,
        color: colors.muttedText
    },
    txtHorario: {
        fontWeight: 16,
        fontWeight: "bold",
        color: '#fff'
    },
    txtFlytime: {
        color: "#fff",
        marginTop: 2.5
    },
    iconContainer: {
        width: 75,
        height: 75,
        borderRadius: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY: -20 }]
    }
})
