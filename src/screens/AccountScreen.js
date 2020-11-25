import React, { useReducer } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../contexts/AuthContext';

import AuthStackNavigator from '../navigators/AuthStackNavigator';
import Api from '../Api';
import axios from 'axios';
import { createAction } from '../config/createAction';
const RootStack = createStackNavigator();

function AccountScreen() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: {...action.payload}
        };
      default:
        return state;
    }

  }, {
    user: undefined
  });

  const auth = React.useMemo(
    () => ({
      login: async (email, password) => {
        console.log(`${Api.getURL()}/login`);
        await fetch(`${Api.getURL()}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then((res) => res.json())
          .then((resData) => {
            const user = {
              token: resData.access_token
            };
            dispatch(createAction('SET_USER', user));
            console.log(resData);
          })
          .catch((error) => {
            console.log('Api call error');
            alert(error.message);
          });
      },

      logout: () => {
        console.log('logout');
      },

      register: async (name, email, password) => {
        console.log(`${Api.getURL()}/register`);
        await fetch(`${Api.getURL()}/register`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: name, email: email, password: password }),
        })
          .then((res) => res.json())
          .then((resData) => {
            console.log(resData);
          })
          .catch((error) => {
            console.log('Api call error');
            alert(error.message);
          });
      }
    }),
    [],
  );

  console.log(state.user);
  return (
    <AuthContext.Provider value={auth}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={'RootStack'} component={AuthStackNavigator} />
      </RootStack.Navigator>
    </AuthContext.Provider>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
  },
});
