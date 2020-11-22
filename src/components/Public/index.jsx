import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// hooks
import useMount from '@/hooks/useMount'

// actions
import { getTagList, getCategoryList } from '@/redux/article/actions'

// components
import SignModal from '@/components/Public/SignModal'
import UploadModal from '@/components/Public/UploadModal'

/**
 * @component Public 公共组件，挂在在 APP.jsx 中，用于存放初始化的组件/方法 或者公用的 modal 等
 */
function PublicComponent(props) {
  const dispatch = useDispatch() // dispatch hooks

  // render后执行
  useMount(() => {
    dispatch(getTagList()) // 获取标签列表
    dispatch(getCategoryList())
  })

  return (
    // 空标签，是React.fragment的语法糖，不可见也不渲染
    <>
      {/* Empty components are self-closing */}
      <SignModal />
      <UploadModal />
    </>
  )
}

export default PublicComponent
