import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Button } from 'react-native-elements'

// import { Container } from './styles';

const ChoseOptions = ({ navigation, route }) => {
    const { item } = route.params
    const { label, icon } = item
    return (
        <View style={styles.container}>
            <Icon
                name={icon}
                size={50}
                color={'purple'}
            />
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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnStyle: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    }
});

export default ChoseOptions;