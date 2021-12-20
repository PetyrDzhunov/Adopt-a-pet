import React, { useState } from 'react';

import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import ValidationError from '../../components/ValidationError';
import ImgPreview from '../../components/ImgPreview';
import placeholder from '../../assets/images/placeholder.jpg';
import { useHttp } from '../../hooks/useHttp';
import { useSelector } from 'react-redux';
import { BASE_API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';

import '../../components/ImgPreview/ImgPreview.css';
import '../AuthenticationPage/Forms.css';



const validationSchema = {
	name: Yup.string().max(20, 'Name must be less than 20 chars.').required('Name is required.'),
	age: Yup.number().required('Age is required.').max(25, 'Maximum age is 25'),
	description: Yup.string().max(100, 'Maximum 100 characaters for description')
};


const CreateAnimalForm = () => {
	const navigate = useNavigate();

	const token = useSelector(state => state.auth.token);
	const { clearError, error, isLoading, sendRequest } = useHttp();

	const [{ alt, src, file }, setImg] = useState({
		src: placeholder,
		alt: 'Upload an Image',
		file: null
	});

	const handleImg = (e) => {
		if (e.target.files[0]) {
			setImg({
				src: URL.createObjectURL(e.target.files[0]),
				alt: e.target.files[0].name,
				file: e.target.files[0],
			});
		};
	};

	return (
		<Formik
			initialValues={{ name: '', gender: 'male', age: 0, neutered: 'no', species: 'dog', file: '' }}
			validationSchema={Yup.object(validationSchema)}
			onSubmit={(values, { setSubmitting }) => {

				values.age = Number(values.age);
				const createPet = async () => {
					try {
						const createdAnimal = await sendRequest(`${BASE_API_URL}/animals`, 'POST', JSON.stringify(values), {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`
						});

						const storageRef = app.storage().ref();
						const fileRef = storageRef.child(file.name);
						fileRef.put(file)
							.then(() => {
								console.log('Uploaded a file!');
								navigate('/')

							});
					} catch (err) {
						// if unable to be created show the error
						console.log(err);
						console.log(error);
						setTimeout(() => {
							clearError();
						}, 2000);
					};
				};
				createPet();
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
					<ImgPreview src={src} alt={alt} />
					<label htmlFor="image">Image</label>
					<input id="file" accept='.png, .jpg, .jpeg' name="file" type="file" onChange={handleImg} />
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
							<option value="no">no</option>
							<option value="yes">yes</option>
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
	)
}

export default CreateAnimalForm
