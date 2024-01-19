import { StyleSheet } from 'react-native';
import { createContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { convertSelectVerset } from './use-case/conversion';
import { getCoranText } from './services/coranText';
import { sourates } from './constants/sorats.list';
import Home from './Home';


export const GlobalContext = createContext()

export default function App() {
  const [lastVersetOfSelectedSurah, setLastVersetOfSelectedSurah] = useState(0);
  const [firstVersetOfSelectedSurah, setFirstVersetOfSelectedSurah] = useState(0);
  const [startUrl, setStartUrl] = useState('')
  const [sound, setSound] = useState();
  const [surahNumber, setSurahNumber] = useState(1)
  const [selectSartVerset, setSelectSartVerset] = useState(1)
  const [selectEndVerset, setSelectEndVerset] = useState(7)
  const [startPlayVerset, setStartPlayVerset] = useState(1)
  const [endPlayVerset, setEndPlayVerset] = useState(7)
  const [coranText, setCorantText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsplaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(selectSartVerset)
  const [surahTextValue, setSurahTextValue] = useState(sourates[0].nom)
  const [rate, setRate] = useState(1)
  const [soundStatus, setSounStatus] = useState()

  let currentVerset = startPlayVerset

  console.log('isPlaying', isPlaying)
  async function playSound(url) {
    if (isPlaying) {
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
      console.log('status.didJustFinish', status.didJustFinish)
      setSound(null);
      setCurrentSlide(v => currentVerset >= endPlayVerset ? selectSartVerset : v + 1)

      if (currentVerset >= endPlayVerset) {
        currentVerset = startPlayVerset - 1
      }
      currentVerset++

      getCoranText(currentVerset).then(text => {
        setCorantText(text)
      })

      if(isPlaying){
        playSound(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${currentVerset}.mp3`)
      }
     
    }
  };


  useEffect(() => {
    const startPlayVersetUpdate = convertSelectVerset({surahNumber, selectedValue: selectSartVerset})
    const endPlayVersetUpdate = convertSelectVerset({ surahNumber, selectedValue: selectEndVerset})

    setStartPlayVerset(startPlayVersetUpdate)
    setEndPlayVerset(endPlayVersetUpdate)
    setStartUrl(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${startPlayVersetUpdate}.mp3`)

  }, [selectSartVerset, selectEndVerset, surahNumber]);


  useEffect(() => {
    return sound ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }: undefined;
  }, [sound]);

  return (
  <GlobalContext.Provider value={{
    setFirstVersetOfSelectedSurah,
    setLastVersetOfSelectedSurah,
    setSurahNumber,
    setCurrentIndex,
    setCurrentSlide,
    setIsplaying,
    setSurahTextValue,
    setCorantText,
    setSelectSartVerset,
    setSelectEndVerset,
    playSound,
    setSound,
    setRate,
    rate,
    coranText,
    startUrl,
    isPlaying,
    currentIndex,
    currentSlide,
    surahTextValue,
    selectSartVerset,
    selectEndVerset,
    firstVersetOfSelectedSurah,
    lastVersetOfSelectedSurah
  }}>
    <Home/>
  </GlobalContext.Provider>
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
