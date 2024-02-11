import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Home = Loadable(lazy(() => import('views/components/Home')));

// dojos
const Dojos = Loadable(lazy(() => import('views/components/dojos')));
const AddDojos = Loadable(lazy(() => import('views/components/dojos/Add')));
// const EditDojos = Loadable(lazy(() => import('views/components/dojos/Edit')));

// members
const Members = Loadable(lazy(() => import('views/components/members')));
const AddMembers = Loadable(lazy(() => import('views/components/members/Add')));
// const EditMembers = Loadable(lazy(() => import('views/components/members/Edit')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/home',
            element: <Home />
        },
        {
            path: '/dojos',
            element: <Dojos />
        },
        {
            path: '/dojos/add',
            element: <AddDojos />
        },
        // {
        //     path: '/dojos/:id',
        //     element: <EditDojos />
        // },
        {
            path: '/members',
            element: <Members />
        },
        {
            path: '/members/add',
            element: <AddMembers />
        },
        // {
        //     path: '/members/:id',
        //     element: <EditMembers />
        // },
    ]
};

export default MainRoutes;
