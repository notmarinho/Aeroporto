import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Input from '../Input'

const index = () => {
    return (
        <View>
            <Input 
                label='Nome'
                placeholder='Seu nome completo'
            />
        </View>
    )
}

export default index

const styles = StyleSheet.create({})
