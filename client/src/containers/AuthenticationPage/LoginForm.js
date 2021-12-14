import React from 'react'
import './Authentication.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import ValidationError from './ValidationError';



const LoginForm = (props) => {
	const validationSchema = {
		email: Yup.string().email('Invalid email address.').required('Email is required.'),
		name: Yup.string().max(20, 'Name must be less than 20 chars.').required('Name is required.'),
		phoneNumber: Yup.string().required('Phone is required.').matches(/08[789]\d{7}/i, 'Invalid phone number!'),
		password: Yup.string().required('Password is required.').min(6, 'Password should be min 6 chars'),
		facebookURL: Yup.string().matches(/^[a-z]{8}.com\/[A-Za-z0-9]{1,}$/i, 'Invalid facebook link!'),
	};


	return (
		<Formik
			initialValues={{ name: '', password: '', email: '', phoneNumber: '', facebookURL: '' }}
			validationSchema={Yup.object(validationSchema)}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					console.log(values);
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
				<hr style={{ width: '220px' }} />
				<Button type='submit' onClick={props.loginModeSwitchHandler} className='primary-button--big'>{props.inLoginMode ? 'Switch to sign up' : 'Switch to sign in'}</Button>
			</Form>
		</Formik>
	);
};

export default LoginForm;
