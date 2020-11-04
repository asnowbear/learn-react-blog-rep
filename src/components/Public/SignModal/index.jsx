import React, { useState, useEffect } from 'react'
import { Form, Icon, Input, Button, Modal } from 'antd'
import { useLocation } from 'react-router-dom'

import { GITHUB } from '@/config'
import { save } from '@/utils/storage'

// redux
import { login, register } from '@/redux/user/actions'
import { useDispatch } from 'react-redux'

// hooks
import { useListener } from '@/hooks/useBus'

const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

function FormItem(props) {
  // props.children表示组件的所有子节点
  const { children, ...aa } = props
  console.log(props)
  return <Form.Item {...FormItemLayout} {...aa}>{children}</Form.Item>
}

function SignModal(props) {
  // useDispatch：作用，共享状态，返回store对dispatch引用，可执行redux中的方法
  const dispatch = useDispatch() // dispatch hooks
  const location = useLocation() // location
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('login')

  // getFieldDecorator用于给表单项添加自定义验证规则
  const { getFieldDecorator } = props.form

  // 监听事件，打开modal窗口
  useListener('openSignModal', type => {
    props.form.resetFields()
    setType(type)
    setVisible(true)
  })

  function handleSubmit(e) {
    e.preventDefault()
    // 先校验，如果有不满足的项，则滚动到对应的项，让其处于可见范围
    props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return
      const action = type === 'login' ? login : register
      dispatch(action(values)).then(() => {
        setVisible(false) // type =  login | register
      })
    })
  }

  function githubLogin() {
    const { pathname, search } = location
    save('prevRouter', `${pathname}${search}`)
    window.location.href = `${GITHUB.url}?client_id=${GITHUB.client_id}`
  }

  // 确认密码
  function compareToFirstPassword(rule, value, callback) {
    const form = props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  return (
    <Modal
      width={460}
      title={type}
      visible={visible}
      // 通过
      onCancel={e => setVisible(false)}
      footer={null}>
      <Form layout='horizontal'>
        {type === 'login' ? (
          <>
            <FormItem label='用户名'>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: 'Username is required' }]
              })(<Input placeholder='请输入用户名' />)}
            </FormItem>
            <FormItem label='密码'>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Password is required' }]
              })(<Input placeholder='请输入密码' type='password' />)}
            </FormItem>
          </>
        )
          : (
            <>
              <FormItem label='用户名'>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Username is required' }]
                })(<Input placeholder='请输入用户名' />)}
              </FormItem>
              <FormItem label='密码'>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Password is required' }]
                })(<Input placeholder='请输入密码' type='password' />)}
              </FormItem>
              <FormItem label='确认密码'>
                {getFieldDecorator('confirm', {
                  rules: [
                    { required: true, message: 'Password is required' },
                    { validator: compareToFirstPassword }
                  ]
                })(<Input placeholder='确认密码' type='password' />)}
              </FormItem>
              <FormItem label='邮箱'>
                {getFieldDecorator('email', {
                  rules: [
                    { type: 'email', message: 'The input is not valid E-mail!' },
                    { required: true, message: 'Please input your E-mail!' }
                  ]
                })(<Input placeholder='请输入您的邮箱' />)}
              </FormItem>
            </>
          )}
      </Form>
      <Button type='primary' block onClick={handleSubmit}>
        {type}
      </Button>
      {GITHUB.enable && (
        <Button block icon='github' onClick={githubLogin} style={{ marginTop: 10 }}>
          github login
        </Button>
      )}
    </Modal>
  )
}

// Form.create()返回一个装修器，
// SignModal被装修后，将自带this.props.form属性
export default Form.create()(SignModal)
