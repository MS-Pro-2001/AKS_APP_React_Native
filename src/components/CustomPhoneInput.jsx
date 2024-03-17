import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";


const styles = StyleSheet.create({})

const CustomPhoneInput = () => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={{ borderWidth: 1 }} >
                <SafeAreaView >
                    {showMessage && (
                        <View >
                            <Text>Value : {value}</Text>
                            <Text>Formatted Value : {formattedValue}</Text>
                            <Text>Valid : {valid ? "true" : "false"}</Text>
                        </View>
                    )}
                    <View style={{ borderWidth: 2 }} >

                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="IN"
                            layout="first"
                            onChangeText={(text) => {
                                setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            withDarkTheme
                            withShadow
                            autoFocus
                        />
                    </View>
                    <TouchableOpacity

                        onPress={() => {
                            const checkValid = phoneInput.current?.isValidNumber(value);
                            setShowMessage(true);
                            setValid(checkValid ? checkValid : false);
                        }}
                    >
                        <Text>Check</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </>
    );
};

export default CustomPhoneInput;