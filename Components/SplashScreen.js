import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = ({navigation}) => {
  //const { navigate } = useNavigation();
  setTimeout(() => {
    navigation.replace("Tabs");
  }, 4000);
  return (
    <View style={styles.container}>
      <LottieView
        style={{
          width: 250,
          height: 300,
        }}
        source={require("../Assets2/Animations/carAnimation.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#c7f9cc",
  },
});