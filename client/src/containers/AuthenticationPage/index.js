import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Header from '../../components/Header';
import PageWrapper from '../../components/PageWrapper.js';
import Footer from '../../components/Footer';
import './Authentication.css';
import Button from '../../components/Button';


const Authentication = () => {
	const [inLoginMode, setInLoginMode] = useState(false);

	const formik = useFormik({
		initialValues: { name: '', email: '', password: '', phoneNumber: '', facebookURL: '' },
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address.').required('Email is required.'),
			name: Yup.string().max(20, 'Name must be less than 20 chars.').required('Name is required.'),
			phoneNumber: Yup.string().required('Phone is required.').matches(/08[789]\d{7}/i, 'Invalid phone number!'),
			password: Yup.string().required('Password is required.').min(6, 'Password should be min 6 chars'),
			facebookURL: Yup.string().matches(/^[a-z]{8}.com\/[A-Za-z0-9]{1,}$/i, 'Invalid facebook link!')
		}),
		onSubmit: (values) => console.log(values),
	});

	const loginModeSwitchHandler = () => {
		setInLoginMode((prevLoginMode) => !prevLoginMode);
	};

	return (
		<PageWrapper>
			<Header />
			{!inLoginMode &&
				<form className='register-form' onSubmit={formik.handleSubmit}>

					<div className='form-control'>
						<label htmlFor="email">Email</label>
						<input type="email" id="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
					</div>

					{formik.touched.email && formik.errors.email ? <div style={{ color: "#E71D36" }}>{formik.errors.email}</div> : null}
					<div className='form-control'>
						<label htmlFor="name">Name</label>
						<input type="name" id="name" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
					</div>

					{formik.touched.name && formik.errors.name ? <div style={{ color: "#E71D36" }}>{formik.errors.name}</div> : null}


					<div className='form-control'>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
					</div>

					{formik.touched.password && formik.errors.password ? <div style={{ color: "#E71D36" }}>{formik.errors.password}</div> : null}


					<div className='form-control'>
						<label htmlFor="phoneNumber">Phone number</label>
						<input type="phoneNumber" id="phoneNumber" name="phoneNumber" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phoneNumber} />
					</div>

					{formik.touched.phoneNumber && formik.errors.phoneNumber ? <div style={{ color: "#E71D36" }}>{formik.errors.phoneNumber}</div> : null}

					<div className='form-control'>
						<label htmlFor="facebookURL">facebook URL</label>
						<input type="facebookURL" id="facebookURL" name="facebookURL" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.facebookURL} />
					</div>
					{formik.touched.facebookURL && formik.errors.facebookURL ? <div style={{ color: "#E71D36" }}>{formik.errors.facebookURL}</div> : null}

					<Button type="submit" className='primary-button--big'>{inLoginMode ? 'Sign in' : 'Sign up'}</Button>
					<hr style={{ width: '220px' }} />
					<Button type='submit' onClick={loginModeSwitchHandler} className='primary-button--big'>{inLoginMode ? 'Switch to sign up' : 'Switch to sign in'}</Button>
				</form>
			}
			{inLoginMode &&
				<form className='register-form' onSubmit={formik.handleSubmit}>

					<div className='form-control'>
						<label htmlFor="email">Email</label>
						<input type="email" id="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
					</div>
					{formik.touched.email && formik.errors.email ? <div style={{ color: "#E71D36" }}>{formik.errors.email}</div> : null}

					<div className='form-control'>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
					</div>
					{formik.touched.password && formik.errors.password ? <div style={{ color: "#E71D36" }}>{formik.errors.password}</div> : null}
					<Button type="submit" className='primary-button--big'>{inLoginMode ? 'Sign in' : 'Sign up'}</Button>
					<hr style={{ width: '220px' }} />
					<Button type='submit' onClick={loginModeSwitchHandler} className='primary-button--big'>{inLoginMode ? 'Switch to sign up' : 'Switch to sign in'}</Button>
				</form>}

			<Footer><p>&copy; Petar Dzhunov</p></Footer>
		</PageWrapper>
	);
};

export default Authentication;
