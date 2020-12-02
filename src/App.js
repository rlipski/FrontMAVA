import React, {useState, useEffect, useReducer} from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import AccountScreen from './screens/AccountScreen';
import {AuthContext} from './contexts/AuthContext';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import Api from './Api';
import jwt_decode from 'jwt-decode';
import {createAction} from './config/createAction';
const Tab = createMaterialBottomTabNavigator();

function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
    },
  );

  const auth = React.useMemo(
    () => ({
      login: async (email, password) => {
        console.log(`${Api.getURL()}/login`);
        await fetch(`${Api.getURL()}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email, password: password}),
        })
          .then((res) => res.json())
          .then((resData) => {
            const user = {
              token: resData.access_token,
              user: resData.user,
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
        // await SecureStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },

      register: async (name, email, password) => {
        console.log(`${Api.getURL()}/register`);
        await fetch(`${Api.getURL()}/register`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: name, email: email, password: password}),
        })
          .then((res) => res.json())
          .then((resData) => {
            console.log(resData);
          })
          .catch((error) => {
            console.log('Api call error');
            alert(error.message);
          });
      },
      editAccount: async (token, name, email, phone) => {
        let decodedToken = jwt_decode(token); console.log(decodedToken);
        console.log(`${Api.getURL()}/user/${decodedToken.sub}`);
        await fetch(`${Api.getURL()}/user/${decodedToken.sub}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name: name, email: email, phone: phone}),
        })
          .then((res) => res.json())
          .then((resData) => {
            console.log(resData);
          })
          .catch((error) => {
            console.log('Api call error');
            alert(error.message);
          });
      },
    }),
    [],
  );

  console.log(state.user);

  return (
    <AuthContext.Provider value={{auth, user: state.user}}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{backgroundColor: '#694fad'}}>
          <Tab.Screen name="Home" component={HomeScreen} />
          {!state.user ? (
            <Tab.Screen
              name="Login"
              component={AuthScreen}
              initialParams={{user: state.user}}
            />
          ) : (
            <Tab.Screen
              name="Account"
              component={AccountScreen}
              initialParams={{user: state.user}}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
