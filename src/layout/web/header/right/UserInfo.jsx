import React, { Component } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
// 主要是要使用react-router的history, location, match三个属性
import { withRouter } from 'react-router-dom'

// methods
import { loginout } from '@/redux/user/actions'

// components
import { Button, Dropdown, Menu, Avatar } from 'antd'
import AppAvatar from '@/components/Avatar'

// hooks
import useBus from '@/hooks/useBus'

function UserInfo(props) {
  const dispatch = useDispatch()
  const bus = useBus()
  // useSelector: 共享状态,从Redux的store中提取数据（state）
  // 登录成功后将数据存储到store中，同时这里将会响应变化重新渲染组件
  const userInfo = useSelector(state => state.user)
  const { username, github, role } = userInfo

  const MenuOverLay = (
    <Menu>
      {role === 1 && (
        <Menu.Item>
          <span onClick={e => bus.emit('openUploadModal')}>导入文章</span>
        </Menu.Item>
      )}
      {role === 1 && (
        <Menu.Item>
          <span onClick={e => props.history.push('/admin')}>后台管理</span>
        </Menu.Item>
      )}
      <Menu.Item>
        <span className='user-logout' onClick={e => dispatch(loginout())}>
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className='header-userInfo'>
      {username ? (
        // 下拉菜单；AD的Dropdown还是一个容器
        <Dropdown placement='bottomCenter' overlay={MenuOverLay} trigger={['click', 'hover']}>
          <div style={{ height: 55 }}>
            <AppAvatar userInfo={userInfo} popoverVisible={false} />
          </div>
        </Dropdown>
      )
        : (
          <>
            <Button
              ghost
              type='primary'
              size='small'
              style={{ marginRight: 20 }}
              onClick={e => bus.emit('openSignModal', 'login')}>
              登录
            </Button>
            <Button ghost type='danger' size='small' onClick={e => bus.emit('openSignModal', 'register')}>
              注册
            </Button>
          </>
        )}
    </div>
  )
}

export default withRouter(UserInfo)
