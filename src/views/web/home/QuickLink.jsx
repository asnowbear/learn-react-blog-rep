import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useMediaQuery } from 'react-responsive'

// components
// 特别好的导入方式 import { default as Icon } from '地址'
import { Icon, Divider, Empty, Drawer, Tag, Spin } from 'antd'

const title = '快速导航'

const List = props => {
  const { list, showTitle = true } = props
  return (
    <ul className='preview'>
      {showTitle && <Divider>{title}</Divider>}
      {list.map(item => (
        <li key={item.id}>
          {/* 跳入到指定的路由链接 */}
          <Link to={`/article/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

/**
 * article quick link
 */
const QuickLink = props => {
  // useMediaQuery主要是用来计算当前窗口<1300px
  const isGreaterThan1300 = useMediaQuery({ query: '(min-width: 1300px)' })
  const { list } = props

  // useState还是需要和UI关联的
  const [drawerVisible, setDrawerVisible] = useState(false)

  // 判断当前窗口大小，<1300 显示自定义列表 ：显示抽屉效果（点开显示导航列表）
  return isGreaterThan1300 ? <List list={list} /> : (
    <>
      {/* 图标 */}
      <div className='drawer-btn' onClick={e => setDrawerVisible(true)}>
        <Icon type='menu-o' className='nav-phone-icon' />
      </div>
      {/* 抽屉盒子 */}
      <Drawer
        title={title}
        placement='right'
        closable={false}
        onClose={e => setDrawerVisible(false)}
        visible={drawerVisible}
        getContainer={() => document.querySelector('.app-home')}>
        {/* 文章列表 */}
        <List list={list} showTitle={false} />
      </Drawer>
    </>
  )
}

export default QuickLink

