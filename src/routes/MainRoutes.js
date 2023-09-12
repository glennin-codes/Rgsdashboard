import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const Employees = Loadable(lazy(() => import('views/utilities/Employees')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const CreateEmployee = Loadable(lazy(() => import('views/utilities/CreateEmployee')));
const CreateAdmin = Loadable(lazy(() => import('views/utilities/CreateAdmin')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'datas',
      children: [
        {
          path: 'all',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'datas',
      children: [
        {
          path: 'employees',
          element: <Employees />
        }
      ]
    },
    {
      path: 'datas',
      children: [
        {
          path: 'payrollstats',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'management',
      children: [
        {
          path: 'createAdmin',
          element: <CreateAdmin />
        },
        {
          path: 'createEmployee',
          element: <CreateEmployee />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'listings',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
