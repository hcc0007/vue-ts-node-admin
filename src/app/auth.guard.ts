import { Route } from 'vue-router';
import { Message } from 'element-ui';
import router from './app.router';
import { StoreStateService } from './store.state.service';
import { UserModule } from '@/app/store/modules/user';
import { AuthModule } from '@/app/store/modules/auth';

const userAuth: {
  [index: string]: string[];
  admin: string[];
  developer: string[];
  editor: string[];
} = {
  admin: [
    'Dashboard',
    'Admin1-1',
    'Admin1-2',
    'Admin2-1',
    'Admin2-2',
    'Admin1-3',
    'Admin3-1',
    'SvgTestPages',
    'SvgTestPages/index',
  ],
  developer: ['Dashboard', 'Developer'],
  editor: ['Dashboard', 'Editor'],
};
const whiteList: string[] = ['/login'];

router.beforeEach((to: Route, _: Route, next: any) => {
  const hasToken: string | undefined = UserModule.token;

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (!UserModule.role) {
        try {
          UserModule.GetUserInfo();
          const accessedRoutesNames: string[] = userAuth[UserModule.role];
          AuthModule.GenerateRoutes(accessedRoutesNames);
          router.addRoutes(AuthModule.dynamicRoutes);

          console.log(AuthModule.routes, router);
          console.log(to);

          next({ ...to, replace: true });
        } catch (e) {
          UserModule.ResetToken();
          next(`/login?redirect=${to.path}`);
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
