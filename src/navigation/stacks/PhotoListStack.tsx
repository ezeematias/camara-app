import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../Screens';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import NiceListScreen from '../../components/screens/NiceListScreen/NiceListScreen.component';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessyListScreen from '../../components/screens/MessyListScreen/MessyListScreen.component';

const Tab = createBottomTabNavigator();

const PhotoListStack = () => {
  return (
    <Tab.Navigator initialRouteName={Screens.PHOTO_LIST} screenOptions={({navigation}) => ({
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      tabBarActiveBackgroundColor:'lightgray',
      headerLeft:()=><TouchableOpacity style={{marginHorizontal:14}}
        onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
    })}>
        <Tab.Screen name={Screens.NICE_PHOTOS} component={NiceListScreen} options={{tabBarIcon:({color})=><Feather name="thumbs-up" size={24} color={color} />}} />
        <Tab.Screen name={Screens.MESSY_PHOTOS} component={MessyListScreen} options={{tabBarIcon:({color})=><Feather name="thumbs-down" size={24} color={color} />}} />
    </Tab.Navigator>
  );
}

export default PhotoListStack