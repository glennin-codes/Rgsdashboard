// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import { decodeToken } from 'utils/decodeToken';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';
// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //
const decodedData = decodeToken(getDataFromLocalStorage('token'));
const {  role = '' } = decodedData || {};
const user= role === 'user'

const utilities = {
  id: 'utilities',
  title: 'Land Survey Listing',
  type: 'group',
  children: [
    {
      id: 'Display All Properties',
      title: 'display All',
      type: 'item',
      user,
      url: 'datas/all',
      icon: SettingsIcon,
      breadcrumbs: false
    },
    {
      id: 'Employees',
      title: 'Employees',
      type: 'item',
      user,
      url: '/datas/employees',
      icon: PeopleIcon,
      breadcrumbs: false
    },
    {
      id: 'Payroll stats',
      title: 'Payroll stats',
      type: 'item',
      user,
      url: '/datas/payrollstats',
      icon: AttachMoneyIcon ,
      breadcrumbs: false
    },
    {
      id: 'Managment',
      title: 'Managment',
      user,
      type: 'collapse',
      icon: icons.IconWindmill,
      children: [
        {
          id: 'Create Admin',
          title: 'Create Admin',
          type: 'item',
          user,
          url: '/management/createAdmin',
          breadcrumbs: false
        },
        {
          id: 'create Employee ',
          title: 'Create Employee ',
          type: 'item',
          user,
          url: '/management/createEmployee',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
