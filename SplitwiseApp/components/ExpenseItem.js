import React, { useEffect } from "react";
import ExpenseDetails from "./ExpenseDetails";
import SplitItem from "./SplitItem";
import { StyleSheet, View, FlatList, TextPropTypes } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  Layout,
  ListItem,
  Icon,
  Text,
  Card,
  List,
  Divider,
} from "@ui-kitten/components";

const Stack = createNativeStackNavigator();

export default function ExpenseItem(props) {
  const { expense } = props.expense;
  const { splits } = props;

  return (
    <Layout style={{ flex: 1, flexDirection: "row" }}>
      <Layout style={{ flex: 10 }}>
        <Card style={{ height: "100%" }}>
          <Text status="primary">
            {expense.date_paid} {expense.expense_title} {expense.expense_value}
          </Text>
          <List
            data={splits
              .filter((split) => split.expense_id === expense.expense_id)
              .map((split, index) => ({ key: index.toString(), split: split }))}
            ItemSeparatorComponent={Divider}
            renderItem={({ item, index }) => (
              <SplitItem
                key={index}
                index={index}
                split={item}
                navigation={props.navigation}
              />
            )}
          />
        </Card>
      </Layout>
    </Layout>
  );
}
