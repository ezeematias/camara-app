import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../components/screens/LoginScreen/LoginScreen.component';
import { Screens } from '../Screens';
import React from 'react';
import RegisterScreen from '../../components/screens/RegisterScreen/RegisterScreen.component';

export type LoginStackParamList = {
    'Login': undefined | {id:number};
    'Register': undefined;
};
const Stack = createStackNavigator<LoginStackParamList>();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.LOGIN} >
        <Stack.Screen name={Screens.LOGIN} component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name={Screens.REGISTER} component={RegisterScreen} options={{headerTitle:'', headerTransparent:true}}  />
    </Stack.Navigator>
  );
}

export default LoginStack