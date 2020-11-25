import React from 'react'
import { Alert } from 'antd'
import { ANNOUNCEMENT } from '@/config'
import { useMediaQuery } from 'react-responsive'

// 主程序面板，路由组件的容器
function AppMain(props) {
  // 判断是否是苹果手机的屏幕分辨率
  const iphoneScreen = useMediaQuery({
    query: '(max-width: 576px)'
  })

  // 判断ipad
  const ipadScreen = useMediaQuery({
    query: '(min-width: 576px) and (max-width: 992px)'
  })

  return (
    <div className='app-main'>
      {(ipadScreen || iphoneScreen) && ANNOUNCEMENT.enable && (
        <Alert message={ANNOUNCEMENT.content} type='info' style={{ marginTop: iphoneScreen ? 20 : 0, marginBottom: ipadScreen ? 20 : 0 }} />
      )}
      {/* Switch对象，用于切换路由，包括article/archives/categories/about */}
      {props.children}
    </div>
  )
}

export default AppMain
