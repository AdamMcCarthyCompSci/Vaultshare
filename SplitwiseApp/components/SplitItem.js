import React from "react";
import ExpenseDetails from "./ExpenseDetails";
import { StyleSheet, View, FlatList, TextPropTypes } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Layout, ListItem, Icon, Text } from "@ui-kitten/components";

const Stack = createNativeStackNavigator();

export default function SplitItem(props) {
  const { split } = props.split;

  const renderUpIcon = (props) => (
    <Icon {...props} fill="#88D123" name="trending-up-outline" />
  );
  const renderDownIcon = (props) => (
    <Icon {...props} fill="#FF6614" name="trending-down-outline" />
  );

  return (
    <Layout style={{ flex: 1, flexDirection: "row" }}>
      <Layout style={{ flex: 10 }}>
        <ListItem
          title={split.expense_title}
          description={`${split.username} #${split.tag}`}
          accessoryLeft={split.split_value > 0 ? renderUpIcon : renderDownIcon}
          accessoryRight={<Text>{split.split_value}</Text>}
        />
      </Layout>
    </Layout>
  );
}
