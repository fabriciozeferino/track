import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import constants from '../config/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const SigninScreen = () => {
  const { register, setValue, handleSubmit, errors } = useForm();

  const {
    state: { errorMessage },
    signin,
    clearErrorMessage,
  } = useContext(AuthContext);

  const onSubmit = ({ email, password }) => {
    clearErrorMessage();
    signin({ email, password });
  };

  // Register validation
  useEffect(() => {
    register({ name: 'email' }, { required: true });
    register({ name: 'password' }, { required: true });
  }, [register]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    errors.email ? emailRef.current.focus() : errors.password ? passwordRef.current.focus() : null;
  }, [errors]);

  return (
    <KeyboardAvoidingView behavior={constants.IS_IOS ? 'padding' : undefined} style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      {/* <SafeAreaView /> */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/fw-logo.png')} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <Text h3>Sign in</Text>

        <View style={styles.inputContainer}>
          <Input
            name="email"
            onChangeText={(text) => {
              clearErrorMessage();
              setValue('email', text, true);
            }}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoFocus
            autoCorrect={false}
            errorMessage={errors.email && 'Email is required'}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={emailRef}
            placeholder="Email"
            containerStyle={{ height: 60 }}
            leftIconContainerStyle={{ marginLeft: 0, marginRight: 5 }}
            leftIcon={<Icon name="user" size={24} g />}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            name="password"
            onChangeText={(text) => {
              clearErrorMessage();
              setValue('password', text, true);
            }}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="none"
            errorMessage={errors.password && 'Password is required'}
            onSubmitEditing={handleSubmit(onSubmit)}
            ref={passwordRef}
            placeholder="Password"
            containerStyle={{ height: 60 }}
            leftIconContainerStyle={{ marginLeft: 0, marginRight: 5 }}
            leftIcon={<Icon name="lock" size={24} g />}
          />
        </View>
        {errorMessage ? (
          <>
            <View style={styles.alert}>
              <MaterialIcons name="error-outline" size={24} color="#FF453A" />
              <Text style={{ color: '#FF453A' }}>{errorMessage}</Text>
            </View>
          </>
        ) : (
          <View style={styles.alert}></View>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
        </View>
        <Spacer>
          <Text style={{ color: 'grey', alignSelf: 'flex-end' }}>Copyright - 2020</Text>
        </Spacer>
      </View>
    </KeyboardAvoidingView>
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
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '98%',
  },
  form: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '98%',
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  h3: {
    fontSize: 25,
    marginBottom: 25,
    fontWeight: '700',
  },
});
