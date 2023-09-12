import { lazy } from 'react';

// project imports

import Loadable from 'ui-component/Loadable';

const NotFound = Loadable(lazy(() => import('views/pages/404')));

export const route404 = {
  path: '*',
  element: <NotFound />
};
