import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';

const SigninScreen = ({ errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />

      <Spacer>
        <Text h3>Sign in</Text>
      </Spacer>

      <Spacer />

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon={
          <FontAwesome
            name="user"
            size={24}
            color="grey"
            style={{ marginEnd: 5 }}
          />
        }
      />

      <Spacer />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        textContentType="none"
        leftIcon={
          <FontAwesome
            name="lock"
            size={24}
            color="grey"
            style={{ marginEnd: 5 }}
          />
        }
      />

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <Spacer>
        <Button title="Sign in" onPress={() => signin({ email, password })} />
      </Spacer>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});
