import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

import AuthScreen from './AuthScreen';

import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import TextList from '../components/TextList';

import Api from '../Api';

function ProfileScreen({navigation, route}) {
  const {
    auth: {logout},
    user
  } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
/////
  const [state, setState] = useState([])
  useEffect(() => {
    fetch(`${Api.getURL()}/user/1`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${route.params.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(route);
        setState(resData.data);
      })
  })


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Heading style={styles.title}>PROFILE</Heading>
{console.log(user)}

      <TextList name="Name" value={user.user.name}/>
      <TextList name="Phone" value={user.user.phone ? user.user.phone : '-'}/>
      <TextList name="Email" value={user.user.email ? user.user.email : '-'}/>
      <TextList name="Address" value={user.user.street, " ", user.user.building_number, " ", user.user.apartment_numer }/>
      <TextList name="Address 2" value={user.user.city, " ", user.user.zip_code }/>

      <TextButton
        title={`Edit`}
        onPress={() => {
          navigation.navigate('EditAccount');
        }}
      />
      <TextButton
        title={`Logout`}
        onPress={() => {
          logout();
        }}
      />
      <Loading loading={loading} />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
  },
  input: {
    marginVertical: 20,
  }
});