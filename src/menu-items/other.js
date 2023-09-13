// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
import { decodeToken } from 'utils/decodeToken';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';

// constant
const icons = { IconBrandChrome, IconHelp };
const {role}=decodeToken(getDataFromLocalStorage('token')) 

const user = role === 'user';
const other = {
  id: 'listings',
  type: 'group',
  children: [
    {
      id: 'show property Listings',
      title: 'Property Listing',
      type: 'item',
      user,
      url: 'listings',
      
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
   
  ]
};

export default other;
