import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationContext } from './src/context/LocationContext';
import { Provider as TrackContext } from './src/context/TrackContext';
import { FontAwesome } from '@expo/vector-icons';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import AvatarScreen from './src/screens/AvatarScreen';

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
});

trackListFlow.navigationOptions = {
  title: 'Tracks',
  tabBarIcon: ({ tintColor }) => <FontAwesome name="th-list" color={tintColor} size={24} />,
};

const accountFlow = createStackNavigator({
  Account: AccountScreen,
  Avatar: AvatarScreen,
});

accountFlow.navigationOptions = {
  title: 'Profile',
  tabBarIcon: ({ tintColor }) => <FontAwesome name="user" color={tintColor} size={24} />,
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,

  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),

  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreateScreen,
    accountFlow,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <ActionSheetProvider>
      <TrackContext>
        <LocationContext>
          <AuthProvider>
            <StatusBar barStyle="dark-content" />
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </AuthProvider>
        </LocationContext>
      </TrackContext>
    </ActionSheetProvider>
  );
};
