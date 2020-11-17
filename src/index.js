import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider as BusProvider } from '@/hooks/useBus'

// redux
import { Provider } from 'react-redux'
import store from '@/redux'

// styles
import '@/assets/icons/iconfont'
// 引用全局样式，其他模块无需再引入
import '@/styles/index.less'

ReactDOM.render(
  <BusProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </BusProvider>,
  document.getElementById('root')
)
