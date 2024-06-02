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
import { ActivityIndicator } from "react-native-paper";
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
  updateProfileStatus,
}) => {
  return (
    <>
      <Controller
        control={control}
        rules={validationRules}
        render={({ field: { onChange, onBlur, value } }) => {
          console.log({ value });
          return (
            <TextInput
              disabled={!updateProfileStatus}
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
          );
        }}
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

const UserDetailPage = ({ navigation }) => {
  const [date, setDate] = useState(new Date());

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  const [updateProfileStatus, setUpdateProfileStatus] = useState(false);

  // Inside your UserDetailPage component
  useFocusEffect(
    React.useCallback(() => {
      setUpdateProfileStatus(false);
      return () => {
        // Cleanup if necessary
      };
    }, [])
  );
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
      dob: "",
    },
  });
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch("https://aks-backend.onrender.com/api/user/fetchSingelUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user_id: "6601399e70fe730ad7c73a9f",
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          setUserData(data);
          console.log({ data });
          if (data) {
            setValue("firstName", data.firstName || ""); // Set firstName default value
            setValue("lastName", data.lastName || ""); // Set lastName default value
            setValue("address", data.address || ""); // Set address default value
            setValue("phone_no", data.phone_no || ""); // Set phoneNumber default value
            setValue("ward", data.ward || ""); // Set ward default value
            setValue("dob", data.dob || ""); // Set dob default value
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const onSubmit = async (data) => {
    await fetch("https://aks-backend.onrender.com/api/user/UpdateUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: "6601399e70fe730ad7c73a9f",
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log({ data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView>
          {loading && (
            <ActivityIndicator
              animating={loading}
              size={"large"}
              style={{ marginTop: 300 }}
            />
          )}
          {!loading && (
            <View style={styles.container}>
              <CustomInput
                updateProfileStatus={updateProfileStatus}
                dValue={"hello"}
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
                updateProfileStatus={updateProfileStatus}
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
                updateProfileStatus={updateProfileStatus}
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
                updateProfileStatus={updateProfileStatus}
                control={control}
                name="phone_no"
                validationRules={{
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
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
                updateProfileStatus={updateProfileStatus}
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
                updateProfileStatus={updateProfileStatus}
                control={control}
                name="dob"
                validationRules={{
                  required: {
                    value: true,
                    message: "Date of birth is required",
                  },
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "Date of birth should of format YYY-MM-DD",
                  },
                }}
                placeholder={"Date of birth"}
                // label={"Date of birth"}
                errors={errors}
                setOpenDatePicker={setOpenDatePicker}
                readonly={true}
              />

              {updateProfileStatus ? (
                <Button
                  loading={false}
                  style={{ marginTop: 5, padding: 2 }}
                  mode="contained"
                  color="#213190"
                  onPress={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  loading={false}
                  style={{ marginTop: 5, padding: 2 }}
                  mode="contained"
                  color="#213190"
                  onPress={() => setUpdateProfileStatus(true)}
                >
                  Update details
                </Button>
              )}
            </View>
          )}

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

export default UserDetailPage;
