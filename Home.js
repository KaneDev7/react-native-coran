import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View } from 'react-native';
import TextContainer from './components/TextContainer';
import Track from './components/Track';
import SelectSurah from './components/SelectSurah';
import SelectVerset from './components/SelectVerset';
import Control from './components/Control';

export default function Home() {

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