import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { Avatar, Button, Card } from "react-native-paper";
import CustomCard from "../components/CustomCard";

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
  },
  headingContainer: {
    // marginTop: -100,
    alignItems: "center",
  },
  heading: {
    marginTop: 5,
    marginBottom: 5,
    color: "#213190",
    fontSize: 25,
  },
  container: {
    margin: 10,
    padding: 5,
  },
  subHeading: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  createAccount: {
    color: "#213190",
  },
  logo: {
    width: 60,
    borderRadius: 50,
    height: 60,
    marginTop: 20,
    objectFit: "cover",
  },
});

const MembersDetailPage = (props) => {
  const user_id = props?.route?.params?.user_id;
  console.log(user_id);

  const [userData, setUserData] = useState();
  const [userFamilyDetails, setUserFamilyDetails] = useState([]);

  const [loadingUserData, setLoadingUserData] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingUserData(true);
      await fetch("https://aks-backend.onrender.com/api/user/fetchSingelUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
        }),
      })
        .then(async (res) => {
          const data = await res.json();

          setUserData(data);
          setLoadingUserData(false);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // setLoadingUserData(true);
      await fetch(
        "https://aks-backend.onrender.com/api/user/fetchFamilyDetails",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
          }),
        }
      )
        .then(async (res) => {
          const data = await res.json();
          setUserFamilyDetails(data);
          // setLoadingUserData(false);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const usersPersonalDetails = [
    {
      key: "fullName",
      label: "Full Name",
      value: userData?.firstName + " " + userData?.lastName,
    },
    {
      key: "address",
      label: "Address",
      value: userData?.address,
    },
    {
      key: "dob",
      label: "Date Of Birth",
      value: userData?.dob,
    },
    {
      key: "phoneNumber",
      label: "Phone Number",
      value: userData?.phone_no,
    },
    {
      key: "ward",
      label: "Ward",
      value: userData?.ward.toUpperCase(),
    },
  ];

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          {!loadingUserData && (
            <CustomCard
              title="Personal Details"
              details={usersPersonalDetails}
              userFamilyDetails={userFamilyDetails}
            />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MembersDetailPage;
