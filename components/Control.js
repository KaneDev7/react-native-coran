import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { windowWidth } from '../style'
import { primary } from '../style/variables';
import { sourates } from '../constants/sorats.list';
import { GlobalContext } from '../App';


const iconSize = 30

export default function Control() {

  const {
    playSound,
    startUrl,
    isPlaying,
    setIsFirstStart,
    setIsplaying,
    setPlayPauseIcon,
    playPauseIcon,
    setCurrentSlide,
    selectSartVerset,
    setSurahNumber,
    currentIndex,
    setSound,
    setSurahTextValue,
    setCorantText
  } = useContext(GlobalContext)




  const handlepress = () => {
    let toggleIcon = !isPlaying ? 'stop' : 'play'
    setIsFirstStart(true)
    setIsplaying(v => !v)
    setPlayPauseIcon(toggleIcon)
    setCurrentSlide(selectSartVerset)
    setSound(null)
    if (!isPlaying) {
      playSound(startUrl)
    }
  }

  const handleNext = () => {
    setSound(null)
    setIsplaying(true)
    setPlayPauseIcon('play')
    setCurrentSlide(selectSartVerset)
    setSurahNumber(sourates[currentIndex].numero)
    setSurahTextValue(sourates[currentIndex].nom)
    setCorantText('')
  }

  const handlePrev = () => {
    setSound(null)
    setIsplaying(false)
    setPlayPauseIcon('play')
    setCurrentSlide(selectSartVerset)
    setSurahNumber(sourates[currentIndex - 2].numero)
    setSurahTextValue(sourates[currentIndex - 2].nom)
    setCorantText('')
  }

  return (
    <View style={{pointerEvents : 'auto', opacity :'1', ...style.controlConatiner}} >
      <FontAwesome5 onPress={handlePrev} name={'backward'} size={30} color={primary} />
      <FontAwesome5 onPress={handlepress} name={playPauseIcon} size={iconSize} color={primary} />
      <FontAwesome5 onPress={handleNext} name={'forward'} size={30} color={primary} />
    </View>
  )
}


const style = StyleSheet.create({
  controlConatiner: {
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
    gap: 50,
    marginVertical: 20,
  }
})