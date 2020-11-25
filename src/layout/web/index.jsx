import React from 'react'
import '@/styles/app.less'
import { Layout, Icon, Row, Col, BackTop } from 'antd'

import Header from './header'
import SideBar from './sidebar'
import AppMain from './AppMain'

// 响应式
const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

// layout组件负责整个页面的布局
// 为react组件开发的常见用法
const WebLayout = props => {
  // 路由投放的组件将自动携带参数到props
  return (
    <Layout className='app-container'>
      {/* 头部 */}
      <Header />
      {/* 内容 */}
      <Row className='app-wrapper'>
        <Col {...siderLayout}>
          <SideBar />
        </Col>
        <Col {...contentLayout}>
          <AppMain {...props} />
        </Col>
      </Row>
      {/* 返回页面开始 */}
      <BackTop target={() => document.querySelector('.app-main')} />
    </Layout>
  )
}

export default WebLayout
