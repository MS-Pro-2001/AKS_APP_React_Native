import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { UserContext } from "../ContextApi/ContextApi";
const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    alignItems: "center",
  },
});

const LogOutPage = ({ navigation }) => {
  const { setIsUserLoggedIn } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={styles.box}>
      <Text style={{ margin: 20, fontSize: 25 }}>Are You Sure?</Text>
      <Button
        loading={isLoading}
        mode="contained"
        color="#213190"
        onPress={() => {
          setIsLoading(true);
          setIsUserLoggedIn(false);
          setIsLoading(false);
          Alert.alert("Message", "Logged Out Successfully!!", [
            {
              text: "OK",
              onPress: () => {
                navigation.push("MpinLogin");
              },
            },
          ]);
        }}
      >
        Logout
      </Button>
    </View>
  );
};

export default LogOutPage;
