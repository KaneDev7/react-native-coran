import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TextContainer from '../components/TextContainer';
import Track from '../components/Track';
import SelectSurah from '../components/SelectSurah';
import SelectVerset from '../components/SelectVerset';
import Control from '../components/Control';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../App';
import { sourates } from '../constants/sorats.list';

export default function Player({ route }) {
    const {
        setIsplaying,
        setCurrentSlide,
        selectSartVerset,
        setSurahNumber,
        setCurrentIndex,
        setSound,
        setSurahTextValue,
        setCorantText
    } = useContext(GlobalContext)
    
    const { sourateIndex } = route.params;

    console.log('param', route.params)

    useEffect(() => {
        setSound(null)
        setIsplaying(false)
        setCurrentSlide(selectSartVerset)
        setCurrentIndex(sourateIndex)
        setSurahNumber(sourates[sourateIndex].numero)
        setSurahTextValue(sourates[sourateIndex].nom)
        setCorantText('')
    }, [sourateIndex])

    return (
        <View style={styles.container}>
            <TextContainer />
            <SelectSurah />
            <Track />
            <SelectVerset />
            <View style={styles.container}>
                <Control />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    surahContent: {
        marginVertical: 20
    },
    surahText: {
        fontSize: 25,
    }
});