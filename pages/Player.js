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
import RciterBar from '../components/RciterBar'
import Sourates from './Sourates';
import Reciteurs from './Reciteurs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


    export default function Player({ navigation, route }) {

        const {
            setIsplaying,
            setCurrentSlide,
            selectSartVerset,
            setPlayPauseIcon,
            setSurahNumber,
            setCurrentIndex,
            setSound,
            setSurahTextValue,
            setCorantText
        } = useContext(GlobalContext)


        const index = route?.params?.sourateIndex || 0

        useEffect(() => {
            setSound(null)
            setIsplaying(false)
            setPlayPauseIcon('play')
            setCurrentSlide(selectSartVerset)
            setCurrentIndex(index)
            setSurahNumber(sourates[index].numero)
            setSurahTextValue(sourates[index].nom)
            setCorantText('')
        }, [index])

        return (
            <View style={styles.container}>
                <RciterBar navigation={navigation}/>
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
            paddingTop : 10
        },
        surahContent: {
            marginVertical: 20
        },
        surahText: {
            fontSize: 25,
        }
    });