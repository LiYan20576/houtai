import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from './utils'
import routes from '~pages'
import { canNavigate } from '@layouts/plugins/casl'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }; // 将滚动位置设置为顶部
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        return { name: 'home' }
      },
    },
    {
      path: '/pages/user-profile',
      redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
    },
    ...setupLayouts(routes),
  ],
})


// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   if (to.meta.check) { // 检查目标路由是否需要登录
//     const isLoggedIn = isUserLoggedIn(); // 检查用户是否已登录，这是你根据具体情况实现的逻辑
//     console.log(isLoggedIn);
//     if (isLoggedIn) {
//       // 用户已登录，继续导航到目标路由
//       console.log("登录成功");
//       next();
//     } else {
//       // 用户未登录，跳转到登录页，并保存目标路由的信息
//       next({
//         name: 'login',
//         query: to.query, // 通过 query 参数保存目标路由的完整路径
//       });
//     }
//   } else {
//     // 不需要登录的路由，直接导航
//     next();
//   }
// });


export default router
