import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Avatar, ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';
import { navigate } from '../navigationRef';

const AccountScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          showEditButton
          rounded
          size="large"
          onPress={() => navigate('Avatar')}
        />
        <Text h3 h3Style={{ fontWeight: '700' }}>
          Fabricio Zeferino
        </Text>
        <Text style={{ color: 'grey' }}>Developer</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text h4>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
        <Text>Holidays</Text>
      </View>

      <View style={styles.signoutContainer}>
        <Button title="Sign Out" onPress={signout} />
      </View>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'Profile',
  tabBarIcon: ({ tintColor }) => <FontAwesome name="gear" color={tintColor} size={25} />,
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  avatarContainer: {
    marginBottom: 30,
  },
  infoContainer: {
    flex: 1,

    marginBottom: 5,
  },
  signoutContainer: {},
});
