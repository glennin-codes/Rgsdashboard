import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const DisplayAll = Loadable(lazy(() => import('views/utilities/DisplayAllDatas')));
const SingleForm = Loadable(lazy(() => import('views/pages/data/SingleData')));
const Employees = Loadable(lazy(() => import('views/utilities/Employees')));
const PayrollStats= Loadable(lazy(() => import('views/utilities/payrolStats')));

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
          element: <DisplayAll />
        },
        {
          path: 'all/single/:id',
          element: <SingleForm/>
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
          element: <PayrollStats />
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
      path: 'listings',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
