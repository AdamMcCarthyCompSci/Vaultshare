import React from 'react';
import { SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon, BottomNavigation, BottomNavigationTab, Layout, ViewPager, Text, TopNavigation, Divider, TopNavigationAction } from '@ui-kitten/components';
import { NavigationContext } from '../NavigationContext';
import GroupList from './GroupList';
import Friends from './Friends';
import Activity from './Activity';
import Settings from './Settings';
import TopNavigationSet from './TopNavigationSet';

  const PeopleIcon = (props) => (
    <Icon {...props} name='people-outline'/>
  );
  
  const PersonIcon = (props) => (
    <Icon {...props} name='person-outline'/>
  );
  
  const ActivityIcon = (props) => (
    <Icon {...props} name='activity-outline'/>
  );

  const SettingsIcon = (props) => (
    <Icon {...props} name='settings-outline'/>
  );

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

export default function Home(props) {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );
  
  const navigationContext = React.useContext(NavigationContext);

  const tabIndexes = ['GroupList', 'Friends', 'Activity', 'Settings']
    return (
      <>
      <SafeAreaView style={{ flex: 1 }}>
          <TopNavigationSet navigation={props.navigation}/>
          <ViewPager
      selectedIndex={navigationContext.tab}
      onSelect={index => navigationContext.changeTab(index)}>
      <Layout
      style={{height: '100%'}}
        level='2'>
        <GroupList navigation={props.navigation}/>
      </Layout>
      <Layout
            style={{height: '100%'}}
        level='2'>
        <Friends navigation={props.navigation}/>
      </Layout>
      <Layout
            style={{height: '100%'}}
        level='2'>
        <Activity navigation={props.navigation}/>
      </Layout>
      <Layout
            style={{height: '100%'}}
        level='2'>
        <Settings navigation={props.navigation}/>
      </Layout>
    </ViewPager>
        <BottomNavigation
        style={{marginTop: 'auto'}}
        selectedIndex={navigationContext.tab}
        onSelect={index => {
          navigationContext.changeTab(index)
          }}>
        <BottomNavigationTab icon={PeopleIcon} title='Groups'/>
        <BottomNavigationTab icon={PersonIcon} title='Friends'/>
        <BottomNavigationTab icon={ActivityIcon} title='Activity'/>
        <BottomNavigationTab icon={SettingsIcon} title='Settings'/>
      </BottomNavigation>
      </SafeAreaView>
      </>
    )
}