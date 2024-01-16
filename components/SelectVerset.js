

import React, { useEffect, useState } from 'react'

import { View, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import RNPickerSelect from 'react-native-picker-select';
import { sourates } from '../constants/sorats.list';



export default function SelectVerset(
    {
        lastVersetOfSelectedSurah,
        setSelectSartVerset,
        setSelectEndVerset,
        currentIndex,
        setCurrentSlide,
        isPlaying,
    }) {

    const [versets, setVersets] = useState([])
    const [lastDeffaultValue, setLastDeffaultValue] = useState()

    const lastDeffaultValueFn = (value) =>{
        return value
    }
    useEffect(() => {
        const versetsArray = []
        let ration = 0
        for (let index = 1; index <= lastVersetOfSelectedSurah; index++) {
            versetsArray.push(index)
            ration+=index
        }
        console.log('ration',ration)
        setVersets(versetsArray)
        setSelectSartVerset(1)
        setSelectEndVerset(versetsArray.length)
        
    }, [lastVersetOfSelectedSurah])
 
    return (
        <View style={styles.selectAyahContent} >
            <SelectDropdown
                buttonStyle={styles.selectAyah}
                buttonTextStyle={styles.selectAyahText}
                defaultValue={versets ? versets.length - (sourates[currentIndex - 1]?.versets-1) : 1 }
                disabled={isPlaying}
                data={versets}
                onSelect={(selectedItem, index) => {
                    setSelectSartVerset(selectedItem)
                    setCurrentSlide(index)
                }}

                buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                rowTextForSelection={(item, index) => item}
            />

            <SelectDropdown
                buttonStyle={styles.selectAyah}
                buttonTextStyle={styles.selectAyahText}
                defaultValue={versets.length}

                disabled={isPlaying}
                data={versets}

                onSelect={(selectedItem, index) => {
                    setSelectEndVerset(selectedItem)
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
