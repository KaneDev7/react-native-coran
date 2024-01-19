import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { windowWidth } from '../style'
import { GlobalContext } from '../App'

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
    backgroundColor: '#f8f8f6',
    borderWidth: 2,
    borderColor: '#ddd',
    textAlign: 'center',
    marginTop: 50,
    paddingHorizontal: 10, 
    borderRadius: 10
  },
  text: {
    fontSize: 25,
    lineHeight: 50,
    textAlign: 'center',
    paddingVertical :( windowWidth - 100) / 2,

  },
 
})