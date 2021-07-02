import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Button } from 'react-native-elements'
import { colors, fonts } from '../commounStyles';

// import { Container } from './styles';

const ChoseOptions = ({ navigation, route }) => {
    const { item } = route.params
    const { label, icon, backgroundColor } = item
    return (
        <View style={styles.container}>
            <Icon
                name={icon}
                size={50}
                color={backgroundColor}
            />
            <Text style={styles.label}>{label}</Text>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Read', { item })}
                    style={styles.btnStyle}>
                    <Icon
                        color='#f2476a'
                        name='cloud-search-outline'
                        size={30}
                    />
                    <Text style={styles.btnLabel}>Pesquisar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Create', { item })}
                    style={styles.btnStyle}>
                    <Icon
                        color='#90ee90'
                        name='tooltip-plus-outline'
                        size={30}
                    />
                    <Text style={styles.btnLabel}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            {/* 
            <Button
                onPress={() => navigation.navigate('Read', { item })}
                buttonStyle={styles.btnStyle}
                title={'Pesquisar'}
                iconRight
                icon={
                    <Icon
                        name="magnify"
                        size={15}
                        color="white"
                        style={{ marginLeft: 10 }}
                    />
                }
            />
            <Button
                onPress={() => navigation.navigate('Create', { item })}
                buttonStyle={styles.btnStyle}
                title={'Criar'}
                iconRight
                icon={
                    <Icon
                        name="plus-thick"
                        size={15}
                        color="white"
                        style={{ marginLeft: 10 }}
                    />
                }
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
    },
    label: {
        fontFamily: fonts.bold,
        color: colors.muttedText,
        fontSize: 30,
        marginBottom: 20,
    },
    btnStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 200,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnLabel: {
        fontFamily: fonts.regular,
        fontSize: 18,
        marginTop: 5
    }
});

export default ChoseOptions;