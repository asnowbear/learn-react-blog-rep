import React, { Component, Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './index.less'
import { useSelector, useDispatch } from 'react-redux'

// methods
import axios from '@/utils/axios'
import { calcCommentsCount } from '@/utils'
import { loginout } from '@/redux/user/actions'
import useAjaxLoading from '@/hooks/useAjaxLoading'

import {
  Comment, Avatar, Form, Button, Divider,
  Input, Icon, Menu, Dropdown, message, Modal
} from 'antd'
import List from './list' // 评论列表
import AppAvatar from '@/components/Avatar'

import useBus from '@/hooks/useBus'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value, articleId }) => (
  <div>
    {/* Form.item竟然可以单独使用，和Vue确实有所不同 */}
    <Form.Item>
      <TextArea rows={4} placeholder='说点什么...' onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <div className='controls'>
        <Icon type='info-circle' className='controls-tip-icon' />
        <span className='controls-tip'>支持 Markdown 语法</span>
        <Button className='disscus-btn' htmlType='submit'
          loading={submitting} onClick={onSubmit} type='primary'>
          {articleId !== -1 ? '添加评论' : '留言'}
        </Button>
      </div>
    </Form.Item>
  </div>
)

function Discuss(props) {
  const dispatch = useDispatch() // 通知到redux中执行actions
  const bus = useBus() // 跨组件通信
  const userInfo = useSelector(state => state.user) // 使用store中的值
  const { username, role } = userInfo

  const { commentList, articleId } = props
  const [value, setValue] = useState('') // 函数状态
  const [submitting, withLoading] = useAjaxLoading()

  // 小代码块
  const renderDropdownMenu = () => {
    // 下拉菜单
    return username ? (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key='loginout'>注销</Menu.Item>
      </Menu>
    ) : (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key='login'>登录</Menu.Item>
        <Menu.Item key='register'>注册</Menu.Item>
      </Menu>
    )
  }

  function handleMenuClick(e) {
    switch (e.key) {
      case 'login':
        bus.emit('openSignModal', 'login') // 通知打开登录窗口
        break
      case 'register':
        bus.emit('openSignModal', 'register') // 通知打开注册窗口
        break
      case 'loginout':
        dispatch(loginout()) // 通知更新store
        break
      default:
        break
    }
  }

  function handleSubmit() {
    if (!value) return
    if (!userInfo.username) return message.warn('您未登陆，请登录后再试。')

    // 带有loading效果的hook函数
    // 增加评论
    withLoading(
      axios.post(
        '/discuss',
        {
          articleId: props.articleId,
          content: value,
          userId: userInfo.userId
        }
      )
    ).then(res => {
      setValue('') // 提交成功后再清空评论区输入框
      props.setCommentList(res.rows) // @TODO：为什么使用props
    })
  }

  return (
    <div id='discuss'>
      <div className='discuss-header'>
        {/* 留言/评论统计UI */}
        <span className='discuss-count'>{calcCommentsCount(commentList)}</span>
        {articleId !== -1 ? '条评论' : '条留言'}
        {/* 登录角色显示UI */}
        <span className='discuss-user'>
          <Dropdown overlay={renderDropdownMenu()} trigger={['click', 'hover']}>
            <span>
              {username || '未登录用户'} <Icon type='down' />
            </span>
          </Dropdown>
        </span>
        {/* 分割线UI */}
        <Divider className='hr' />
      </div>

      {/* 留言输入框UI */}
      <Comment
        // 头标UI
        avatar={
          username ? (
            <AppAvatar userInfo={userInfo} />
          ) : (
            <Icon type='github' theme='filled' style={{ fontSize: 40, margin: '5px 5px 0 0' }} />
          )
        }
        // 输入框UI
        content={
          <Editor
            onChange={e => setValue(e.target.value)}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            articleId={articleId}
          />
        }
      />

      <List commentList={commentList} articleId={articleId} setCommentList={props.setCommentList} />
    </div>
  )
}

Discuss.propTypes = {
  commentList: PropTypes.array.isRequired
}

export default Discuss
