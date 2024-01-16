import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { windowWidth } from '../style'
import { primary } from '../style/variables';
const iconSize = 60

export default function Control({
  playSound, 
  startUrl, 
  isPlaying, 
  setIsplaying,
  setCurrentSlide,
  selectSartVerset

}) {
  toggleIcon = !isPlaying ? 'play-circle' : 'stop-circle'

  const handlepress = () => {
    setIsplaying(!isPlaying)
    if(isPlaying){
      setCurrentSlide(selectSartVerset)
    }
    playSound(startUrl)
  }
  return (
    <View style={style.controlConatiner} >
      <Ionicons name={'play-skip-back-circle'} size={iconSize} color={primary} />
      <Ionicons onPress={handlepress} name={toggleIcon} size={iconSize} color={primary} />
      <Ionicons name={'play-skip-forward-circle'} size={iconSize} color={primary} />
    </View>
  )
}


const style = StyleSheet.create({
  controlConatiner: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20
  }
})