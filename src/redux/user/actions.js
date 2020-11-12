import * as TYPES from '@/redux/types'
import axios from '@/utils/axios'
import { message } from 'antd'
export const login = params => {
  return dispatch =>
    axios.post('/login', params).then(res => {
      dispatch({
        type: TYPES.USER_LOGIN,
        payload: res
      })
      message.success(`登录成功, 欢迎您 ${res.username}`)
      return res
    })
}

/**
 * 注册提交到后端后，没有更新到store中
 * @param {} params
 */
export const register = params => {
  return dispatch =>
    axios.post('/register', params).then(res => {
      message.success('注册成功，请重新登录您的账号！')
    })
}

export const loginout = () => ({
  type: TYPES.USER_LOGIN_OUT
})
