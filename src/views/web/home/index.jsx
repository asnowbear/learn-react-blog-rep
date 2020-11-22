import React, { useMemo } from 'react'
import './index.less'

import { decodeQuery, translateMarkdown } from '@/utils'
import { HOME_PAGESIZE } from '@/utils/config'

// components
// 注意，这两个组件并没有往component上放，本组件为Home模块的私用组件
// 如果发现，多个模板公用一个组件，则必须上升到compoment包下
import QuickLink from './QuickLink'
import ArticleList from './List'

import { Empty, Spin } from 'antd'
import Pagination from '@/components/Pagination'

// hooks
import useFetchList from '@/hooks/useFetchList'

const Home = props => {
  // 获取article列表
  const { loading, pagination, dataList } = useFetchList({
    requestUrl: '/article/list',
    queryParams: { pageSize: HOME_PAGESIZE },
    fetchDependence: [props.location.search]
  })

  // useMemo可以更换成useCallback的方式（去掉return）
  // 这里只有dataList发生变化（还有其他变化）后才会引起函数计算
  // 函数计算得到新值传给ArticleList子组件，ArticleList
  // 组件才会更新
  // 类似Vue中的props，或者计算属性
  const list = useMemo(() => {
    return [...dataList].map(item => {
      const index = item.content.indexOf('<!--more-->')
      item.content = translateMarkdown(item.content.slice(0, index))
      return item
    })
  }, [dataList])

  const { keyword } = decodeQuery(props.location.search)

  return (
    <Spin tip='Loading...' spinning={loading}>
      <div className='app-home'>
        {/* list  */}
        <ArticleList list={list} />

        {/* quick link */}
        <QuickLink list={list} />

        {/* serach empty result */}
        {list.length === 0 && keyword && (
          <div className='no-data'>
            <Empty description={(
              <span>
                不存在标题/内容中含有 <span className='keyword'>{keyword}</span> 的文章！
              </span>
            )} />
          </div>
        )}

        <Pagination
          {...pagination}
          onChange={
            page => {
              document.querySelector('.app-main').scrollTop = 0 // turn to the top
              pagination.onChange(page)
            }
          } />
      </div>
    </Spin>
  )
}

export default Home
