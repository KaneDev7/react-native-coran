import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TextContainer from './components/TextContainer';
import Track from './components/Track';
import SelectSurah from './components/SelectSurah';
import { useEffect, useState } from 'react';
import SelectVerset from './components/SelectVerset';



export default function App() {
  const [
    lastVersetOfSelectedSurah,
    setLastVersetOfSelectedSurah
  ] = useState(0)





  return (
    <View style={styles.container}>
      <TextContainer />
      <SelectSurah
        setLastVersetOfSelectedSurah={setLastVersetOfSelectedSurah}
      />
      <SelectVerset
        lastVersetOfSelectedSurah={lastVersetOfSelectedSurah}
      />
      <Track />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  surahContent: {
    marginVertical: 20
  },
  surahText: {
    fontSize: 25,
  }
});
