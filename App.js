import { StyleSheet } from 'react-native';
import { createContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { convertSelectVerset } from './use-case/conversion';
import { getCoranText } from './services/coranText';
import { sourates } from './constants/sorats.list';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Player from './pages/Player';
import Sourates from './pages/Sourates';
import Reciteurs from './pages/Reciteurs';
import { primary, secondary} from './style/variables';


export const GlobalContext = createContext()

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



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
  const [playPauseIcon, setPlayPauseIcon] = useState('play')
  const [isFirstStart, setIsFirstStart] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(selectSartVerset)
  const [surahTextValue, setSurahTextValue] = useState(sourates[0].nom)
  const [reciter, setReciter] = useState('aymanswoaid')
  const [rate, setRate] = useState(1)

  let currentVerset = startPlayVerset

  console.log('reciter', reciter)

  async function playSound(url) {
    if (!isPlaying && !isFirstStart) {
      setSound(null)
      return
    }

    getCoranText(currentVerset).then(text => {
      setCorantText(text)
    })

    if (url) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true },
        onPlaybackStatusUpdate,

      );
      setSound(sound);

    }
  }

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setSound(null);
      setCurrentSlide(v => currentVerset >= endPlayVerset ? selectSartVerset : v + 1)

      if (currentVerset >= endPlayVerset) {
        currentVerset = startPlayVerset - 1
      }
      currentVerset++

      getCoranText(currentVerset).then(text => {
        setCorantText(text)
      })
      playSound(`https://cdn.islamic.network/quran/audio/64/ar.${reciter}/${currentVerset}.mp3`)
    }

  };



  useEffect(() => {
    const startPlayVersetUpdate = convertSelectVerset({ surahNumber, selectedValue: selectSartVerset })
    const endPlayVersetUpdate = convertSelectVerset({ surahNumber, selectedValue: selectEndVerset })

    setStartPlayVerset(startPlayVersetUpdate)
    setEndPlayVerset(endPlayVersetUpdate)
    setStartUrl(`https://cdn.islamic.network/quran/audio/64/ar.${reciter}/${startPlayVersetUpdate}.mp3`)

  }, [selectSartVerset, selectEndVerset, surahNumber, reciter]);


  useEffect(() => {
    return sound ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  return (
    <GlobalContext.Provider value={{
      setFirstVersetOfSelectedSurah,
      setLastVersetOfSelectedSurah,
      setSurahNumber,
      setCurrentIndex,
      setCurrentSlide,
      setIsplaying,
      setPlayPauseIcon,
      setIsFirstStart,
      setSurahTextValue,
      setCorantText,
      setSelectSartVerset,
      setSelectEndVerset,
      playSound,
      setSound,
      setRate,
      setReciter,
      rate,
      reciter,
      coranText,
      startUrl,
      isPlaying,
      playPauseIcon,
      isFirstStart,
      currentIndex,
      currentSlide,
      surahTextValue,
      selectSartVerset,
      selectEndVerset,
      firstVersetOfSelectedSurah,
      lastVersetOfSelectedSurah
    }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ route }) => ({
            // tabBarIcon: ({ focused }) => {
            //   let iconName;
            //   if (route.name === 'Sourates') {
            //     iconName = focused
            //       ? 'list'
            //       : 'list-outline';
            //   } else if (route.name === 'Lecture') {
            //     iconName = focused ?
            //       'play-circle' :
            //       'play-circle-outline';
            //   } else if (route.name === 'Réciteurs') {
            //     iconName = focused ?
            //       'man' :
            //       'man-outline';
            //   }

            //   // You can return any component that you like here!
            //   return <Ionicons name={iconName} size={30} color={secondary} />;
            // },
            tabBarActiveTintColor: primary,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 22,
              color: primary,
              padding: 4
            },
            tabBarStyle: {
              height: 60,
              color: primary,
            },
          })}
        >
          <Stack.Screen name="Sourates" component={Sourates} />
          <Stack.Screen name='Lecture' component={Player} />
          <Stack.Screen name="Réciteurs" component={Reciteurs} />

        </Stack.Navigator>
      </NavigationContainer>
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