import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import TextContainer from './components/TextContainer';
import Track from './components/Track';
import SelectSurah from './components/SelectSurah';
import { useEffect, useState } from 'react';
import SelectVerset from './components/SelectVerset';
import { Audio } from 'expo-av';
import { convertSelectVerset } from './use-case/conversion';

// export default function App() {
//   const [
//     lastVersetOfSelectedSurah,
//     setLastVersetOfSelectedSurah
//   ] = useState(0)

//   const [sound, setSound] = useState();
//   const [url, setUrl] = useState('')

//   async function playSound() {
//     console.log('Loading Sound');
//     if (url) {
//       const { sound } = await Audio.Sound.createAsync(
//         { uri: url },
//         { shouldPlay: true },
//       );
//       setSound(sound);

//       console.log('Playing Sound');
//       await sound.playAsync();
//       console.log('sound end');
//     }

//   }



//   useEffect(() => {
//     setUrl('https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3')
//   }, [url]);

//   useEffect(() => {
//     return sound ? () => {
//       console.log('Unloading Sound');
//       sound.unloadAsync();
//     }
//       : undefined;
//   }, [sound]);

//   return (
//     <View style={styles.container}>
//       <TextContainer />
//       <SelectSurah
//         setLastVersetOfSelectedSurah={setLastVersetOfSelectedSurah}
//       />
//       <Track />

//       <SelectVerset
//         lastVersetOfSelectedSurah={lastVersetOfSelectedSurah}
//       />

//       <View style={styles.container}>
//         <Button title="Play Sound" onPress={playSound} />
//       </View>

//       <StatusBar style="auto" />
//     </View>
//   );
// }

export default function App() {
  const [lastVersetOfSelectedSurah, setLastVersetOfSelectedSurah] = useState(0);
  const [firstVersetOfSelectedSurah, setFirstVersetOfSelectedSurah] = useState(0);

  const [sound, setSound] = useState();
  const [url, setUrl] = useState('');
  const [surahNumber, setSurahNumber] = useState(1)

  const [selectsartVerset, setSelectsartVerset] = useState(1)
  const [selectendVerset, setSelectendVerset] = useState(7)

  const [startPlayVerset, setStartPlayVerset] = useState(null)
  const [endPlayVerset, setEndPlayVerset] = useState(null)


  async function playSound() {
    console.log('Loading Sound');

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
      console.log('Sound finished playing');
      // Faire quelque chose à la fin de la lecture, par exemple, arrêter le son ou déclencher une autre action.
      setSound(null); // Définir le son sur null pour indiquer qu'il n'est plus en cours de lecture.
    }
  };

  useEffect(() => {
    setStartPlayVerset(
      convertSelectVerset(
        { surahNumber, selectedValue : selectsartVerset }
      )
    )

    setEndPlayVerset(
      convertSelectVerset(
        { surahNumber, selectedValue : selectendVerset }
      )
    )
    setUrl('https://cdn.islamic.network/quran/audio/128/ar.alafasy/293.mp3');
  }, [url]);

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
      <TextContainer />
      <SelectSurah
        surahNumber={surahNumber}
        setFirstVersetOfSelectedSurah={setFirstVersetOfSelectedSurah}
        setLastVersetOfSelectedSurah={setLastVersetOfSelectedSurah}
      />
      <Track />

      <SelectVerset
        firstVersetOfSelectedSurah={firstVersetOfSelectedSurah}
        lastVersetOfSelectedSurah={lastVersetOfSelectedSurah}
      />

      <View style={styles.container}>
        <Button title="Play Sound" onPress={playSound} />
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
