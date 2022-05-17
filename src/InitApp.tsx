import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../firebase';
import LoginStack from './navigation/stacks/LoginStack';
import Drawer from './navigation/stacks/Drawer';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

const InitApp = ()=> {
  const data:any = useSelector<any>(store=>store.auth);

  return (
      <NavigationContainer>
          {data.success ? 
            <Drawer /> :  
            <LoginStack />
          }
      </NavigationContainer>
  );
}

export default InitApp
