import React, { useReducer, useState, useEffect } from 'react';
import Api from '../Api';
import AsyncStorage from '@react-native-community/async-storage';
import { createAction } from '../config/createAction';
import { sleep } from '../utils/sleep';
import jwt_decode from 'jwt-decode';
import SecureStorage from 'react-native-secure-storage';
import { UserContext } from '../contexts/UserContext';

export function useGet(endpoint, initialValue = []) {
  const { token } = React.useContext(UserContext);
  const [data, setData] = React.useState(initialValue);

  React.useEffect(() => {
    if (token) {
      let decodedToken = jwt_decode(token);
    }
    fetch(`${Api.getURL()}${endpoint}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [token, endpoint]);
  return data;
}