import React from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PawList from '../AuthenticationPage/PawList';
import PageWrapper from '../../components/PageWrapper.js';
import CreateAnimalForm from './CreateAnimalForm';


const CreateAnimalPage = () => {
	return (
		<PageWrapper>
			<Header />
			<PawList additional />
			<CreateAnimalForm />
			<Footer><p>&copy; Petar Dzhunov</p></Footer>
		</PageWrapper>
	);
};

export default CreateAnimalPage;
