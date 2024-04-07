import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { UserContext } from "../ContextApi/ContextApi";
import { useFocusEffect } from "@react-navigation/native";
const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
  },
  headingContainer: {
    // marginTop: -100,
    alignItems: "center",
  },
  heading: {
    marginTop: 5,
    marginBottom: 5,
    color: "#213190",
    fontSize: 25,
  },
  container: {
    margin: 10,
    padding: 5,
  },
  subHeading: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  createAccount: {
    color: "#213190",
  },
  logo: {
    width: 100,
    borderRadius: 50,
    height: 100,
    marginTop: 50,
    objectFit: "cover",
  },
});

const LoginUsingMPin = ({ navigation }) => {
  const MPinRef = useRef(null);
  const [checkMPin, setCheckMPin] = useState();

  const { setIsUserLoggedIn } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      MPinRef.current.focus();
    }, [])
  );

  const validateUser = async (code) => {
    try {
      const pin = await AsyncStorage.getItem("mpin");
      if (code === pin) {
        setIsUserLoggedIn(true);
        navigation.push("HomePage");
      } else {
        MPinRef.current.shake();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
        <Image style={styles.logo} source={require("../images/aksLogo.png")} />

        <Text style={styles.heading}>Enter Your Pin</Text>
        <Text style={styles.subHeading}>
          Access your account with your 4-digit Pin
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 150,
        }}
      >
        <SmoothPinCodeInput
          placeholder={
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 25,
                opacity: 0.3,
                backgroundColor: "blue",
              }}
            ></View>
          }
          mask={
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 25,
                backgroundColor: "blue",
              }}
            ></View>
          }
          maskDelay={1000}
          password={true}
          // cellStyle={null}
          cellStyleFocused={null}
          cellSpacing={15}
          cellSize={50}
          // codeLength={8}
          ref={MPinRef}
          value={checkMPin}
          onTextChange={(code) => setCheckMPin(code)}
          onFulfill={validateUser}
          onBackspace={() => MPinRef.current.shake()}
        />
        {/* <Button
      loading={false}
      style={{ marginTop: 15, padding: 2 }}
      mode="contained"
      color="#213190"
      onPress={validateMPin}
    >
      
    </Button> */}
      </View>
    </SafeAreaView>
  );
};

export default LoginUsingMPin;
