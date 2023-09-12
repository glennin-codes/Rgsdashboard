// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'listings',
  type: 'group',
  children: [
    {
      id: 'show property Listings',
      title: 'Property Listing',
      type: 'item',
      url: 'listings',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
   
  ]
};

export default other;
