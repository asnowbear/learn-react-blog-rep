import React from 'react'
import PropTypes from 'prop-types'

// iconfont svg
// function模式创建react组件
// 定义一个SvgIcon组件
const SvgIcon = props => {
  return (
    // className方式和style方式都支持
    <svg className={`svg-icon ${props.className}`} aria-hidden='true' style={props.style}>
      <use xlinkHref={`#${props.type}`} />
    </svg>
  )
}

SvgIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string
}

SvgIcon.defaultProps = {
  className: ''
}

export default SvgIcon
