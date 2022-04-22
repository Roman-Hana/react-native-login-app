import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogOut, selectUserEmail } from "../redux/userSlice";
import { auth } from "../firebase";

function FeedsTab() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getImages = () => {
    axios
      .get(`https://picsum.photos/v2/list?page=${currentPage}&limit=10`)
      .then((res) => {
        setImages([...images, ...res.data]);
        // console.log(res.data);
      });
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const nextPageLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    }, 2000);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      axios.get(`https://picsum.photos/v2/list?page=1&limit=10`).then((res) => {
        setImages(res.data);
      });
      setIsRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    getImages();
  }, [currentPage]);

  const renderItems = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          style={styles.itemImageContainer}
          source={{ uri: item.download_url }}
        />
        <View>
          <Text style={styles.textStyle}>{`${item.author}`}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(images) => images.id.toString()}
        renderItem={renderItems}
        ListFooterComponent={renderLoader}
        onEndReached={nextPageLoader}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

function ProfileTab() {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);

  const navigation = useNavigation();

  const handleSingOut = () => {
    navigation.replace("Login");
    auth
      .signOut()
      .then(() => {
        dispatch(setUserLogOut());
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.profileStyle}>
      <View style={styles.profileInfoContainer}>
        <Image
          style={styles.avatarImageContainer}
          source={{
            uri: userEmail.photo,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text>Email: {userEmail.name}</Text>
          <Text>Name: {userEmail.name.split("@")[0]}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSingOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator tabBarPosition="bottom">
      <Tab.Screen name="Feeds" component={FeedsTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageContainer: {
    flex: 1,
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
  },
  loaderStyle: {
    marginVertical: 15,
    alignItems: "center",
  },
  profileStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  avatarImageContainer: {
    marginTop: 20,
    width: "30%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 80,
  },
  profileInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
