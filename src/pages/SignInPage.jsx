import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper';


const styles = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center',

    },
    headingContainer: {
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
        width: 80,
        borderRadius: 100,
        height: 80,
        marginBottom: 30


    },

})

const SignInPage = ({ navigation }) => {



    return (
        <View style={styles.box} >
            <View style={styles.headingContainer}>
                {/* <View style={styles.logo} > */}
                <Image style={styles.logo} source={require('../images/aksLogo.png')} />

                {/* </View> */}

                <Text style={styles.heading} >SignIn</Text>
            </View>
            <View style={styles.container} >
                <TextInput
                    mode="outlined"
                    label="username"
                />
                <TextInput
                    style={{ marginTop: 10 }}
                    mode="outlined"
                    label="password"
                    secureTextEntry
                />
                <Button loading={false} style={{ marginTop: 25, padding: 2 }} mode='contained' color='#213190' onPress={() => navigation.navigate("HomePage")}  >Submit</Button>
            </View>
            <View style={styles.subHeading}>

                <Text style={{ color: 'black' }}>
                    Doesn't have account?
                    <Text onPress={() => navigation.navigate("SignUpPage")} style={styles.createAccount} >
                        {" "}SignUp
                    </Text> </Text>
            </View>
        </View>
    )
}

export default SignInPage