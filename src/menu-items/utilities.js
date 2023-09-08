// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

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
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'Employees',
      title: 'Eployees',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'Payroll stats',
      title: 'Payroll stats',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
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
