// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
import { decodeToken } from 'utils/decodeToken';
import { getDataFromLocalStorage } from 'views/pages/authentication/auth-forms/LocalStorage';

// constant
const icons = { IconBrandChrome, IconHelp };
const token = getDataFromLocalStorage('token');
const { role } = decodeToken(token);
//Ensure that role is defined before comparing it
const user = role !== undefined && role === 'user';

if (role === null) {
  console.error('Role is null');
}


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
