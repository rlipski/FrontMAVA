import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import Heading from '../components/Heading';
import Loading from '../components/Loading';

function LogoutScreen({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Heading style={styles.title}>LOGIN {error}</Heading>
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
      <FilledButton
        style={styles.input}
        title={'Login'}
        onPress={async () => {
          try {
            setLoading(true);
            await login(email, password);
            navigation.navigate('Account');
          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        }}
      />


      <TextButton
        title={`Haven't you an account? Create one`}
        onPress={() => {
          navigation.navigate('Registration');
        }}
      />
      <Loading loading={loading} />
    </View>
  );
}

export default LogoutScreen;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  }
});