import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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
    } catch (error) {
      setError(error);
    }
  };

  return [imagePickerCall, error];
};
