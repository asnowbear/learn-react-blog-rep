import React from 'react'

import { Result, Button } from 'antd'
// 展示型组件/通用组件/UI组件
function PageNotFound(props) {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button
          type='primary'
          onClick={() => {
            props.history.push('/')
          }}>
          Back Home
        </Button>
      }
    />
  )
}

export default PageNotFound
