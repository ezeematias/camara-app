import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../Screens';
import React from 'react';
import HomeScreen from '../../components/screens/HomeScreen/HomeScreen.component';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.HOME} screenOptions={({navigation}) => ({
      headerLeft:()=><TouchableOpacity style={{marginHorizontal:14}}
        onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
    })}>
        <Stack.Screen name={Screens.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack