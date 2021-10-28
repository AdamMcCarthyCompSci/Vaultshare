import React, { useEffect } from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  Layout,
  Text,
  Icon,
  Input,
  Select,
  IndexPath,
  SelectItem,
  Card,
  Divider,
  Autocomplete,
  AutocompleteItem,
  SelectGroup,
  Datepicker,
} from "@ui-kitten/components";
import TopNavigationSet from "./TopNavigationSet";

const Stack = createNativeStackNavigator();

export default function AddExpense({ navigation, route }) {
  // const { groupMembers, group } = route.params;
  const { group } = route.params;

  const [groupMembers, setGroupMembers] = React.useState([{}]);

  useEffect(() => {
    (async () => {
      try {
        // Change to /split/group if not localhost
        const response = await fetch(
          process.env.BACKEND_URL + "/split/groupMembers",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              group_id: group.group_id,
            }),
          }
        );
        const content = await response.json();
        setGroupMembers(content.result);
        return;
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const [expenseTitle, setExpenseTitle] = React.useState("");
  const [expenseValue, setExpenseValue] = React.useState("");
  const [date, setDate] = React.useState(new Date());

  const memberNames = groupMembers.map(
    (groupMember) => groupMember.username + " #" + groupMember.tag
  );
  const groupedMemberNames = {
    Everyone: groupMembers.map(
      (groupMember) => groupMember.username + " #" + groupMember.tag
    ),
  };

  const [paying, setPaying] = React.useState(new IndexPath(0));
  //   Change this so everyone is selected as default rather than nobody
  const [splitting, setSplitting] = React.useState([]);
  const displayPaying = memberNames[paying.row];
  const displaySplitting = splitting.map((split) => {
    const groupTitle = Object.keys(groupedMemberNames)[split.section];
    return groupedMemberNames[groupTitle][split.row] + " ";
  });

  const ShoppingBagIcon = (props) => (
    <Icon {...props} name="shopping-bag-outline" />
  );

  const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

  const CheckmarkIcon = (props) => <Icon {...props} name="checkmark-outline" />;

  const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

  const confirmExpense = () => {
    (async () => {
      try {
        const response = await fetch(
          process.env.BACKEND_URL + "/split/addExpense",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              group: group,
              members: groupMembers,
              title: expenseTitle,
              value: expenseValue,
              paying: displayPaying,
              splitting: displaySplitting,
            }),
          }
        );
        const content = await response.json();
        console.log("RESULT", content);
        return;
      } catch (error) {
        console.error(error);
      }
    })();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigationSet back={true} navigation={navigation} />
      <Layout style={{ flex: 1, flexDirection: "column" }}>
        <Layout style={{ flex: 5 }}>
          <Text
            style={{ textAlign: "center", marginTop: "5%" }}
            category="h4"
            status="primary"
          >
            Title
          </Text>
          <Input
            status="primary"
            placeholder="Expense Title"
            value={expenseTitle}
            onChangeText={(value) => setExpenseTitle(value)}
          />
          <Text
            style={{ textAlign: "center", marginTop: "5%" }}
            category="h4"
            status="primary"
          >
            Value
          </Text>
          {/* Check if valid value (1 decimal max)*/}
          <Input
            status="primary"
            placeholder="Expense Value"
            value={expenseValue.toString()}
            onChangeText={(value) => {
              setExpenseValue(value.toString());
            }}
            keyboardType="numeric"
          />
          <Text
            style={{ textAlign: "center", marginTop: "5%" }}
            category="h4"
            status="primary"
          >
            Date
          </Text>
          <Datepicker
            placeholder="Date paid"
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryRight={CalendarIcon}
          />
          <Text
            style={{ textAlign: "center", marginTop: "5%" }}
            category="h4"
            status="primary"
          >
            Who's Paying?
          </Text>
          <Select
            multiSelect={false}
            selectedIndex={paying}
            value={displayPaying}
            onSelect={(index) => setPaying(index)}
          >
            {memberNames.map((memberName, index) => (
              <SelectItem
                key={index}
                accessoryRight={PersonIcon}
                title={memberName}
              />
            ))}
          </Select>
          <Text
            style={{ textAlign: "center", marginTop: "5%" }}
            category="h4"
            status="primary"
          >
            Who's Splitting?
          </Text>
          <Select
            multiSelect={true}
            selectedIndex={splitting}
            value={displaySplitting}
            onSelect={(index) => setSplitting(index)}
          >
            {Object.keys(groupedMemberNames).map((title, index) => (
              <SelectGroup key={index} title={title}>
                {groupedMemberNames[title].map((memberName, index) => (
                  <SelectItem
                    key={index}
                    accessoryRight={PersonIcon}
                    title={memberName}
                  />
                ))}
              </SelectGroup>
            ))}
          </Select>
        </Layout>
        <Layout style={{ flex: 1, justifyContent: "center" }} level="3">
          <Card status="primary" style={{ height: "100%" }}>
            <Button
              appearance="outline"
              onPress={() => {
                confirmExpense();
              }}
              accessoryLeft={CheckmarkIcon}
            >
              Confirm
            </Button>
          </Card>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
}
