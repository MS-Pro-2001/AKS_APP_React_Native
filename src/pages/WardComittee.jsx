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





const WardComittee = (props) => {

    const ward_name = props.route.params?.userWard

    const [searchedQuery, setSearchedQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])


    useEffect(() => {

        (async () => {
            setLoading(true)
            await fetch("https://sheetdb.io/api/v1/00wp3n251uvk6", { method: 'GET' })
                .then(async (res) => {
                    const data = await res.json();

                    setUserData(data)
                    setLoading(false)
                })

        })()

    }, [])

    const wardComitteeFilteredData = userData.filter((item) => {
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
                    Total entries: {wardComitteeFilteredData?.filter((item) => (item.firstName.toLowerCase().includes(searchedQuery.toLowerCase()))).length}
                </Text>
                <Text style={styles.border}></Text>

            </View>


            <View style={{ marginBottom: 250 }}>
                <ActivityIndicator size={'large'} style={{ display: `${loading ? '' : 'none'}` }} />
                <SafeAreaView style={styles.container} >
                    <FlatList
                        data={wardComitteeFilteredData?.filter((item) => (item.firstName.toLowerCase().includes(searchedQuery.toLowerCase())))}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableRipple
                                    onPress={() => console.log('pressed')}
                                    rippleColor="rgba(0, 0, 0, .32)"
                                    key={index}
                                >
                                    <View  >
                                        <View style={styles.listItem} >
                                            {/* <Text style={styles.photo} ></Text> */}
                                            <View >
                                                <Text style={styles.name} >{item?.firstName}</Text>
                                                <Text style={{ color: 'black' }} >{item?.designation}</Text>

                                            </View>
                                        </View>
                                        <Text style={styles.border} ></Text>

                                    </View>
                                </TouchableRipple>

                            )
                        }}



                        keyExtractor={(item, index) => {
                            return index;
                        }}
                    />

                </SafeAreaView>
            </View>





        </View>
    )
}

export default WardComittee