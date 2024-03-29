import React, { useContext, useState } from 'react'
import {View, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { sourates } from '../constants/sorats.list';
import { GlobalContext } from '../App';
import { secondary } from '../style/variables';


export default function SelectSurah() {

    const {
        setFirstVersetOfSelectedSurah,
        setLastVersetOfSelectedSurah,
        setSurahNumber,
        setCurrentIndex,
        setCurrentSlide,
        setIsplaying,
        surahTextValue,
        setSurahTextValue,
        isPlaying
    } = useContext(GlobalContext) 


    return (
        <View style={styles.surahContent} >
            <RNPickerSelect
                onValueChange={(selectItem, index) => {
                    if (index === 0) return
                    setLastVersetOfSelectedSurah(sourates[index - 1].versets)
                    setFirstVersetOfSelectedSurah(0)
                    setSurahNumber(sourates[index - 1].numero)
                    setCurrentIndex(index)
                    setSurahTextValue(selectItem)
                    setCurrentSlide(1)
                    setIsplaying(false)
                }}
                items={sourates.map(item => {
                    return { label: item.nom, value: item.nom }
                })}
                value={surahTextValue}
                disabled={isPlaying}
                style={pickerSelectStyles}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    surahContent: {
        marginVertical: 20,
    },
    selectAyah: {
        width: 300,
    },
    selectAyahText: {
        fontSize: 15
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});