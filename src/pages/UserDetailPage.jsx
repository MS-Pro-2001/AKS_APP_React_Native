import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, HelperText, TextInput, TextInputMask } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import PhoneInput from 'react-native-phone-number-input';
import CustomPhoneInput from '../components/CustomPhoneInput';


const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center',


    },
    headingContainer: {
        marginTop: -100,
        alignItems: 'center'

    },
    heading: {
        color: '#213190',
        fontSize: 30,


    },
    container: {
        margin: 10,
        padding: 5
    },
    subHeading: {
        alignItems: 'flex-end',
        marginRight: 10

    },
    createAccount: {
        color: '#213190'

    },
    logo: {
        width: 300,
        borderRadius: 10,
        height: 150,
        marginBottom: 30,
        objectFit: 'cover'


    },

})

const UserDetailPage = (props, { navigation }) => {

    let user_id = props?.route?.params?.user_id

    if (user_id === undefined) {
        user_id = "6599a00eb261275757e9fbd4"
    }

    // console.log(user_id)



    const [showPassword, setShowPassword] = useState(false)
    const [date, setDate] = useState(new Date())
    const [updateDetailsDisabled, setUpdateDetailsDisabled] = useState(true)


    const [open, setOpen] = useState(false)
    const [userData, setUserData] = useState({
        fullName: "",
        address: "",
        phone_no: "",
        dateOfBirth: ""

    })


    useEffect(() => {
        (async () => {

            await fetch("http://192.168.0.103:5000/api/user/fetchSingelUser", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id
                })

            }).then(async (res) => {
                const aksComitteeData = await res.json();
                // setUserData({ userData.fullName: aksComitteeData?.fullName, userData.address: aksComitteeData?.address })
                setUserData({ ...userData, fullName: aksComitteeData.fullName, address: aksComitteeData.address, phone_no: aksComitteeData.phone_no, dateOfBirth: aksComitteeData.dob })
                // setUserData(aksComitteeData)

            }).catch((error => {
                console.log(error)

            }))

        })()

    }, [])

    console.log(userData)





    // console.log(userData);


    return (
        <View style={styles.box} >
            <View style={styles.headingContainer}>
                {/* <View style={styles.logo} > */}
                <Image style={styles.logo} source={require('../images/aksLogo.png')} />

                {/* </View> */}

                <Text style={styles.heading} >Details</Text>
            </View>
            <View style={styles.container} >
                <TextInput
                    mode="outlined"
                    label="Full Name"
                    error={false}
                    value={userData?.fullName}

                    onChangeText={(value) => setUserData({ ...userData, fullName: value })}
                    name="Name"
                    disabled={updateDetailsDisabled}
                />
                <TextInput
                    mode="outlined"
                    label="Address"
                    value={userData?.address}
                    error={false}
                    multiline={true}
                    onChangeText={(value) => setUserData({ ...userData, address: value })}
                    disabled={updateDetailsDisabled}




                />
                <TextInput
                    mode="outlined"
                    label="Phone Number"
                    keyboardType='numeric'
                    error={false}
                    maxLength={10}
                    value={userData?.phone_no}
                    disabled={updateDetailsDisabled}

                // onChangeText={(value) => setUserData({ ...userData, : value })}



                />
                <TextInput
                    mode="outlined"
                    label="Date of Birth"
                    error={false}
                    right={<TextInput.Icon name="calendar-range" disabled={updateDetailsDisabled} onPress={() => setOpen(true)} />}
                    value={userData?.dateOfBirth}
                    disabled={updateDetailsDisabled}

                // onChangeText={(value) => setDateOfBirth(value)}



                />
                <HelperText>
                    Format: YYYY-MM-DD
                </HelperText>


                {/* <CustomPhoneInput /> */}

                <DatePicker
                    theme='light'
                    mode='date'
                    modal
                    open={open}
                    date={date}

                    // disabled={updateDetailsDisabled}


                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setDateOfBirth({ ...userData, dateOfBirth: date.toISOString().split('T')[0] })


                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}

                />



                <Button loading={false} style={{ marginTop: 25, padding: 2, display: `${updateDetailsDisabled ? "" : "none"}` }} mode='contained' color='#213190' onPress={() => setUpdateDetailsDisabled(false)}  >Update Details</Button>
                <Button loading={false} style={{ marginTop: 25, padding: 2, display: `${!updateDetailsDisabled ? "" : "none"}` }} mode='contained' color='#213190' onPress={() => console.log("submit")}  >Submit </Button>
            </View>
            <View style={styles.subHeading}>


            </View>
        </View>
    )
}

export default UserDetailPage