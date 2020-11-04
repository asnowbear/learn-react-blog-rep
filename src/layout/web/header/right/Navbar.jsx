import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, useLocation } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import navList from './navList'

function NavBar(props) {
  const location = useLocation()
  const { mode = 'horizontal' } = props
  return (
    <Menu mode={mode} selectedKeys={[location.pathname]} className='header-nav'>
      {/* react是以Array.map的形式遍历，和vue的v-for一致 */}
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} />}
            <span className='nav-text'>{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default NavBar
