import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar, TouchableRipple } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  searchInputBox: {
    margin: 7,
  },

  InputBox: {
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 30,
    padding: 10,
    color: "#213190",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    height: 50,
    marginLeft: 20,
  },
  entriesCount: {
    margin: 5,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  name: {
    fontSize: 20,
    marginTop: 8,
  },
  photo: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 70,
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 8,
  },
});

const Directory = (props) => {
  const ward_name = props?.route?.params?.userWard;

  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("http://192.168.0.101:5000/api/user/fetchallusers", {
        method: "GET",
      })
        .then(async (res) => {
          const aksComitteeData = await res.json();
          setUserData(aksComitteeData);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const directoryFilteredData = userData?.filter((item) => {
    console.log(ward_name);
    return item?.ward.toLowerCase() === ward_name.toLowerCase();
  });

  return (
    <>
      <View>
        <View style={styles.searchInputBox}>
          <Searchbar
            style={{ borderRadius: 10 }}
            placeholder="Search"
            onChangeText={(value) => setSearchedQuery(value)}
            value={searchedQuery}
          />
          {/* <TextInput onChangeText={(value) => setSearchedQuery(value)} placeholderTextColor={"grey"} style={styles.InputBox} placeholder='search here...' /> */}
        </View>
        <View style={styles.entriesCount}>
          <Text>
            Total entries:{" "}
            {
              directoryFilteredData?.filter((item) =>
                item?.firstName
                  ?.toLowerCase()
                  .includes(searchedQuery.toLowerCase())
              ).length
            }
          </Text>
          <Text style={styles.border}></Text>
        </View>

        <View style={{ marginBottom: 250 }}>
          <ActivityIndicator
            size={"large"}
            style={{ display: `${loading ? "" : "none"}` }}
          />
          <SafeAreaView style={styles.container}>
            <FlatList
              data={directoryFilteredData?.filter((item) =>
                item?.firstName
                  ?.toLowerCase()
                  .includes(searchedQuery.toLowerCase())
              )}
              renderItem={({ item }) => {
                return (
                  <TouchableRipple
                    onPress={() =>
                      props.navigation.push("MembersDetailPage", {
                        user_id: item?._id,
                      })
                    }
                    rippleColor="rgba(0, 0, 0, .32)"
                    key={item?._id}
                  >
                    <View>
                      <View style={styles.listItem}>
                        {/* <Text style={styles.photo}>
                        <Image source={item.} />
                      </Text> */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.name}>
                            {item?.firstName} {item?.lastName}
                          </Text>
                          {/* <Text style={{ color: 'black' }} >{item?.designation}</Text> */}
                        </View>
                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={30}
                          style={{ marginRight: 15, marginTop: 5 }}
                        />
                      </View>
                      <Text style={styles.border}></Text>
                    </View>
                  </TouchableRipple>
                );
              }}
              keyExtractor={(item) => item?._id}
            />
          </SafeAreaView>
        </View>
      </View>
    </>
  );
};

export default Directory;
