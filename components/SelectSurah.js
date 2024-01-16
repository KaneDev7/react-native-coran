

import React from 'react'

import { View, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import RNPickerSelect from 'react-native-picker-select';
import { sourates } from '../constants/sorats.list';


export default function SelectSurah({
    setFirstVersetOfSelectedSurah,
    setLastVersetOfSelectedSurah,
    setSurahNumber,
    setCurrentIndex,
    setCurrentSlide,
    isPlaying
}) {
    return (
        <View style={styles.surahContent} >
            {/* <SelectDropdown
                buttonStyle={styles.selectAyah}
                buttonTextStyle={styles.selectAyahText}
                defaultButtonText='Sourates'
                data={sourates}
                disabled={isPlaying}
                onSelect={(selectedItem) => {
                    console.log(selectedItem)
                    setLastVersetOfSelectedSurah(selectedItem.versets)
                    setFirstVersetOfSelectedSurah(0)
                    setSurahNumber(selectedItem.numero)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.nom
                }}
                rowTextForSelection={(item, index) => {
                    return item.nom
                }}
            /> */}
            <RNPickerSelect
                onValueChange={(value,index) => {
                    setLastVersetOfSelectedSurah( sourates[index-1].versets)
                    setFirstVersetOfSelectedSurah(0)
                    setSurahNumber(sourates[index-1].numero)
                    setCurrentIndex(index)
                    setCurrentSlide(1)
                }}
                items={sourates.map(item =>{
                    return {  label : item.nom ,  value : item.nom } 
                })}
               style={pickerSelectStyles}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    surahContent: {
        marginVertical: 20
    },
    selectAyah: {
        width: 200,
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