import { GITHUB } from '@/config'
import Layout from '@/layout/web'
// 自定义的一种懒加载方式
// 可以使用react的lasy+suspense
import lazy from '@/components/Lazy'

export default {
  path: '/',
  name: 'home',
  component: Layout, // layout为布局组件，通过配置的子路由填充子组件
  childRoutes: [
    // 默认填充此组件
    { path: '', component: lazy(() => import('@/views/web/home')) },
    { path: 'article/:id', component: lazy(() => import('@/views/web/article')) },
    { path: 'archives', component: lazy(() => import('@/views/web/archives')) },
    { path: 'categories', component: lazy(() => import('@/views/web/categories')) },
    { path: 'categories/:name', component: lazy(() => import('@/views/web/tag')) },
    { path: 'tags/:name', component: lazy(() => import('@/views/web/tag')) },
    { path: '/github', component: GITHUB.enable && lazy(() => import('@/components/GithubLogining')) },
    { path: '/about', component: lazy(() => import('@/views/web/about')) },
    { path: '*', component: lazy(() => import('@/components/404')) },
  ],
}
