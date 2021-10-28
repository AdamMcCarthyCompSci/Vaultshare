import React, { useEffect } from "react";
import ExpenseItem from "./SplitItem";
import { StyleSheet, View, FlatList } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  Layout,
  Icon,
  Input,
  List,
  Text,
  Drawer,
  DrawerGroup,
  DrawerItem,
} from "@ui-kitten/components";
import { ThemeContext } from "../ThemeContext";

const Stack = createNativeStackNavigator();

export default function Friends(props) {
  const [username, setUsername] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [friends, setFriends] = React.useState([{}]);
  const [requests, setRequests] = React.useState([{}]);
  const [selectFriends, setSelectFriends] = React.useState(false);
  const [friendsDrawer, setFriendsDrawer] = React.useState(null);

  const PersonAddIcon = (props) => (
    <Icon {...props} name="person-add-outline" />
  );

  const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

  const PersonRemoveIcon = (props) => (
    <Icon {...props} name="person-remove-outline" />
  );

  const PersonDoneIcon = (props) => (
    <Icon {...props} name="person-done-outline" />
  );

  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

  useEffect(() => {
    (async () => {
      try {
        // Change to /split/groups if not localhost
        const response = await fetch(
          process.env.BACKEND_URL + "/split/friends",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const content = await response.json();
        console.log(content.result);
        setFriends(content.result[0]);
        setRequests(content.result[1]);
        return;
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const addFriend = async () => {
    try {
      const response = await fetch(
        process.env.BACKEND_URL + "/split/addFriend",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            tag: tag,
          }),
          credentials: "include",
        }
      );
      const content = await response.json();
      console.log(content.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout style={{ flex: 1, flexDirection: "column" }}>
        <Layout style={{ flex: 1 }}>
          <Text style={{ textAlign: "center" }} category="h4" status="primary">
            Add a friend
          </Text>
          <Layout style={{ flexDirection: "row" }}>
            <Layout style={{ flex: 3 }}>
              <Input
                status="primary"
                placeholder="Username"
                value={username}
                onChangeText={(value) => setUsername(value)}
              />
            </Layout>
            <Layout style={{ flex: 1 }}>
              <Input
                status="primary"
                placeholder="Tag"
                value={tag}
                onChangeText={(value) => setTag(value)}
              />
            </Layout>
          </Layout>
          <Button
            appearance="outline"
            onPress={() => {
              addFriend();
            }}
            accessoryLeft={PersonDoneIcon}
          >
            Add Friend
          </Button>
          <Text style={{ textAlign: "center" }} category="h4" status="primary">
            Friends
          </Text>
          <Layout style={{ flexDirection: "row" }}>
            <Layout style={{ flex: 1 }}>
              <Button
                disabled={!selectFriends}
                appearance="outline"
                onPress={() => setSelectFriends(false)}
              >
                Friends
              </Button>
            </Layout>
            <Layout style={{ flex: 1 }}>
              <Button
                disabled={selectFriends}
                appearance="outline"
                onPress={() => setSelectFriends(true)}
              >
                Requests
              </Button>
            </Layout>
          </Layout>
          <Drawer
            selectedIndex={friendsDrawer}
            onSelect={(index) => setFriendsDrawer(index)}
          >
            {(selectFriends ? friends : requests).map((friend, index) => (
              <DrawerGroup
                key={index}
                title={
                  friend.username + " #" + (friend.tag && friend.tag.toString())
                }
                accessoryLeft={PersonIcon}
              >
                <DrawerItem
                  title="Add to Group"
                  accessoryLeft={PersonAddIcon}
                  accessoryRight={ForwardIcon}
                  onPress={() => {
                    props.navigation.navigate("FriendToGroup", {
                      friend: friend,
                    });
                  }}
                />
                <DrawerItem
                  title="Remove Friend"
                  accessoryLeft={PersonRemoveIcon}
                  accessoryRight={ForwardIcon}
                  onPress={() => {
                    console.log("REMOVE FRIEND");
                  }}
                />
              </DrawerGroup>
            ))}
          </Drawer>
        </Layout>
      </Layout>
    </>
  );
}
