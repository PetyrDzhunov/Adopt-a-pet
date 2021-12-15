import React from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import ValidationError from '../../components/ValidationError';

import '../AuthenticationPage/Forms.css';
import PawList from '../AuthenticationPage/PawList';

const validationSchema = {
	name: Yup.string().max(20, 'Name must be less than 20 chars.').required('Name is required.'),
	age: Yup.number().required('Age is required.').max(25, 'Maximum age is 25'),
	description: Yup.string().max(100, 'Maximum 100 characaters for description')
};


const CreateAnimalPage = () => {
	return (
		<>
			<Header />
			<PawList />
			<Formik
				initialValues={{ name: '', gender: '', age: '', neutered: '', species: '', }}
				validationSchema={Yup.object(validationSchema)}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
					setSubmitting(false);

				}}
			>
				<Form className='form'>
					<div className='form-control'>
						<label htmlFor="name">Name</label>
						<Field name="name" type="text" />
					</div>
					<ErrorMessage name="name" component={ValidationError} />

					<div className='form-control'>
						<label htmlFor="description">Description</label>
						<Field resize="none" name="description" as="textarea" />
					</div>
					<ErrorMessage name="description" component={ValidationError} />


					<div className='form-control'>
						<label htmlFor="age">Age</label>
						<Field name="age" type="number" />
					</div>
					<ErrorMessage name="age" component={ValidationError} />

					<div className='form-control'>
						<label htmlFor="image">Age</label>
						<Field name="image" type="file" />
					</div>
					<ErrorMessage name="image" component={ValidationError} />


					<div className='form-control-select'>
						<div className='form-control'>
							<label htmlFor="gender">Gender</label>
							<Field name="gender" as="select">
								<option value="male">male</option>
								<option value="female">female</option>
							</Field>
						</div>

						<div className="form-control">
							<label htmlFor="neutered">Neutered</label>
							<Field name="neutered" as="select">
								<option value="yes">yes</option>
								<option value="no">no</option>
							</Field>
						</div>
					</div>

					<div className='form-control'>
						<label htmlFor="species">Species</label>
						<Field name="species" as="select">
							<option value="dog">dog</option>
							<option value="cat">cat</option>
						</Field>
					</div>
					<hr style={{ width: '220px' }} />
					<Button type="submit" className='primary-button--big'>Add</Button>
				</Form>

			</Formik>
			<Footer />
		</>
	);
};

export default CreateAnimalPage;
