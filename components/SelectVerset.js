

import React, { useEffect, useState } from 'react'

import { View, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { sourates } from '../constants/sorats.list';

const souratesList = sourates.map(item => item.nom)


export default function SelectVerset({ lastVersetOfSelectedSurah }) {

    const [versets, setVersets] = useState([])
    const [firstVerset, setFirstVerset] = useState(0)

    useEffect(() => {
        const versetsArray = []
        for (let i = 1; i <= lastVersetOfSelectedSurah; i++) {
            versetsArray.push(i)
        }
        setVersets(versetsArray) 
        setFirstVerset(0)
    }, [lastVersetOfSelectedSurah])

    return (
        <View style={styles.selectAyahContent} >
            <SelectDropdown
                buttonStyle={styles.selectAyah}
                buttonTextStyle={styles.selectAyahText}
                defaultValueByIndex={firstVerset}
                data={versets}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem)
                    setFirstVerset(selectedItem)
                    // setLastVersetOfSelectedSurah(selectedItem.versets)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />
            <SelectDropdown
                buttonStyle={styles.selectAyah}
                buttonTextStyle={styles.selectAyahText}
                defaultValueByIndex={versets.length - 1 ?? 7}
                data={versets}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem)
                    // setLastVersetOfSelectedSurah(selectedItem.versets)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    selectAyahContent: {
        display: 'flex',
        flexDirection: "row",
        gap: 20,
        marginVertical: 10
    },
    selectAyah: {
        width: 100,
        padding: 5
    },
    selectAyahText: {
        fontSize: 15
    }

});
