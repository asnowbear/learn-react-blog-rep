import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { calcCommentsCount } from '@/utils'

// components
import { Divider } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import ArticleTag from '@/components/ArticleTag'

// react子组件竟然可以使用父组件的样式

const ArticleList = props => {
  const history = useHistory()
  const { list } = props

  // 使用history进入对应的文章
  function jumpTo(id) {
    history.push(`/article/${id}`)
  }

  return (
    // app-home-list使用父组件的样式
    <ul className='app-home-list'>
      {list.map(item => (
        <li key={item.id} className='app-home-list-item'>
          {/* 文章标题 */}
          <Divider orientation='left'>
            {/* 文章标题 */}
            <span className='title' onClick={() => jumpTo(item.id)}>
              {item.title}
            </span>
            {/* 文章日期 */}
            <span className='posted-time'>{item.createdAt.slice(0, 10)}</span>
          </Divider>

          <div
            onClick={() => jumpTo(item.id)}
            className='article-detail content'
            // dangerouslySetInnerHTML为react的一个标签属性，可以插入html片段
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          <div className='list-item-others'>
            <SvgIcon type='iconcomment' />
            <span style={{ marginRight: 5 }}> {calcCommentsCount(item.comments)}</span>

            <SvgIcon type='iconview' style={{ marginRight: 5 }} />
            <span>{item.viewCount}</span>

            <ArticleTag tagList={item.tags} categoryList={item.categories} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ArticleList
