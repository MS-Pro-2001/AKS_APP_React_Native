import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import {
  Button,
  HelperText,
  TextInput,
  TextInputMask,
} from "react-native-paper";
import DatePicker from "react-native-date-picker";
import PhoneInput from "react-native-phone-number-input";
import CustomPhoneInput from "../components/CustomPhoneInput";
import { Controller, useForm } from "react-hook-form";

import { SelectList } from "react-native-dropdown-select-list";

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
    width: 60,
    borderRadius: 50,
    height: 60,
    marginTop: 20,
    objectFit: "cover",
  },
});

export const CustomInput = ({
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

const SignUpPage = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selected, setSelected] = React.useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone_no: "",
      ward: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = { ...data, ward: selected };
    console.log("asaaaa", payload);

    // setLoadingUserData(true);

    await fetch("https://aks-backend.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        console.log("res", res);
        const data = await res.json();
        console.log("message:", data?.msg, "success:", data?.success);
        setIsLoading(false);
        // Reset the form fields
        reset();

        Alert.alert(
          "Message",
          data?.success ? data?.msg + ".Please Login" : data?.msg,
          [
            {
              text: "Ok",
              // onPress: () => setPhoneNumber("")
            },
          ]
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // reset();
  };

  const data = [
    { key: "1", value: "Bopal" },
    { key: "2", value: "Bapunagar" },
    { key: "3", value: "Ghatlodiya" },
    { key: "4", value: "Krishnanagar" },
    { key: "5", value: "Maninagar" },
    { key: "6", value: "Naroda" },
    { key: "7", value: "Nirnaynagar" },
    { key: "8", value: "Nirnaynagar" },
    { key: "9", value: "Noblenagar" },
    { key: "10", value: "Odhav" },
    { key: "11", value: "Sabarmati" },
    { key: "12", value: "Sabarmati" },
    { key: "13", value: "Thaltej" },
    { key: "14", value: "Vastrapur" },
    { key: "15", value: "Vejalpur" },
  ];

  return (
    <>
      <View style={styles.headingContainer}>
        <Image style={styles.logo} source={require("../images/aksLogo.png")} />

        <Text style={styles.heading}>Register</Text>
      </View>

      <ScrollView>
        <SafeAreaView>
          <View style={styles.container}>
            <CustomInput
              control={control}
              name="firstName"
              validationRules={{
                required: { value: true, message: "First name is required" },
              }}
              placeholder={"First Name"}
              // label={"First Name"}
              errors={errors}
            />

            <CustomInput
              control={control}
              name="lastName"
              validationRules={{
                required: { value: true, message: "Last name is required" },
              }}
              placeholder={"Last Name"}
              // label={"Last Name"}
              errors={errors}
            />

            <CustomInput
              control={control}
              name="address"
              validationRules={{
                required: { value: true, message: "Address is required" },
              }}
              placeholder={"Address"}
              // label={"Address"}
              errors={errors}
              multiline={true}
            />

            <CustomInput
              control={control}
              name="phone_no"
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
            <SelectList
              setSelected={(val) => {
                setSelected(val);
              }}
              data={data}
              save="value"
              placeholder="Please select a Ward"
              search={false}
              boxStyles={{ marginBottom: 20, height: 50 }}
            />

            {/* <CustomInput
              control={control}
              name="ward"
              validationRules={{
                required: { value: true, message: "Ward name is required" },
              }}
              placeholder={"Ward"}
              // label={"Ward"}
              errors={errors}
            /> */}

            <CustomInput
              control={control}
              name="dob"
              validationRules={{
                required: { value: true, message: "Date of birth is required" },
                pattern: {
                  value: /^\d{2}-\d{2}-\d{4}$/,
                  message: "Date of birth should of format DD-MM-YYYY",
                },
              }}
              placeholder={"Date of birth"}
              // label={"Date of birth"}
              errors={errors}
              setOpenDatePicker={setOpenDatePicker}
              readonly={true}
            />

            <Button
              loading={isLoading}
              style={{ marginTop: 5, padding: 2 }}
              mode="contained"
              color="#213190"
              onPress={handleSubmit(onSubmit)}
            >
              Submit{" "}
            </Button>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{ margin: 10 }}
                onPress={() => navigation.push("Login")}
              >
                Already a user? Login
              </Text>
            </View>
          </View>

          <DatePicker
            theme="light"
            mode="date"
            modal
            open={openDatePicker}
            date={date}
            onConfirm={(date) => {
              setOpenDatePicker(false);
              setDate(date);
              // const formattedDate = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
              const extractedDate = date.toISOString().split("T")[0].split("-");
              const customDate =
                extractedDate[2] +
                "-" +
                extractedDate[1] +
                "-" +
                extractedDate[0];

              setValue("dob", customDate);
              clearErrors("dob");
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SignUpPage;
