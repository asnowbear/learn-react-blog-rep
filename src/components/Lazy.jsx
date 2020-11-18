import React, { Component } from 'react'

import { Spin, Icon } from 'antd'

const antIcon = <Icon type='loading' style={{ fontSize: 24 }} spin />

/**
 * 使用高阶组件包裹import组件，使其变成异步加载组件
 * Code Splitting with ES2015 的一种方式而已，相对落后
 * --------------------------------------
 * 在Suspense出来以后，该方式逐渐会被替换
 * 知乎上说的也会具有副作用，不能滥用
 * --------------------------------------
 * 使用 webpack 的 import 方法实现动态加载组件！dynamic import
 * @param {Function} importComponent - example const xx = asyncComponent(() => import('./xxx'))
 */
export const asyncComponent = importComponent =>
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = { component: null }
    }

    async componentDidMount() {
      // 执行组件，并异步等待
      const { default: component } = await importComponent()
      this.setState({ component })
    }

    render() {
      const RenderComponet = this.state.component
      // 条件渲染
      return RenderComponet ? (
        <RenderComponet {...this.props} />
      ) : (
        <Spin indicator={antIcon} className='async-com-loading' />
      )
    }
  }

export default asyncComponent
