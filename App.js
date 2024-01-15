import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import TextContainer from './components/TextContainer';
import Track from './components/Track';
import SelectSurah from './components/SelectSurah';
import { useEffect, useState } from 'react';
import SelectVerset from './components/SelectVerset';
import { Audio } from 'expo-av';
import { convertSelectVerset } from './use-case/conversion';
import { getCoranText } from './services/coranText';
import Control from './components/Control';



export default function App() {
  const [lastVersetOfSelectedSurah, setLastVersetOfSelectedSurah] = useState(0);
  const [firstVersetOfSelectedSurah, setFirstVersetOfSelectedSurah] = useState(0);
  const [startUrl, setStartUrl] = useState('')
  const [sound, setSound] = useState();
  const [surahNumber, setSurahNumber] = useState(1)
  const [selectsartVerset, setSelectsartVerset] = useState(1)
  const [selectendVerset, setSelectendVerset] = useState(7)
  const [startPlayVerset, setStartPlayVerset] = useState(1)
  const [endPlayVerset, setEndPlayVerset] = useState(7)
  const [coranText, setCorantText] = useState('')
  const [isPlaying, setIsplaying] = useState(false)

  let currentVerset = startPlayVerset


  async function playSound(url) {
    if(isPlaying){
      return setSound(null)
    }
    console.log('Loading Sound');
    getCoranText(currentVerset).then(text => {
      setCorantText(text)
    })
    if (url) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      setSound(sound);
    }
  }

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setSound(null);
      if (currentVerset >= endPlayVerset) {
        currentVerset = startPlayVerset - 1
      }
      currentVerset++
      getCoranText(currentVerset).then(text => {
        console.log('text', text)
        setCorantText(text)
      })
      console.log('currentVerset', currentVerset)
      playSound(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${currentVerset}.mp3`)
    }
  };



  useEffect(() => {
    const startPlayVersetUpdate = convertSelectVerset({
      surahNumber, selectedValue: selectsartVerset
    })

    const endPlayVersetUpdate = convertSelectVerset({
      surahNumber, selectedValue: selectendVerset
    })

    console.log('hello')
    setStartPlayVerset(startPlayVersetUpdate)
    setEndPlayVerset(endPlayVersetUpdate)
    setStartUrl(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${startPlayVersetUpdate}.mp3`)

  }, [selectsartVerset, selectendVerset, surahNumber]);


  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TextContainer coranText={coranText} />
      <SelectSurah
        setSurahNumber={setSurahNumber}
        setFirstVersetOfSelectedSurah={setFirstVersetOfSelectedSurah}
        setLastVersetOfSelectedSurah={setLastVersetOfSelectedSurah}
        isPlaying={isPlaying}
      />
      <Track />
      <SelectVerset
        firstVersetOfSelectedSurah={firstVersetOfSelectedSurah}
        lastVersetOfSelectedSurah={lastVersetOfSelectedSurah}
        setSelectsartVerset={setSelectsartVerset}
        setSelectendVerset={setSelectendVerset}
        isPlaying={isPlaying}
      />

      <View style={styles.container}>
        <Control
          playSound={playSound}
          startUrl={startUrl}
          isPlaying={isPlaying}
          setIsplaying={setIsplaying}
        />
        {/* <Button title="Play Sound" onPress={() => playSound(startUrl)} /> */}
      </View>

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
