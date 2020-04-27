import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const TrackListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>TrackListScreen</Text>
      <Button
        title="Go to Track Detail "
        onPress={() => navigation.navigate("TrackDetail")}
      ></Button>
    </View>
  );
};

export default TrackListScreen;

const styles = StyleSheet.create({});
