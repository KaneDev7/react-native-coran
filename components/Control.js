import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { windowWidth } from '../style'
import { primary } from '../style/variables';
import { sourates } from '../constants/sorats.list';
import { GlobalContext } from '../App';


const iconSize = 62

export default function Control() {

  const {
    playSound,
    startUrl,
    isPlaying,
    setIsplaying,
    setCurrentSlide,
    selectSartVerset,
    setSurahNumber,
    currentIndex,
    setSound,
    setIsFirstStart,
    setSurahTextValue,
    setCorantText
  } = useContext(GlobalContext)

  const [playPauseIcon, setPlayPauseIcon] = useState('play')

  const handlepress = () => {
    let toggleIcon = !isPlaying ? 'pausecircle' : 'play'
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
    <View style={style.controlConatiner} >
      <AntDesign onPress={handlePrev} name={'banckward'} size={45} color={primary} />
      <AntDesign onPress={handlepress} name={playPauseIcon} size={iconSize} color={primary} />
      <AntDesign onPress={handleNext} name={'forward'} size={45} color={primary} />
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
    marginVertical: 20
  }
})