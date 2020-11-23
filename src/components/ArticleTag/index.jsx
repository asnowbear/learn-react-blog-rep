import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Icon, Tag, Divider } from 'antd'
import SvgIcon from '@/components/SvgIcon'

function getColor(name, colorList) {
  const target = colorList.find(c => c.name === name)
  return target ? target.color : ''
}

// 关于Link的解读：
// -------------------------------
// Link是React内部使用路由跳转的，会被react渲染成<a/>（超链接）
// Link是react实现路由跳转的常用手段之一，主要使用在Jsx中

// 无状态组件
// home和article均在使用该组件
const ArticleTag = props => {
  const tagColorList = useSelector(state => state.article.tagList) // 相当于 connect(state => state.article.tagList)(ArticleTag)
  const { tagList, categoryList } = props

  return (
    <>
      {/* tag-ui */}
      {tagList.length > 0 && (
        // 一般判断条件内都内置一个<>
        <>
          <Divider type='vertical' style={{ marginRight: 7 }} />
          <SvgIcon type='icontags' style={{ marginRight: 7 }} />
          {tagList.map((tag, i) => (
            <Tag key={i} color={getColor(tag.name, tagColorList)}>
              {/* 使用Link方式跳入，不一定使用 */}
              <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
            </Tag>
          ))}
        </>
      )}
      {/* 分类-ui */}
      {categoryList.length > 0 && (
        <>
          <Divider type='vertical' style={{ marginRight: 7 }} />
          <Icon type='folder' style={{ marginRight: 7 }} />
          {categoryList.map((cate, i) => (
            <Tag key={i} color='#2db7f5'>
              <Link to={`/categories/${cate.name}`}>{cate.name}</Link>
            </Tag>
          ))}
        </>
      )}
    </>
  )
}

ArticleTag.propTypes = {
  tagList: PropTypes.array.isRequired,
  categoryList: PropTypes.array.isRequired
}

export default withRouter(ArticleTag)
