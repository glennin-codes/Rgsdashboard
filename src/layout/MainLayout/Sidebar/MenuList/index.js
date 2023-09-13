// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useUser } from 'menu-items/stateHandle';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => 
{
const user=useUser();
// Create a modified copy of menuItem.items
const modifiedMenuItems = menuItem.items.map((item, index) => {
  if (index === 0) {
    return item; // Keep the dashboard item unchanged
  } else if (index === 1 || index === 2) {
    return {
      ...item,
      children: item.children.map((child) => ({
        ...child,
        user,
      })),
    };
  } else {
    return item;
  }
});
  
  const navItems =modifiedMenuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
