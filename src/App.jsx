import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// config
import routes from '@/routes'

// components 公共基础组件
import PublicComponent from '@/components/Public'

const App = props => {
  const role = useSelector(state => state.user.role) // 相当于 connect(state => state.user.role)(App)

  // 解构 route
  function renderRoutes(routes, contextPath) {
    const children = []

    const renderRoute = (item, routeContextPath) => {
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')
      // admin路由
      if (newContextPath.includes('admin') && role !== 1) {
        item = {
          ...item,
          component: () => <Redirect to='/' />,
          children: []
        }
      }
      if (!item.component) return

      // 递归子路有对象
      if (item.childRoutes) {
        const childRoutes = renderRoutes(item.childRoutes, newContextPath)
        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props}>{childRoutes}</item.component>}
            path={newContextPath}
          />
        )
        item.childRoutes.forEach(r => renderRoute(r, newContextPath))
      } else {
        // exact提供精准匹配作用
        children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
      }
    }

    routes.forEach(item => renderRoute(item, contextPath))

    // Switch只用来匹配第一个满足要求的路由，然后不再匹配下去
    return <Switch>{children}</Switch>
  }

  // 开始递归构建路由对象
  const children = renderRoutes(routes, '/')

  // 本项目的路由体系：
  // ----------------------------------
  // 1、路由的层次如下：
  // <BrowserRouter>  router容器
  //   <Switch>
  //     <Route></Route>
  //     ...
  //   </Switch>
  // </BrowserRouter>

  // 2、所有路由必须经过此过程注册
  // 然后才能通过Link、NavLink、useHistory代码方式跳转
  // useHistory的方式是使用react的钩子，从代码方式跳入到指定
  // 路由
  // 3、Link是本项目主要的路由接入方法
  return (
    <BrowserRouter>
      {children}
      <PublicComponent />
    </BrowserRouter>)
}

export default App
