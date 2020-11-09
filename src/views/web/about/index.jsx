import React, { Component, useEffect, useState } from 'react'

// 组件样式直接接入即可
import './index.less'
import { Avatar } from 'antd'

import { SIDEBAR, ABOUT } from '@/config'

import axios from '@/utils/axios'
import Discuss from '@/components/Discuss'

import { useMediaQuery } from 'react-responsive'

function About(props) {
  // 1、useState：让组件有状态，
  // 2、接受一个参数作为初始值，并且返回一个数组
  // 3、setCommentList方法可以接受一个回调来使用前一个状态值，也可以直接设置新状态值
  const [commentList, setCommentList] = useState([])
  const iphoneScreen = useMediaQuery({ query: '(max-width: 576px)' })

  // useEffect同步函数在render之后才执行，保持state同步
  useEffect(() => {
    const fetchList = () => {
      axios.get('/article/-1').then(article => {
        setCommentList(article.comments)
      })
    }
    ABOUT.discuss && fetchList()
  }, [])

  return (
    <div className='app-about' style={{ paddingRight: iphoneScreen ? 0 : 20 }}>
      <Avatar src={SIDEBAR.avatar} />
      <span style={{ paddingLeft: 10 }}>{ABOUT.describe}</span>
      {ABOUT.renderMyInfo || null}
      {ABOUT.discuss &&
        <Discuss articleId={-1} commentList={commentList} setCommentList={setCommentList} />}
    </div>
  )
}

export default About
