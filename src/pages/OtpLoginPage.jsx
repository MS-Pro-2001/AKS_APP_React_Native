import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
// import CustomDialog from '../components/CustomSnackBar'

import { UserContext } from '../ContextApi/ContextApi'





const OtpLoginPage = ({ navigation }) => {

    // styling

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center'
        },

        box: {
            margin: 10
        },
        logo: {
            width: 80,
            borderRadius: 100,
            height: 80,
            marginBottom: 30


        },
        logoContainer: {
            alignItems: 'center'
        }

    })


    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isVisibile, setIsVisibile] = useState(false)
    const [userDataFromFireBase, setUserDataFromFireBase] = useState("")


    const { setIsUserLoggedIn } = useContext(UserContext)





    const sendOtp = async () => {
        if (phoneNumber === "" || phoneNumber.length !== 10) {
            // navigation.navigate("HomePage")
            Alert.alert(
                'Warning',
                'Please enter a Valid Phone Number',
                [

                    { text: 'OK', onPress: () => setPhoneNumber("") },
                ]
            );


        }
        else {

            try {
                setIsLoading(true)
                const mobileNumber = '+91' + phoneNumber
                console.log("sending otp....")
                const response = await auth().signInWithPhoneNumber(mobileNumber)
                setUserDataFromFireBase(response)
                setIsLoading(false)
                Alert.alert(
                    'Message',
                    `otp is successfully sent to ${phoneNumber} `,
                    [
                        { text: 'OK', onPress: () => setIsVisibile(true) }
                    ]
                )


            } catch (error) {
                console.log(error)
                setIsLoading(false)

                Alert.alert(
                    'Alert',
                    `${error}`,
                    [

                        { text: 'OK', onPress: () => setPhoneNumber("") },
                    ]
                );

            }
        }


    }

    const confirmOtp = async () => {
        setIsLoading(true)


        try {

            const response = await userDataFromFireBase.confirm(otp)
            console.log(response)

            if (response) {

                Alert.alert(
                    'Message',
                    'Otp is successfully verified',
                    [

                        {
                            text: 'OK', onPress: () => {
                                setIsUserLoggedIn(true)
                                setPhoneNumber("")
                                setOtp("")
                                setIsLoading(false)
                                navigation.push("HomePage")
                                setIsVisibile(false)


                            },
                        }

                    ]
                );

            }
            else {
                Alert.alert('Warning', 'Invalid Otp', [
                    { text: 'OK', onPress: () => { setIsLoading(false) } }
                ])
                setOtp("")
            }

        } catch (error) {
            console.log(error)
            Alert.alert(
                'Alert',
                'Invalid Otp',
                [

                    {
                        text: 'OK', onPress: () => {
                            setIsLoading(false)
                            setOtp("")
                        }
                    },
                ]
            );

        }

    }
    return (
        <View style={styles.container} >
            <View style={styles.logoContainer}>

                <Image style={styles.logo} source={require('../images/aksLogo.png')} />

            </View>

            <View style={{ alignItems: 'center' }}>

                <Text style={{ color: '#213190', fontSize: 20 }} >Enter Phone Number to Login</Text>
            </View>
            {!isVisibile && <View style={styles.box} >
                <TextInput value={phoneNumber} maxLength={10} keyboardType='numeric' style={{ marginBottom: 10 }} mode='outlined' label='Phone No.' onChangeText={(value) => setPhoneNumber(value)} />
                <Button disabled={phoneNumber.length !== 10 ? true : false} mode='contained' loading={isLoading} color='#213190' onPress={() => sendOtp()}  >Send Otp</Button>
                <View style={{ alignItems: 'flex-end', margin: 10 }}>

                    <Text style={{ fontSize: 15 }} onPress={() => navigation.push('SignUpPage')} ><Text style={{ color: 'black' }} > New User? </Text> Register </Text>
                </View>
            </View>
            }

            {
                isVisibile &&
                <View style={styles.box}>
                    <TextInput maxLength={6} value={otp} keyboardType='numeric' style={{ marginBottom: 10 }} mode='outlined' label='Enter Otp' onChangeText={(value) => setOtp(value)} />
                    <Button loading={isLoading} disabled={otp.length !== 6 ? true : ''} mode='contained' color='#213190' onPress={() => confirmOtp()}  >Submit</Button>
                    <View style={{ alignItems: 'flex-end' }} >

                        <Text style={{ margin: 10 }} onPress={() => navigation.push('Login')} >Change Number?</Text>
                    </View>
                </View>
            }

        </View >
    )
}

export default OtpLoginPage