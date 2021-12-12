import React from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PageWrapper from '../../components/PageWrapper.js';
import Hero from './Hero/';
import AnimalsList from './AnimalsList';


const HomePage = () => {
	return (
		<PageWrapper>
			<Header />
			<Hero />
			<main>
				<AnimalsList />
			</main>
			<Footer><p>&copy; Petar Dzhunov</p></Footer>
		</PageWrapper>
	);
};

export default HomePage;
