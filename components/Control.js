import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { windowWidth } from '../style'
import { primary } from '../style/variables';
import { sourates } from '../constants/sorats.list';
import { GlobalContext } from '../App';

const iconSize = 60

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
    setSurahTextValue,
    setCorantText
  } = useContext(GlobalContext)


  toggleIcon = !isPlaying ? 'play-circle' : 'stop-circle'

  const handlepress = () => {
    setIsplaying(!isPlaying)
    if(isPlaying){
      setCurrentSlide(selectSartVerset)
      setSound(null)
    }
    playSound(startUrl)
  }

  const handleNext = () => {
    console.log('next')
    setSound(null)
    setIsplaying(false)
    setCurrentSlide(selectSartVerset)
    setSurahNumber(sourates[currentIndex].numero)
    setSurahTextValue(sourates[currentIndex].nom)
    setCorantText('')
  }

  const handlePrev = () => {
    console.log('prev')
    setSound(null)
    setIsplaying(false)
    setCurrentSlide(selectSartVerset)
    setSurahNumber(sourates[currentIndex - 2].numero)
    setSurahTextValue(sourates[currentIndex - 2].nom)
    setCorantText('')

  }

  return (
    <View style={style.controlConatiner} >
      <Ionicons onPress={handlePrev} name={'play-skip-back-circle'} size={iconSize} color={primary} />
      <Ionicons onPress={handlepress} name={toggleIcon} size={iconSize} color={primary} />
      <Ionicons onPress={handleNext} name={'play-skip-forward-circle'} size={iconSize} color={primary} />
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