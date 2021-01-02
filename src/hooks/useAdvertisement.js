import React, { useReducer, useState, useEffect } from 'react';
import Api from '../Api';
import AsyncStorage from '@react-native-community/async-storage';
import { createAction } from '../config/createAction';
import { sleep } from '../utils/sleep';
import jwt_decode from 'jwt-decode';
import SecureStorage from 'react-native-secure-storage';

export function useAdvertisement() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: { ...action.payload },
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

  const action = React.useMemo(
    () => ({
      delete: async (endpoint) => {
        fetch(`${Api.getURL()}${endpoint}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            console.log(data);
          });
      },
      add: async (name, description, price) => {
        console.log(`${Api.getURL()}/advertisement`);
        await fetch(`${Api.getURL()}/advertisement`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
      },
      editAccount: async (token, name, email, phone) => {
        const value = await AsyncStorage.getItem('userToken');

        let decodedToken = jwt_decode(token); console.log(decodedToken);
        console.log(`${Api.getURL()}/user/${decodedToken.sub}`);
        await fetch(`${Api.getURL()}/user/${decodedToken.sub}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name: name, email: email, phone: phone }),
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

  // useEffect(() => {
  //   sleep(2000).then(() => {
  //     SecureStorage.getItem('user').then(user => {
  //       if (user) {
  //         dispatch(createAction('SET_USER', JSON.parse(user)));
  //       }
  //     });
  //   });
  // }, []);

  return { action, state };
}