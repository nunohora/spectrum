import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

import { 
	Icon,
	Menu, 
} from 'antd'

class MainNav extends Component {

	static propTypes = {
		location: PropTypes.object.isRequired,
	}

	render() {
		const { location } = this.props

		return (
			<Menu 
				mode="horizontal"
				theme="dark"
				selectedKeys={[location.pathname]}
			>
			  <Menu.Item key="/">
			  	<NavLink exact to="/" location={location}>
			  		<Icon type="key" />
			  		Keystores
		  		</NavLink>
			  </Menu.Item>	
			  <Menu.Item key="/config">
			  	<NavLink to="/config" location={location}>
			  		<Icon type="setting" />
			  		Config
		  		</NavLink>
			  </Menu.Item>	
			  <Menu.Item key="/dapplets">
			  	<NavLink to="/dapplets" location={location}>
			  		<Icon type="code" />
			  		Dapplets
		  		</NavLink>
			  </Menu.Item>	
			</Menu>
		)
	}

}

export default withRouter(MainNav)
	