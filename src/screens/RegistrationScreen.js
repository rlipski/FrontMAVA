import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';


import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import IconButton from '../components/IconButton';
import Loading from '../components/Loading';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContext';

function RegistrationScreen({ navigation }) {
  const { register } = React.useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <IconButton
        name={'close-circle-outline'}
        style={styles.closeIcon}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Heading style={styles.title}>{error}REGISTRATION</Heading>
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
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        style={styles.input}
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <FilledButton
        style={styles.input}
        title={'Register'}
        onPress={async () => {
          try {
            setLoading(true);
            await register(name, email, password);
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

export default RegistrationScreen;

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