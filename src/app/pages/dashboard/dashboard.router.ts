import { Route } from '@/app/interface/router';
import Layout from '@/app/layout/index.vue';
import Dashboard from './dashboard.vue';
const router: Route[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: '首页',
          hidden: false,
          iconName: 'el-icon-menu',
        },
      },
    ],
  },
];

export default router;
