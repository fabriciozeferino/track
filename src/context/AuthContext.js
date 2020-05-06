import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      console.log({ ...state, errorMessage: action.payload });

      return { ...state, errorMessage: action.payload };
    case 'signin':
      console.log('signin');
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      console.log('clear_error_message');

      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('TrackList');
  } else {
    navigate('Signin');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signin', { email, password });

      await AsyncStorage.setItem('token', response.data.token);

      dispatch({ type: 'signin', payload: response.data.token });

      navigate('TrackList');
    } catch (error) {
      console.log('signinContext', error);

      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in',
      });
    }
  };
};

const signout = (dispatch) => {
  return async ({ email, password }) => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
