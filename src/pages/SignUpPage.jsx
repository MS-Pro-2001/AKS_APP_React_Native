import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
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
      phoneNumber: "",
      ward: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const [date, setDate] = useState(new Date());

  const [openDatePicker, setOpenDatePicker] = useState(false);

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

            <CustomInput
              control={control}
              name="ward"
              validationRules={{
                required: { value: true, message: "Ward name is required" },
              }}
              placeholder={"Ward"}
              // label={"Ward"}
              errors={errors}
            />

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
              loading={false}
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
