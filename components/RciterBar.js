import React, { useContext } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { GlobalContext } from '../App'
import { primary } from '../style/variables'
import { Entypo } from '@expo/vector-icons';

export default function RciterBar({ navigation }) {

    const { reciter } = useContext(GlobalContext)
    return (
        <TouchableNativeFeedback
        style={styles.reciterBar}
            
            onPress={() => navigation.navigate('Réciteurs')}
        >
            <View 
            style={styles.reciterBarRow}
            >
                <Text style={styles.reciterBarText} > {reciter} </Text>
                <Entypo name="select-arrows" size={15} color={primary} />
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({

    reciterBarRow : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderWidth: 1,
        borderRadius : '10%',
        borderColor : primary,
        padding: 5,
    },
    reciterBarText: {
        fontSize: 20,
        color: primary,
        textTransform : 'capitalize'

    }
});