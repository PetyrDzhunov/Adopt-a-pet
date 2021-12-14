import { useState } from 'react';

import Header from '../../components/Header';
import PageWrapper from '../../components/PageWrapper.js';
import Footer from '../../components/Footer';
import './Authentication.css';
import Button from '../../components/Button';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Paw from '../../components/Paw/Paw';
import PawList from './PawList';

const Authentication = () => {
	const [inLoginMode, setInLoginMode] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);

	const loginModeSwitchHandler = () => {
		setInLoginMode((prevLoginMode) => !prevLoginMode);
	};

	return (
		<PageWrapper>
			<Header />
			<PawList />
			<main>
				{!inLoginMode &&
					<LoginForm loginModeSwitchHandler={loginModeSwitchHandler} inLoginMode={inLoginMode} formIsValid={formIsValid} />
				}
				{inLoginMode &&
					<RegisterForm loginModeSwitchHandler={loginModeSwitchHandler} inLoginMode={inLoginMode} formIsValid={formIsValid} />
				}
			</main>


			<Footer><p>&copy; Petar Dzhunov</p></Footer>
		</PageWrapper >
	);
};

export default Authentication;
