import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
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

const wards = [
  "Bopal",
  "Bapunagar",
  "Ghatlodiya",
  "Krishnanagar",
  "Maninagar",
  "Naroda",
  "Nirnaynagar",
  "Noblenagar",
  "Odhav",
  "Sabarmati",
  "Thaltej",
  "Vastrapur",
  "Vejalpur",
];

const Wards = ({ navigation }) => {
  // console.log(navigation);

  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {}, []);

  return (
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
            wards?.filter((item) =>
              item.toLowerCase().includes(searchedQuery.toLowerCase())
            ).length
          }
        </Text>
        <View style={{ alignItems: "center", marginBottom: -10 }}>
          <Text style={{ color: "black", fontSize: 22 }}>Wards</Text>
        </View>
        <Text style={styles.border}></Text>
      </View>

      <View style={{ marginBottom: 270 }}>
        <ActivityIndicator
          size={"large"}
          style={{ display: `${loading ? "" : "none"}` }}
        />
        <SafeAreaView>
          <FlatList
            data={wards?.filter((item) =>
              item.toLowerCase().includes(searchedQuery.toLowerCase())
            )}
            renderItem={({ item }) => {
              return (
                <TouchableRipple
                  onPress={() =>
                    navigation.push("WardTabsNavigator", { userWard: item })
                  }
                  rippleColor="rgba(0, 0, 0, .32)"
                  key={item}
                >
                  <>
                    <View style={{ margin: 5 }}>
                      <View style={styles.listItem}>
                        {/* <Text style={styles.photo} ></Text> */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.name}>{item}</Text>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            size={30}
                            style={{ marginRight: 15, marginTop: 5 }}
                          />
                          {/* <Text style={{ color: 'black' }} >{item?.designation}</Text> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.border}></Text>
                  </>
                </TouchableRipple>
              );
            }}
            keyExtractor={(item) => item}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Wards;
