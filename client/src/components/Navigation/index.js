import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
	return (
		<nav className='main-navigation'>
			<ul className='main-navigation__list'>
				<div className='main-navigation__navLinks'>
					<li className='main-navigation__list-item'>
						<NavLink className={(navData) => navData.isActive ? "active main-navigation__link" : "main-navigation__link"} className="main-navigation__link" to='/'>All pets</NavLink>
					</li>
					<li className='main-navigation__list-item'>
						<NavLink className={(navData) => navData.isActive ? "active main-navigation__link" : "main-navigation__link"} className="main-navigation__link" to='/cats'>Cats</NavLink>
					</li>
					<li className='main-navigation__list-item'>
						<NavLink className={(navData) => navData.isActive ? "active main-navigation__link" : "main-navigation__link"} className="main-navigation__link" to='/dogs'>Dogs</NavLink>
					</li>
				</div>
			</ul>
		</nav>
	);
};

export default Navigation;