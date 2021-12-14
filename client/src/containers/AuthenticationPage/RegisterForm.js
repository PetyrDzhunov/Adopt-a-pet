import React from 'react'
import './Authentication.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import ValidationError from './ValidationError';


const RegisterForm = (props) => {
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
					console.log(values);
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
				<Button type='submit' onClick={props.loginModeSwitchHandler} className='primary-button--big'>{props.inLoginMode ? 'Switch to sign up' : 'Switch to sign in'}</Button>
			</Form>
		</Formik>
	)
}

export default RegisterForm
