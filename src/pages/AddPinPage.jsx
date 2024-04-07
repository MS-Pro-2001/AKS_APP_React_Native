import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useRef, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
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

const AddPinPage = ({ navigation }) => {
  const MPinRef = useRef(null);
  const [mPin, setMPin] = useState("");
  const [isMPinValid, setIsMPinValid] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsMPinValid(false);
      setMPin("");
      return () => {
        // Cleanup if necessary
      };
    }, [])
  );

  const validateMPin = async () => {
    console.log(mPin);
    Alert.alert("Message", "Are you sure?", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            await AsyncStorage.setItem("mpin", mPin);
            navigation.push("HomePage");
          } catch (error) {
            console.warn("Error setting MPIN");
          }
        },
      },
      {
        text: "Cancel",
        onPress: () => {
          setIsMPinValid(false);
          setMPin("");
          // MPinRef.current.value = null;
        },
        style: "cancel",
      },
    ]);
  };
  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
        <Image style={styles.logo} source={require("../images/aksLogo.png")} />

        <Text style={styles.heading}>Enter Your Pin</Text>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <SmoothPinCodeInput
          cellSpacing={15}
          cellSize={50}
          // codeLength={8}
          ref={MPinRef}
          value={mPin}
          onTextChange={(code) => {
            setMPin(code);
            if (code?.length !== 4) {
              setIsMPinValid(false);
            }
          }}
          onFulfill={() => setIsMPinValid(true)}
          onBackspace={() => MPinRef.current.shake()}
        />
        <Button
          disabled={!isMPinValid}
          style={{ marginTop: 25, padding: 2, width: 300 }}
          mode="contained"
          color="#213190"
          onPress={validateMPin}
        >
          Set MPIN
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddPinPage;
