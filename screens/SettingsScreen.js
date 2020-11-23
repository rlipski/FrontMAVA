import React, {useState} from 'react';
import { Button, View, Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Form from './Form';
async function clearStorage()  {
  try {
    await AsyncStorage.clear()
    alert('Storage successfully cleared!')
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
}

function isLoggedIn() {
 AsyncStorage.getItem("@save_token").then(value => {
        if(value == null){console.log('login');navigate("Home");
              return 0 ;
        }
        else{console.log('log out');navigate("Home");
        // clearStorage();
          return 1 ;
        }
      })
        .catch(err => {navigate("Home");
           return 0 ;console.log('log out');
  });
}
function SettingsScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     {!isLoggedIn() ? <Form type="SignUp"/> : (<Text>Log out</Text>)}
    </View>
  );
}

export default SettingsScreen;