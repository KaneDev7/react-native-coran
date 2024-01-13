

import React from 'react'

import { View, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { sourates } from '../constants/sorats.list';
const souratesList = sourates.map(item => item.nom)


export default function SelectSurah({ setLastVersetOfSelectedSurah }) {
    return (
        <View style={styles.surahContent} >
            <SelectDropdown
                buttonStyle={styles.selectAyah}
                buttonTextStyle={styles.selectAyahText}
                data={sourates}
                defaultValueByIndex={0}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem)
                    setLastVersetOfSelectedSurah(selectedItem.versets)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.nom
                }}
                rowTextForSelection={(item, index) => {
                    return item.nom
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    surahContent: {
        marginVertical: 20
    },
    selectAyah:{
        width : 200,
    },
    selectAyahText:{
        fontSize: 15
    }

});
