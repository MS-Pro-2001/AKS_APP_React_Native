import { View, Text, StyleSheet, Alert, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth";
// import CustomDialog from '../components/CustomSnackBar'

import { UserContext } from "../ContextApi/ContextApi";

import { Controller, useForm } from "react-hook-form";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  box: {
    margin: 10,
  },
  logo: {
    width: 80,
    borderRadius: 100,
    height: 80,
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
});

const CustomInput = ({
  control = {},
  name = "",
  validationRules = {},
  placeholder = "",
  label = "",
  errors = "",
  multiline = false,
  keyboardType,
  setOpenDatePicker,
  readonly = "false",
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={validationRules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            readonly={readonly}
            mode="outlined"
            multiline={multiline}
            keyboardType={keyboardType}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            theme={{ colors: { primary: "#213190" } }}
            //   label={label}
            error={!!errors[name] && Object.keys(errors[name])?.length !== 0}
            right={
              name === "dob" && (
                <TextInput.Icon
                  name="calendar-range"
                  onPress={() => setOpenDatePicker(true)}
                />
              )
            }
          />
        )}
        name={name}
      />
      <HelperText
        type="error"
        visible={!!errors[name] && Object.keys(errors[name])?.length !== 0}
      >
        {errors[name]?.message}
      </HelperText>
    </>
  );
};

const OtpLoginPage = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      phoneNumber: "",
    },
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibile, setIsVisibile] = useState(false);
  const [userDataFromFireBase, setUserDataFromFireBase] = useState("");

  const { setIsUserLoggedIn } = useContext(UserContext);

  const sendOtp = async () => {
    console.log("hello");
    // if (phoneNumber === "" || phoneNumber.length !== 10) {
    //   // navigation.navigate("HomePage")
    //   Alert.alert("Warning", "Please enter a Valid Phone Number", [
    //     { text: "OK", onPress: () => setPhoneNumber("") },
    //   ]);
    // } else {
    //   try {
    //     setIsLoading(true);
    //     const mobileNumber = "+91" + phoneNumber;
    //     console.log("sending otp....");
    //     const response = await auth().signInWithPhoneNumber(mobileNumber);
    //     setUserDataFromFireBase(response);
    //     setIsLoading(false);
    //     Alert.alert("Message", `otp is successfully sent to ${phoneNumber} `, [
    //       { text: "OK", onPress: () => setIsVisibile(true) },
    //     ]);
    //   } catch (error) {
    //     console.log(error);
    //     setIsLoading(false);

    //     Alert.alert("Alert", `${error}`, [
    //       { text: "OK", onPress: () => setPhoneNumber("") },
    //     ]);
    //   }
    // }
  };

  const onSubmit = async (submittedData) => {
    try {
      setIsLoading(true);
      const mobileNumber = "+91" + submittedData.phoneNumber;
      console.log("sending otp....");
      const response = await auth().signInWithPhoneNumber(mobileNumber);
      setUserDataFromFireBase(response);
      setIsLoading(false);
      Alert.alert(
        "Message",
        `Otp successfully sent to ${submittedData.phoneNumber} `,
        [{ text: "OK", onPress: () => setIsVisibile(true) }]
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      Alert.alert("Alert", `${error}`, [
        { text: "OK", onPress: () => setPhoneNumber("") },
      ]);
    }
  };

  const confirmOtp = async () => {
    setIsLoading(true);

    try {
      const response = await userDataFromFireBase.confirm(otp);
      console.log(response);

      if (response) {
        Alert.alert("Message", "Otp successfully verified", [
          {
            text: "OK",
            onPress: () => {
              setIsUserLoggedIn(true);
              setPhoneNumber("");
              setOtp("");
              setIsLoading(false);
              navigation.push("HomePage");
              setIsVisibile(false);
            },
          },
        ]);
      } else {
        Alert.alert("Warning", "Invalid Otp", [
          {
            text: "OK",
            onPress: () => {
              setIsLoading(false);
            },
          },
        ]);
        setOtp("");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Alert", "Invalid Otp", [
        {
          text: "OK",
          onPress: () => {
            setIsLoading(false);
            setOtp("");
          },
        },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../images/aksLogo.png")} />
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#213190", fontSize: 20 }}>
          Enter Phone Number to Login
        </Text>
      </View>
      {!isVisibile && (
        <View style={styles.box}>
          <CustomInput
            control={control}
            name="phoneNumber"
            validationRules={{
              required: { value: true, message: "Phone number is required" },
              maxLength: {
                value: 10,
                message: "Please enter a valid 10 digit phone number",
              },
              minLength: {
                value: 10,
                message: "Please enter a valid 10 digit phone number",
              },
              pattern: {
                value: /^(?:\+?91|0)?[789]\d{9}$/,
                message: "Invalid phone number",
              },
            }}
            placeholder={"Phone Number"}
            // label={"Phone Number"}
            errors={errors}
            keyboardType="numeric"
          />
          <Button
            style={{ marginTop: 10 }}
            // disabled={phoneNumber.length !== 10 ? true : false}
            mode="contained"
            loading={isLoading}
            color="#213190"
            // onPress={() => sendOtp()}
            onPress={handleSubmit(onSubmit)}
          >
            Send Otp
          </Button>

          <View style={{ alignItems: "flex-end", margin: 10 }}>
            <Text
              style={{ fontSize: 15 }}
              onPress={() => navigation.push("SignUpPage")}
            >
              <Text style={{ color: "black" }}> New User? </Text> Register{" "}
            </Text>
          </View>
        </View>
      )}

      {isVisibile && (
        <View style={styles.box}>
          <TextInput
            maxLength={6}
            value={otp}
            keyboardType="numeric"
            style={{ marginBottom: 10 }}
            mode="outlined"
            label="Enter Otp"
            onChangeText={(value) => setOtp(value)}
          />
          <Button
            loading={isLoading}
            disabled={otp.length !== 6 ? true : ""}
            mode="contained"
            color="#213190"
            onPress={() => confirmOtp()}
          >
            Submit
          </Button>
          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={{ margin: 10 }}
              onPress={() => navigation.push("Login")}
            >
              Change Number?
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default OtpLoginPage;
