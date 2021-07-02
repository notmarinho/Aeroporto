import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';

import Lottie from 'lottie-react-native'



const Success = ({ navigation }) => {

    const animationRef = useRef()
    useEffect(() => {
        animationRef.current.play()
        setTimeout(() => {
            navigation.replace('Home')
        }, 1500);
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Lottie
                ref={animationRef}
                style={{ width: 200, height: 200 }}
                loop={false}
                // autoPlay
                // loop={true}
                source={require('../../assets/animation/success.json')}
            />
        </View>
    )
}

export default Success;