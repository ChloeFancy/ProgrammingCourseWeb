import React from 'react';
import TopMenu from './TopMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';

const TopMenuWrapper = React.memo(props => {
  const { isMobile, menuData, onCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return (
    <TopMenu {...props} flatMenuKeys={flatMenuKeys} />
  );
});

export default TopMenuWrapper;
