import React, { Component } from 'react'
import { 
	Icon,
	Menu, 
} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class MainNav extends Component {

	render() {
		return (
			<Menu borderless fixed="top">
			  <Menu.Item name="Keystores">
			  	<NavLink exact to="/">
			  		<Icon name="key" />
			  		Keystores
		  		</NavLink>
			  </Menu.Item>	
			  <Menu.Item name="Config">
			  	<NavLink to="/config">
			  		<Icon name="wrench" />
			  		Config
		  		</NavLink>
			  </Menu.Item>	
			  <Menu.Item name="Dapplets">
			  	<NavLink exact to="/dapplets">
			  		<Icon name="code" />
			  		Dapplets
		  		</NavLink>
			  </Menu.Item>	
			</Menu>
		)
	}

}

export default MainNav
	