import React from 'react'
import PropTypes from 'prop-types'
import './index.less'
// config
import { DISCUSS_AVATAR } from '@/config'

// components
import Href from '@/components/Href'
import { Avatar, Popover, Icon, Typography } from 'antd'
import SvgIcon from '@/components/SvgIcon'

const { Text, Title } = Typography

// react组件的特点是尽可能的细小
// 函数参数的结构赋值，一步到位，使用简单、轻妙
function AvatarComponent({ username, github, role }) {
  let avatarSrc = ''
  if (github && github.avatar_url) avatarSrc = github.avatar_url
  if (role === 1) avatarSrc = DISCUSS_AVATAR
  return <Avatar src={avatarSrc}>{username}</Avatar>
}

function AppAvatar(props) {
  const { role, username, github } = props.userInfo
  if (github && props.popoverVisible) {
    return (
      <Popover
        arrowPointAtCenter
        overlayClassName='avatar-popover'
        trigger='hover'
        // placement='right'
        placement='topLeft'
        title={
          github.bio ? (
            <>
              <Icon type='github' className='mr10' />
              {github.bio}
            </>
          ) : null
        }
        content={
          <div className='popover-content'>
            <Href href={github.html_url} className='popover-cotent-avatar'>
              <AvatarComponent role={role} github={github} username={username} />
            </Href>
            <ul className='github-info'>
              <li>
                {github.name ? (
                  <>
                    <span className='github-name'> {github.name}</span>
                    <Text type='secondary'>{github.login}</Text>
                  </>
                ) : (
                  <span className='github-name'> {github.login}</span>
                )}
              </li>

              {github.blog && (
                <li>
                  <Href href={github.blog}>
                    <SvgIcon type='iconblog2' className='mr10' />
                    <span>{github.blog}</span>
                  </Href>
                </li>
              )}

              {github.location && (
                <li>
                  <SvgIcon type='iconlocation' className='mr10' />
                  {github.location}
                </li>
              )}
            </ul>
          </div>
        }>
        <AvatarComponent role={role} github={github} username={username} />
        <span />
      </Popover>
    )
  } else {
    return <AvatarComponent role={role} github={github} username={username} />
  }
}

// props的类型
AppAvatar.propTypes = {
  userInfo: PropTypes.object.isRequired,
  popoverVisible: PropTypes.bool
}

// props的默认属性值
AppAvatar.defaultProps = {
  popoverVisible: true
}

export default AppAvatar
