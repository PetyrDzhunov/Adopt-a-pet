import './Header.css';
import Navigation from '../Navigation';
import Logo from '../Navigation/Logo';

const Header = () => {
	return (
		<header className='main-header'>
			<Logo />
			<Navigation />
		</header>
	);
};

export default Header;
