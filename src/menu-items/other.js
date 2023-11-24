// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
//constants

const icons = { IconBrandChrome, IconHelp };

const other = {
  id: 'previews',
  type: 'group',
  children: [
    {
      id: 'Post Preview',
      title: 'Post Previews',
      type: 'item',

      url: 'previews',

      icon: icons.IconBrandChrome,
      breadcrumbs: false
    }
  ]
};

export default other;
