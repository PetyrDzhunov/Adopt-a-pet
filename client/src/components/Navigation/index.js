import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = (props) => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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

					{isLoggedIn &&
						<>
							<li className='main-navigation__list-item'>
								<NavLink className={(navData) => navData.isActive ? "active main-navigation__link" : "main-navigation__link"} className="main-navigation__link" to='/create-animal'>Add animal</NavLink>
							</li>

							<li className='main-navigation__list-item'>
								<Link onClick={props.onLogout} to="/" className="main-navigation__link">Logout</Link>
							</li>
						</>
					}


					{!isLoggedIn &&
						<li className='main-navigation__list-item'>
							<NavLink className={(navData) => navData.isActive ? "active main-navigation__link" : "main-navigation__link"} className="main-navigation__link" to='/authenticate'>Authenticate</NavLink>
						</li>
					}


				</div>
			</ul>
		</nav>
	);
};

export default Navigation;
