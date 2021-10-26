import React from 'react';
import { Icon, Layout, TopNavigation, Divider, TopNavigationAction, MenuItem, OverflowMenu } from '@ui-kitten/components';
import Header from './Header';
import { NavigationContainer } from '@react-navigation/native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

export default function TopNavigationSet(props) {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon}/>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
        <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} back={false} onPress={() => props.navigation.goBack()}/>
  );

    return (
      <>
      <Header/>
      {/* <Layout style={{minHeight: 128}}> */}
      <TopNavigation
        alignment='center'
        title='Vaultshare'
        subtitle='Expense Splitting App'
        accessoryLeft={props.back ? renderBackAction : undefined}
        accessoryRight={renderRightActions}
      />
      <Divider/>
      {/* </Layout> */}
      </>
    )

}