import './Header.css';
import Navigation from '../Navigation';
import Logo from '../Navigation/Logo';
import { logout } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { removeData } from '../../utils/localStorage';


const Header = () => {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(logout());
		removeData();
	};

	return (
		<header className='main-header'>
			<Logo />
			<Navigation onLogout={logoutHandler} />
		</header>
	);
};

export default Header;
