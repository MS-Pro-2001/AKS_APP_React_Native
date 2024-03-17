/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, HelperText, TextInput, TextInputMask} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import PhoneInput from 'react-native-phone-number-input';
import CustomPhoneInput from '../components/CustomPhoneInput';
import {Controller, useForm} from 'react-hook-form';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  headingContainer: {
    alignItems: 'center',
  },
  heading: {
    color: '#213190',
    fontSize: 30,
  },
  container: {
    margin: 10,
    padding: 5,
  },
  subHeading: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  createAccount: {
    color: '#213190',
  },
  logo: {
    width: 80,
    borderRadius: 100,
    height: 80,
    marginBottom: 30,
  },
});


export const CustomInput = ({control,name,validationRules,placeholder,label, errors})=>{

    return (
        <>
        

        <Controller
      control={control}
      rules={validationRules}
      render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          mode='outlined'
          placeholder="First name"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          label={label}
          error={Object.keys(errors).length !==0}
        />
      )}
      name="firstName"
      />
     <HelperText type="error" visible={Object.keys(errors).length !==0}>
        {errors?.firstName?.message}
      </HelperText>
      </>
           
    )
} 
  





const SignUpPage = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          firstName: "",
          lastName: "",
        },
      })
      const onSubmit = (data) => console.log(data)

return (
    <View style={styles.box}>

        <CustomInput
        control={control}
        name={"firstName"}
        validationRules={{required:{value:true,message:"First name is required"},minLength:{value:3,message:"Minimum of 3 characters required"}}}
        placeholder={"First Name"}
        label={"First Name"}
        errors={errors}
        />

        <CustomInput
        control={control}
        name={"firstName"}
        validationRules={{required:{value:true,message:"First name is required"},minLength:{value:3,message:"Minimum of 3 characters required"}}}
        placeholder={"First Name"}
        label={"First Name"}
        errors={errors}
        />
   

   

    <Button  onPress={handleSubmit(onSubmit)} >Submit</Button>
  </View>
)



}

    
    
export default SignUpPage;
