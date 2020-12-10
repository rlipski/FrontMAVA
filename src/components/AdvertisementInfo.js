import React, {Fragment} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';


import { Api } from '../Api';
import { Card } from './Card';


export default function AdvertisementInfo({ advertisement, onPress }) {
  console.log(advertisement.name);
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.infoContainer}>
        {advertisement ? (
          <View>
            <Text style={styles.name}>{advertisement.name}</Text>
            <Text style={styles.price}>{advertisement.price}</Text>
            <Text style={styles.location}>{advertisement.location}</Text>
          </View>
        ) : (<View></View>) }

      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
  },
});