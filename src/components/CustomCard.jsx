import * as React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Card, Text, Divider } from "react-native-paper";

const CustomCard = ({ title, details, userFamilyDetails }) => {
  const familyDetails = [
    {
      key: "name_of_member",
      label: "Name",
      value: "hello",
    },
    {
      key: "relationship_with_user",
      label: "Relationship ",
      value: "hello",
    },
    {
      key: "dob",
      label: "Date Of Birth",
      value: "ehllo",
    },
  ];
  return (
    <>
      <Card style={styles.card}>
        <Card.Title title={title || "Details"} titleStyle={styles.title} />
        <Card.Cover
          source={{ uri: "https://via.placeholder.com/150x150" }}
          style={styles.image}
        />
        <Divider style={styles.divider} />
        <Card.Content>
          {details.map((val) => (
            <View key={val.key} style={styles.detailContainer}>
              <Text style={styles.label}>{val.label}</Text>
              <Text style={styles.value}>{val.value}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {userFamilyDetails.length !== 0 ? (
        <Card style={styles.card}>
          <Card.Title title={"Family Details"} titleStyle={styles.title} />
          <Card.Cover
            source={{ uri: "https://via.placeholder.com/150x150" }}
            style={styles.image}
          />
          <ScrollView>
            <SafeAreaView>
              {userFamilyDetails?.map((member) => (
                <Card.Content key={member?._id}>
                  <Text style={styles.label}>Member 1</Text>
                  <Divider style={styles.divider} />
                  {familyDetails.map((val) => (
                    <View key={val.key} style={styles.detailContainer}>
                      <Text style={styles.label}>{val.label}</Text>
                      <Text style={styles.value}>{member[val.key]}</Text>
                    </View>
                  ))}
                  <Divider style={styles.divider} />
                </Card.Content>
              ))}
            </SafeAreaView>
          </ScrollView>
        </Card>
      ) : (
        <Text>Family Details are not availaible</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150, // Adjusted height
    resizeMode: "cover", // Preserve aspect ratio
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 5,
    backgroundColor: "#000",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
});

export default CustomCard;
