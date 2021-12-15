import React from 'react'
import './Forms.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import ValidationError from '../../components/ValidationError';
import { useDispatch, useSelector } from 'react-redux';
import { register, logout } from '../../store/auth';
import { useHttp } from '../../hooks/useHttp';
import { BASE_API_URL } from '../../constants';
import { setData } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';


const RegisterForm = (props) => {
	const navigate = useNavigate();

	const { isLoading, error, clearError, sendRequest } = useHttp();

	const validationSchema = {
		email: Yup.string().email('Invalid email address.').required('Email is required.'),
		name: Yup.string().max(20, 'Name must be less than 20 chars.').required('Name is required.'),
		phoneNumber: Yup.string().required('Phone is required.').matches(/08[789]\d{7}/i, 'Invalid phone number!'),
		password: Yup.string().required('Password is required.').min(6, 'Password should be min 6 chars'),
		facebookURL: Yup.string().matches(/^[a-z]{8}.com\/[A-Za-z0-9]{1,}$/i, 'Invalid facebook link!'),
	};

	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{ name: '', password: '', email: '', phoneNumber: '', facebookURL: '' }}
			validationSchema={Yup.object(validationSchema)}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					const { name, email, password, phoneNumber, facebookURL } = values;
					const userData = { name, email, password, phoneNumber, facebookURL };

					let responseData;
					const registerNow = async () => {
						try {
							responseData = await sendRequest(`${BASE_API_URL}/users/register`, 'POST', JSON.stringify({ userData }), { 'Content-type': 'application/json' });
							dispatch(register({ ...userData, userId: responseData.userId, token: responseData.token })); // dispatch to my redux recuder 
							setData(responseData); // setting the token,id,email to localStorage
							navigate('/'); // navigate go my home page
						} catch (err) {
							// different error-handling -> with useHttp hook we get an error state which we can use down in our component
							setTimeout(() => {
								clearError();
							}, 2000)
						};
					};
					registerNow();
					setSubmitting(false);
				}, 400);
			}}
		>
			<Form className='form'>

				<div className='form-control'>
					<label htmlFor="name">Name</label>
					<Field name="name" type="text" />
				</div>
				<ErrorMessage name="name" component={ValidationError} />

				<div className='form-control'>
					<label htmlFor="email">Email</label>
					<Field name="email" type="email" />
				</div>
				<ErrorMessage name="email" component={ValidationError} />


				<div className='form-control'>
					<label htmlFor="password">Password</label>
					<Field name="password" type="password" />
				</div>
				<ErrorMessage name="password" component={ValidationError} />


				<div className='form-control'>
					<label htmlFor="phoneNumber">Phone number</label>
					<Field type="phoneNumber" id="phoneNumber" name="phoneNumber" />
				</div>
				<ErrorMessage name="phoneNumber" component={ValidationError} />



				<div className='form-control'>
					<label htmlFor="facebookURL">facebook URL</label>
					<Field type="facebookURL" id="facebookURL" name="facebookURL" />
				</div>
				<ErrorMessage name="facebookURL" component={ValidationError} />


				<Button type="submit" disabled={props.formIsValid} className='primary-button--big'>{props.inLoginMode ? 'Sign in' : 'Sign up'}</Button>
				{error && <ValidationError margin="12px">{error}</ValidationError>}
				<hr style={{ width: '220px' }} />
				<Button type='submit' onClick={props.loginModeSwitchHandler} className='primary-button--big'>{props.inLoginMode ? 'Switch to sign up' : 'Switch to sign in'}</Button>
			</Form>
		</Formik>
	);
};

export default RegisterForm;
