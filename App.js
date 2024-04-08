import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import App from './screens/App';
import EditMedecinScreen from './screens/EditMedecinScreen';
import Login from './screens/Login';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Accueil" component={App} />
        <Stack.Screen name="EditMedecin" component={EditMedecinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
