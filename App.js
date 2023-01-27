import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [time, setTime] = useState('00:00:00');
  const [button, setButton] = useState('Play');
  const [last, setLast] = useState(null);

  function play() {
    if(timer !== null) {
      clearInterval(timer);
      timer = null;
      setButton('Play')
    } else {
      timer = setInterval(() => {
        ss++;

        if(ss == 60) {
          ss = 0;
          mm++;
        }

        if(mm == 60) {
          mm = 0;
          hh++;
        }

        let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

        setTime(format);

      }, 1000);
      setButton('Stop');
    }
  }

  function clear() {
    if(timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    
    setLast(time);
    setTime('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0;
    setButton('Play')
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./src/chronometer.png')} />

      <Text style={styles.timer}>{time}</Text>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={play}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={clear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastArea}>
        <Text style={styles.lastTime}>{last ? 'Last Time: ' + last : ''}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AEEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginTop: -250,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 16,
    borderRadius: 9,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00AEEF',
  },
  lastArea: {
    marginTop: 40,
  },
  lastTime: {
    fontSize: 25,
    color: '#FFF',
    fontStyle: 'italic',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
});
