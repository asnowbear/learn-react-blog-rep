import { useEffect } from 'react'

export default function useMount(func) {
  // useEffect, 每轮render后都会执行
  useEffect(() => {
    typeof func === 'function' && func()
  }, [])
}
