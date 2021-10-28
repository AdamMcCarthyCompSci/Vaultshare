import React, { useEffect } from "react";
import ExpenseItem from "./SplitItem";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  DrawerGroup,
  DrawerItem,
} from "@ui-kitten/components";
import { ThemeContext } from "../ThemeContext";

const Stack = createNativeStackNavigator();

const PeopleIcon = (props) => <Icon {...props} name="people-outline" />;

const ShoppingBagIcon = (props) => (
  <Icon {...props} name="shopping-bag-outline" />
);

const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

const BarChartIcon = (props) => <Icon {...props} name="bar-chart-outline" />;

const PlusCircleIcon = (props) => (
  <Icon {...props} name="plus-circle-outline" />
);

const ForwardIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

export default function GroupList(props) {
  const themeContext = React.useContext(ThemeContext);

  const [user, setUser] = React.useState({});
  const [groups, setGroups] = React.useState([{}]);
  const [groupsDrawer, setGroupsDrawer] = React.useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Change to /split/groups if not localhost
        const response = await fetch(
          process.env.BACKEND_URL + "/split/groups",
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
        setUser(content.result[0]);
        setGroups(content.result[1]);
        return;
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <Layout style={{ flex: 1, flexDirection: "column" }}>
        <Button
          appearance="outline"
          onPress={() => {
            props.navigation.navigate("AddGroup");
          }}
          accessoryLeft={PlusCircleIcon}
        >
          Create Group
        </Button>

        <Drawer
          selectedIndex={groupsDrawer}
          onSelect={(index) => setGroupsDrawer(index)}
        >
          {groups.map((group, index) => (
            <DrawerGroup
              key={index}
              title={group.group_name}
              accessoryLeft={PeopleIcon}
            >
              <DrawerItem
                title="Add Expense"
                accessoryLeft={PlusCircleIcon}
                accessoryRight={ForwardIcon}
                onPress={() => {
                  props.navigation.navigate("AddExpense", { group: group });
                }}
              />
              <DrawerItem
                title="Expenses"
                accessoryLeft={ShoppingBagIcon}
                accessoryRight={ForwardIcon}
                onPress={() => {
                  props.navigation.navigate("Expenses", {
                    group: group,
                    member: user,
                  });
                }}
              />
              <DrawerItem
                title="Members"
                accessoryLeft={PersonIcon}
                accessoryRight={ForwardIcon}
                onPress={() => {
                  props.navigation.navigate("Members", {
                    group: group,
                    member: user,
                  });
                }}
              />
              <DrawerItem
                title="Statistics"
                accessoryLeft={BarChartIcon}
                accessoryRight={ForwardIcon}
              />
            </DrawerGroup>
          ))}
        </Drawer>
      </Layout>
    </>
  );
}
