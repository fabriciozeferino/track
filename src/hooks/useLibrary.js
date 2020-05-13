import { useState } from 'react';
import { Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default (callback) => {
  const [error, setError] = useState(null);

  const imagePickerCall = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted' || status === 'denied') {
        setError('no_permission');
      }

      if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
          //this.setState({ image: result.uri });
          callback(result);
        }
      }

      console.log('sttus', status);
      console.log('sttus', error);
    } catch (error) {
      console.log(error);

      setError(error);
    }
  };

  return [imagePickerCall, error];
};
