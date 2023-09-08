// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Land Survey Listing',
  type: 'group',
  children: [
    {
      id: 'Display All Properties',
      title: 'display All',
      type: 'item',
      url: '/utils/util-typography',
      icon: SettingsIcon,
      breadcrumbs: false
    },
    {
      id: 'Employees',
      title: 'Eployees',
      type: 'item',
      url: '/utils/util-color',
      icon: PeopleIcon,
      breadcrumbs: false
    },
    {
      id: 'Payroll stats',
      title: 'Payroll stats',
      type: 'item',
      url: '/utils/util-shadow',
      icon: AttachMoneyIcon ,
      breadcrumbs: false
    },
    {
      id: 'Managment',
      title: 'Managment',
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'Lorem Ipsun',
          title: 'Lorem Ipsun',
          type: 'item',
          url: '/icons/tabler-icons',
          breadcrumbs: false
        },
        {
          id: 'fundamentals ',
          title: 'fundamentals',
          type: 'item',
          external: true,
          target: '_blank',
          // url: 'https://mui.com/material-ui/material-icons/',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
