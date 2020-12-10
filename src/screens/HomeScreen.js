import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';

import Moment from 'moment';

import TextList from '../components/TextList';
import Api from '../Api';
function HomeScreen({ navigation}) {
  const [state, setState] = useState([]);
  const [adv, setAdv] = useState([]);
  useEffect(() => {
    fetch(`${Api.getURL()}/advertisement`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((adv) => {
        setAdv(adv);
        console.log(adv);
      });
  }, [])

  Moment.locale('en');


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{console.log(adv)}
      {adv.map((elem, key) => {
        var dt = elem.created_at;

        return <TextList key={`adv-${key}`} style={styles.adv} name={elem.name} value={Moment(dt).format('HH:mm D MMM yy')}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('AdvertisementDetailsScreen', {
              advertisementId: { key }
            });
          }}
        />
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  adv: {
    flexDirection: 'column',
    backgroundColor: '#dda',
    borderRadius: 25,
    height: 100,
    margin: 5
  },
});

export default HomeScreen;