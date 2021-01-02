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

import Api from '../Api';

function AdvertisementDetailsScreen({navigation, route}) {
  const { logout } = React.useContext(AuthContext);
  const { user } = React.useContext(UserContext);

  const [advertisement, setAdvertisement] = useState({});
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
      <Heading style={styles.title}>{advertisement.name}</Heading>
{/* {console.log(user)} */}

      <TextList name="Description" value={advertisement.description ? advertisement.description : '-'}/>
      <TextList name="Price" value={advertisement.price ? advertisement.price : '-'}/>
      <TextList name="Address" value={advertisement.location, " ", advertisement.location, " ", advertisement.location }/>

      <TextButton
        title={`Refresh`}
        onPress={() => {
          refresh();
        }}
      />
      <TextButton
        title={`Edit`}
        onPress={() => {
          navigation.navigate('AdvertisementEdit', { id: advertisement.id});
        }}
      />
      <TextButton
        title={`Delete`}
        onPress={() => {
          console.log(route);
          // try {
          //   setLoading(true);
          //   fetch(`${Api.getURL()}/advertisement/${advertisement.id}`, {
          //    method: 'DELETE',
          //    headers: {
          //      Accept: 'application/json',
          //      'Content-Type': 'application/json',
          //      'Authorization': `Bearer ${route.params.user.token }`,
          //    }
          //  })
          //   .then(response => response.json())
          //   .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
          //   .catch(err => console.log(err))
          //   // navigation.pop();
          // } catch (e) {
          //   setError(e.message);
          //   setLoading(false);
          // }
        }}



      />
      <Loading loading={loading} />
    </View>
  );
}

export default AdvertisementDetailsScreen;

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
  },
  input: {
    marginVertical: 20,
    width: '80%'
  }
});