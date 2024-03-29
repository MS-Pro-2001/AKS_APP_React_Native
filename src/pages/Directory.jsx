import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar, TouchableRipple } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const styles = StyleSheet.create({
    searchInputBox: {

        margin: 7,




    },

    InputBox: {
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 30,
        padding: 10,
        color: '#213190'




    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        height: 50,
        marginLeft: 20



    },
    entriesCount: {
        margin: 5,

    },
    border: {
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },
    name: {
        fontSize: 20,
        marginTop: 8
    },
    photo: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 70,
        width: 50,
        height: 50,
        marginRight: 10,
        marginTop: 8



    },


})





const Directory = (props) => {
    const ward_name = props?.route?.params?.userWard



    const [searchedQuery, setSearchedQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])


    useEffect(() => {
        (async () => {

            await fetch("http://192.168.0.103:5000/api/user/fetchallusers", {
                method: 'GET'
            }).then(async (res) => {
                const aksComitteeData = await res.json();
                setUserData(aksComitteeData)

            }).catch((error => {
                console.log(error)

            }))

        })()

    }, [])

    const directoryFilteredData = userData?.filter((item) => {
        return item?.ward.toLowerCase() === ward_name.toLowerCase()
    })




    return (
        <View>

            <View style={styles.searchInputBox} >
                <Searchbar
                    style={{ borderRadius: 10 }}
                    placeholder="Search"
                    onChangeText={(value) => setSearchedQuery(value)}
                    value={searchedQuery}
                />
                {/* <TextInput onChangeText={(value) => setSearchedQuery(value)} placeholderTextColor={"grey"} style={styles.InputBox} placeholder='search here...' /> */}
            </View>
            <View style={styles.entriesCount} >


                <Text>
                    Total entries: {directoryFilteredData?.filter((item) => (item?.fullName?.toLowerCase().includes(searchedQuery.toLowerCase()))).length}
                </Text>
                <Text style={styles.border}></Text>

            </View>


            <View style={{ marginBottom: 250 }}>
                <ActivityIndicator size={'large'} style={{ display: `${loading ? '' : 'none'}` }} />
                <SafeAreaView style={styles.container} >
                    <FlatList
                        data={directoryFilteredData?.filter((item) => (item?.fullName?.toLowerCase().includes(searchedQuery.toLowerCase())))}
                        renderItem={({ item }) => {
                            return (
                                <TouchableRipple
                                    onPress={() => props.navigation.push("UserDetailPage", { user_id: item?._id })}
                                    rippleColor="rgba(0, 0, 0, .32)"
                                    key={item?.id}
                                >
                                    <View  >
                                        <View style={styles.listItem} >
                                            {/* <Text style={styles.photo} ></Text> */}
                                            <View >
                                                <Text style={styles.name} >{item?.fullName}</Text>
                                                {/* <Text style={{ color: 'black' }} >{item?.designation}</Text> */}

                                            </View>
                                        </View>
                                        <Text style={styles.border} ></Text>

                                    </View>
                                </TouchableRipple>

                            )
                        }}



                        keyExtractor={item => item?._id}
                    />

                </SafeAreaView>
            </View>





        </View>
    )
}

export default Directory