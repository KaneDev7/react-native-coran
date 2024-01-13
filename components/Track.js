import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { windowWidth } from '../style'

export default function Track() {
    return (
        <View style={style.track} >
            <View style={style.progressBar} >
                <View style={style.progress} >
                  <View style={style.progressDot}></View>
                </View>
            </View>
            <View style={style.trackTime}>
                <Text>0:00</Text>
                <Text>03:20</Text>
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    track: {
        width: windowWidth,
    },
    progressBar: {
      width: windowWidth,
      height: 5,
      backgroundColor: '#e3eef6',
      position: 'relative'
    },
    progress: {
      width: windowWidth / 3,
      height: 5,
      backgroundColor: '#0d99ff',
      position: 'absolute',
      left: '0',
    },
    progressDot:{
      width: 10,
      height: 10,
      backgroundColor: '#0d99ff',
      borderRadius: 100,
      position: 'absolute',
      zIndex: 2,
      top: -2,
      right : -5
    },
    trackTime: {
      display: 'flex',
      justifyContent :'space-between',
      flexDirection: 'row',
      marginTop: 5
    }


})
