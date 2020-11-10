import React, { useState } from 'react'

/**
 * ajax request with loading
*/
export default function useRequestLoading() {
  const [loading, setLoading] = useState(false)

  // 装饰器模式，将request对象包装成带有loading效果的组件
  function withLoading(request) {
    if (request instanceof Promise) {
      return new Promise((reslove, reject) => {
        setLoading(true)
        request.then(res => {
          reslove(res)
          setLoading(false)
        }).catch(e => {
          reject(e)
          setLoading(false)
        })
      })
    }
  }

  return [loading, withLoading]
}

