import React from 'react'
import  {View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { windowWidth } from '../style'
const iconSize = 60
const iconColor = '#0d99ff'

export default function Control({playSound,startUrl,isPlaying,setIsplaying}) {
  toggleIcon = !isPlaying ? 'play-circle' : 'stop-circle' 
  
  const handlepress = () =>{
    setIsplaying(v => !v)
    playSound(startUrl)
  }
  return (
    <View style={style.controlConatiner} >
      <Ionicons name={'play-skip-back-circle'} size={iconSize} color={iconColor} />
      <Ionicons onPress={handlepress} name={toggleIcon} size={iconSize} color={iconColor} />
      <Ionicons name={'play-skip-forward-circle'} size={iconSize} color={iconColor} />
    </View>
  )
}


const style = StyleSheet.create({
  controlConatiner:{
    width : windowWidth,
    display : 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap : 10,
    marginVertical : 20
  }
})