import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';


import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import TextList from '../components/TextList';
import IconButton from '../components/IconButton';

import Api from '../Api';

function AdvertisementEditScreen({navigation, route}) {
  const { logout } = React.useContext(AuthContext);
  const { user } = React.useContext(UserContext);

  const [advertisement, setAdvertisement] = useState({});
  const [name, setName] = useState(advertisement.name);
  const [price, setPrice] = useState(advertisement.price);
  const [description, setDescription] = useState(advertisement.description);
  const [location, setLocation] = useState(advertisement.location);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
/////
  const [state, setState] = useState([])
  const { id } = route.params;
  useEffect(() => {
    fetch(`${Api.getURL()}/advertisement/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${route.params.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setAdvertisement(resData);
      })
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <IconButton
        name={'close-circle-outline'}
        style={styles.closeIcon}
        onPress={() => {
          navigation.navigate('AdvertisementDetails', { id: advertisement.id});
        }}
      />

      <Input
        style={styles.input}
        placeholder={'Name'}
        value={advertisement.name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        placeholder={'Price'}
        value={advertisement.price}
        onChangeText={setPrice}
      />
      <Input
        style={styles.input}
        placeholder={'Description'}
        value={advertisement.description}
        onChangeText={setDescription}
      />
      <Input
        style={styles.input}
        placeholder={'Location'}
        value={advertisement.location}
        onChangeText={setLocation}
      />

      <FilledButton
        style={styles.input}
        title={'Save'}
        onPress={async () => {
          try {
            setLoading(true); console.log(token, "totttoootototken");
            await fetch(`${Api.getURL()}/advertisement/${advertisement.id}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ name: name, description: description, location: location, price: price }),
            })
              .then((res) => res.json())
              .then((resData) => {
                console.log(resData);
              })
              .catch((error) => {
                console.log('Api call error');
                alert(error.message);
              });
            navigation.pop();
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
      />
      <Loading loading={loading} />
    </View>
  );
}

export default AdvertisementEditScreen;

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
  },
  input: {
    marginVertical: 20,
    width: '80%'
  },
  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 16
  }
});