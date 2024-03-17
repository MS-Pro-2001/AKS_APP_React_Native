import { View, Text, StyleSheet, Dimensions, Linking, Alert } from 'react-native'
import React, { useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location'
import { Button } from 'react-native-paper';


const styles = StyleSheet.create({
    map: {

        width: Dimensions.get("window").width * 0.95,
        height: Dimensions.get("window").height * 0.27,

    },
});
const UserLocationMap = () => {

    const [userLocation, setUserLocation] = useState({
        "latitude": "", "longitude": ""
    })




    const fetchMyLocation = () => {


        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log(location);
                setUserLocation({ latitude: location.latitude, longitude: location.longitude })

            })
            .catch(error => {
                const { code, message } = error;
                // console.warn(code, message);
                Alert.alert(
                    'Warning',
                    'unable to fetch location. Please grant permission',
                    [

                        {
                            text: 'OK'
                        }

                    ]
                );

            })

    }

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ width: 340, height: 200, borderRadius: 30, marginTop: 10, overflow: 'hidden' }} >


                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    provider={PROVIDER_GOOGLE}

                />
            </View>
            <Button mode='outlined' style={{ marginTop: 10 }} onPress={() => Linking.openURL(`geo:${userLocation.latitude},${userLocation.longitude}`)} >Get location</Button>
            <Button mode='outlined' style={{ marginTop: 10, display: `${userLocation.latitude === "" ? "" : 'none'}` }} onPress={() => fetchMyLocation()} >Get My location</Button>

        </View>
    )
}

export default UserLocationMap