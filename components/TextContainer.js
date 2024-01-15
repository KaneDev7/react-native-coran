import React from 'react'
import  {View, Text, StyleSheet} from 'react-native'
import { windowWidth } from '../style'

export default function TextContainer({coranText}) {
 console.log('coranText', coranText)
  return (
    <View style={style.textContainer} >
      <Text style={style.text}> {coranText} </Text>
    </View>
  )
}


const style = StyleSheet.create({
  textContainer: {
    width : windowWidth,
    height: windowWidth -20,
    display: 'flex',
    justifyContent: 'center',
    alignItems : 'center',
    backgroundColor:  '#f8f8f8',
    borderWidth: 2,
    borderColor: '#ddd',
    textAlign :'center',
    marginTop: 50,
    padding: 5,
    borderRadius: 10
  },
  text:{
    fontSize: 20,
    textAlign :'center'
  }
})