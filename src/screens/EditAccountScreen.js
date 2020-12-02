import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';


import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import IconButton from '../components/IconButton';
import Loading from '../components/Loading';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContext';

function EditAccountScreen({ navigation }) {
  const {
    auth: { editAccount },
    user
  } = React.useContext(AuthContext);
  const [token, setToken] = useState(user.token);
  const [name, setName] = useState(user.user.name);
  const [email, setEmail] = useState(user.user.email);
  const [phone, setPhone] = useState(user.user.phone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <IconButton
        name={'close-circle-outline'}
        style={styles.closeIcon}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
      <Heading style={styles.title}>{error}EDIT</Heading>
      <Input
        style={styles.input}
        placeholder={'Name'}
        value={name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder={'Phone'}
        value={phone}
        onChangeText={setPhone}
      />

      <FilledButton
        style={styles.input}
        title={'Save'}
        onPress={async () => {
          try {
            setLoading(true);
            await editAccount(token, name, email, phone);
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

export default EditAccountScreen;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 16,
    right: 16
  }
});