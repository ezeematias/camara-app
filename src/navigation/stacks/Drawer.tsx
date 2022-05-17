import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Screens } from '../Screens';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../redux/authReducer';
import HomeStack from './HomeStack';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoListStack from './PhotoListStack';

const CustomDrawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        onPress={() => dispatch(handleLogout())}
      />
    </DrawerContentScrollView>
  );
}

const StackNavigator = () => {
  return(
    <Stack.Navigator initialRouteName={'APP'} >
        <Stack.Screen name={'APP'} component={Drawer} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

const Drawer = () => {
  return (
    <CustomDrawer.Navigator initialRouteName={Screens.HOME} drawerContent={props => <CustomDrawerContent {...props} />}>
      <CustomDrawer.Screen name={Screens.HOME} component={HomeStack} options={{headerShown:false}} />
      <CustomDrawer.Screen name={Screens.PHOTO_LIST} component={PhotoListStack}  options={{headerShown:false}} />
    </CustomDrawer.Navigator>
  );
}

export default StackNavigator