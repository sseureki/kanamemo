
import React, { Component } from 'react';
import Link from 'react-router/Link';

const NavLink = ({ to, children }) => {
	return (
		<Link to={to}>{
			({isActive, location, href, onClick, transition}) => (
				<li className={`nav-item${isActive ? ' active' : ''}`}>
					<a className="nav-link" href={href} onClick={onClick}>
						{children} {isActive && (<span className="sr-only">(current)</span>)}
					</a>
				</li>
			)}
		</Link>
	);
};

class NavBar extends Component {
	render(){
		return (
			<nav className="navbar navbar-toggleable-sm navbar-light bg-faded mb-2">
				<button className="navbar-toggler navbar-toggler-right" type="button" 
					data-toggle="collapse" 
					data-target="#navbarNav" 
					aria-controls="navbarNav" 
					aria-expanded="false" 
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				
				<div className="container">
					<Link className="navbar-brand" to="/">Kanamemo</Link>
					
					<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
						<ul className="navbar-nav">
							<NavLink to="/settings">Settings</NavLink>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default NavBar;