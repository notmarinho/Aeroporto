import React, { useState } from 'react'
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    Animated
} from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

import Card from './Card'
import { colors } from '../../commounStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Index = () => {
    const scrollY = new Animated.Value(0);

    const animatedColor = scrollY.interpolate({
        inputRange: [0, 150, 170],
        outputRange: ['#fff', '#fff', colors.primary],
        extrapolate: 'clamp',
    })

    const Header = ({
        onBackPress
    }) => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={onBackPress}>
                    <Icon name='backburger' size={30} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.txtTitle}>Voos</Text>
            </View>
        )
    }

    const [statusBarColor, setStatusBarColor] = useState(false)

    const onScroll = ({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y >= 175 && !statusBarColor) {
            setStatusBarColor(true)
        }
        else if (nativeEvent.contentOffset.y < 175 && statusBarColor) {
            setStatusBarColor(false)
        }
    }

    return (
        <ScrollView
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }]
                , { listener: onScroll, useNativeDriver: false })}
            scrollEventThrottle={16}
            style={{ flex: 1 }}>
            <Header onBackPress={() => console.log('bACkbuttonPress')} />
            <StatusBar backgroundColor={statusBarColor ? colors.primary : '#fff'} animated barStyle='dark-content' />
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={{ flex: 1, alignItems: 'center', }}
                    // ListHeaderComponent={<Header />}
                    data={['ITEM 1', 'ITEM 2', 'ITEM 3', 'ITEM 3', 'ITEM 3', 'ITEM 3', 'ITEM 3', 'ITEM 3', 'ITEM 3', 'ITEM 3',]}
                    renderItem={({ item }) => <Card item={item} />}
                    keyExtractor={(_, idx) => String(idx)}
                />
            </View>
        </ScrollView>

    )
}

export default Index

const styles = StyleSheet.create({
    headerContainer: {
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
        paddingVertical: 25,
        paddingLeft: 25,
        height: 175,
        backgroundColor: '#fff'
    },
    listContainer: {
        width: '100%',
        flexGrow: 1,
        paddingTop: 20,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        transform: [{ translateY: -10 }]
    },
    txtTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: colors.primary,
    },
    btnBack: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateX: -15 }, { translateY: -15 }]
    }
})
