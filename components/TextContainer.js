import React from 'react'
import  {View, Text, StyleSheet} from 'react-native'
import { windowWidth } from '../style'

export default function TextContainer() {
  return (
    <View style={style.textContainer} >
      <Text style={style.text}>
      Un texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens 
      et utilisant les structures propres à une
      </Text>
    </View>
  )
}


const style = StyleSheet.create({
  textContainer: {
    width : windowWidth,
    height: windowWidth,
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