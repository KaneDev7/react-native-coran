import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { windowWidth } from '../style'
import { GlobalContext } from '../App'
import { primary, secondary, secondary2, secondary3 } from '../style/variables'

export default function TextContainer() {
  const { coranText } = useContext(GlobalContext)
   
  return (
    <ScrollView style={style.textContainer} >
      <Text style={style.text}> {coranText} </Text>
    </ScrollView>
  )
}


const style = StyleSheet.create({
  textContainer: {
    width: windowWidth,
    height: windowWidth - 100,
    backgroundColor: secondary3,
    borderWidth: 3,
    borderColor: secondary2,
    textAlign: 'center',
    marginTop: 50,
    paddingHorizontal: 10, 
    borderRadius: 10
  },
  text: {
    fontSize: 24,
    lineHeight: 50,
    textAlign: 'center',
    color : primary,
    paddingVertical :( windowWidth - 100) / 2,

  },
 
})