import { View, FlatList, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { sourates } from '../constants/sorats.list';
import { primary, secondary, secondary3 } from '../style/variables';



const Item = ({ item,index, navigation }) => {
   
  return <TouchableNativeFeedback
    style={styles.touchableNative}
    onPress={() => navigation.navigate('Lecture', {sourateIndex : index})}
  >
    <View style={styles.item} >
      <View style={styles.itemRight} >
        <View style={styles.itemRightVerset} >
          <Text style={styles.itemRightVersetText} > {item.numero} </Text>
        </View>
        <Text style={styles.suratText} > {item.nom} </Text>
      </View>
      <Text style={{fontSize : 16}}>  {item.versets} v </Text>
    </View>

  </TouchableNativeFeedback>

};

export default function Sourates({ navigation }) {
  return (
    <View style={styles.container} >
      <FlatList
      
        data={sourates}
        renderItem={({ item, index }) => <Item index={index} item={item} navigation={navigation} />}
        keyExtractor={item => item.numero}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
    backgroundColor: secondary3,
  },
  touchableNative: {
    flex: 1
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexDirection :'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical : 15,
    marginBottom :20,
    color: primary,
  },
  suratText: {
    fontSize : 23,
    fontWeight : '600',
    color : primary
  },
  itemRight: {
    display: 'flex',
    alignItems: 'center',
    flexDirection :'row',
    gap: 10,
  },
  itemRightVerset: {
    width: 35,
    height: 35,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent : 'center',
    borderWidth: 1,
    borderColor: secondary,
  },
  itemRightVersetText : {
    fontSize : 15
  }

});