import React from 'react';

export const NavigationContext = React.createContext({
  tab: 0,
  changeTab: () => {},
});