import React from 'react'
import './Authentication.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import ValidationError from '../../components/ValidationError';
import { useHttp } from '../../hooks/useHttp';
import { setData } from '../../utils/localStorage';
import { BASE_API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../store/auth';
import { useDispatch } from 'react-redux';


const LoginForm = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, isLoading, clearError, sendRequest } = useHttp();
	const validationSchema = {
		email: Yup.string().email('Invalid email address.').required('Email is required.'),
		password: Yup.string().required('Password is required.').min(6, 'Password should be min 6 chars'),
	};


	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={Yup.object(validationSchema)}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					const { email, password } = values;
					const userData = { email, password };
					const loginNow = async () => {
						try {
							const responseData = await sendRequest(`${BASE_API_URL}/users/login`, 'POST', JSON.stringify(userData), { "Content-Type": "application/json" });
							dispatch(login({ ...userData, userId: responseData.userId, token: responseData.token })); // dispatch to my redux recuder 
							setData(responseData);
							navigate('/');
						} catch (err) {
							setTimeout(() => {
								clearError();
							}, 3000)
						};
					};
					loginNow();
					setSubmitting(false);
				}, 400);
			}}
		>
			<Form className='form'>

				<div className='form-control'>
					<label htmlFor="email">Email</label>
					<Field type="text" id="email" name="email" />
				</div>
				<ErrorMessage name="email" component={ValidationError} />

				<div className='form-control'>
					<label htmlFor="password">Password</label>
					<Field type="password" id="password" name="password" />
				</div>
				<ErrorMessage name="password" component={ValidationError} />

				<Button type="submit" className='primary-button--big'>{props.inLoginMode ? 'Sign in' : 'Sign up'}</Button>
				<hr style={{ width: '220px' }} />
				{error && <ValidationError>{error}</ValidationError>}
				<Button type='submit' onClick={props.loginModeSwitchHandler} className='primary-button--big'>{props.inLoginMode ? 'Switch to sign up' : 'Switch to sign in'}</Button>
			</Form>
		</Formik>
	);
};

export default LoginForm;
