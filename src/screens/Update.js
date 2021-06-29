import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';


//LB
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//CP
import { fonts } from '../commounStyles'
import Header from '../components/Create/Header'
import Airport from '../components/Create/Airport'

const Update = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header
                title='Atualizar Aeroporto'
                onBackButtonPress={() => navigation.goBack()}
            />
            <Airport />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    }
});

export default Update;

