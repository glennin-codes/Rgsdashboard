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

      url: 'datas/all',
      children:[
        {
          id: 'singleData', 
          type: 'item',
          url: '/singleData/:id',
          breadcrumbs: false
        },
      ],
      icon: SettingsIcon,
      breadcrumbs: false
    },
    {
      id: 'Employees',
      title: 'Employees',
      type: 'item',
      url: '/datas/employees',
      icon: PeopleIcon,
      breadcrumbs: false
    },
    {
      id: 'Payroll stats',
      title: 'Payroll stats',
      type: 'item',

      url: '/datas/payrollstats',
      
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
          id: 'Create Admin',
          title: 'Create Admin',
          type: 'item',
          url: '/management/createAdmin',
          breadcrumbs: false
        },
        {
          id: 'create Employee ',
          title: 'Create Employee ',
          type: 'item',
          url: '/management/createEmployee',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
