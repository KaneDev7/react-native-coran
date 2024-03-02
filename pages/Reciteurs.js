import { View, FlatList, Text, TouchableNativeFeedback, StyleSheet,Image } from 'react-native'
import { sourates } from '../constants/sorats.list';
import { primary, secondary, secondary3 } from '../style/variables';
import { reciteurs } from '../constants/reciteurs';


const Item = ({ item,index, navigation }) => {
  
  return <TouchableNativeFeedback
    style={styles.touchableNative}
    onPress={() => navigation.navigate('Lecture', {sourateIndex : index})}
  >
    <View style={styles.item} >
      <View style={styles.itemRight} >
        <View style={styles.itemRightVerset} >
        <Image
        style={styles.image}
        source={item.url}
      />
        </View>
        <Text style={styles.suratText} > {item.name} </Text>
      </View>
    </View>

  </TouchableNativeFeedback>

};

export default function Reciteurs({ navigation }) {
  return (
    <View style={styles.container} >
      <FlatList
        data={reciteurs}
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
    paddingHorizontal: 30,
    paddingVertical : 40,
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
    gap: 30,
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
  },
  image:{
    width : 70,
    height : 70,
    borderRadius : '50%'
  }

});