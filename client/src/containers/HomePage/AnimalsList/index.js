import { useHttp } from '../../../hooks/useHttp';
import { useState, useEffect } from 'react';
import './AnimalsList.css';
import { BASE_API_URL } from '../../../constants';
import AnimalsItem from '../AnimalsItem';

const AnimalsList = () => {
	const [animals, setAnimals] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttp();

	useEffect(() => {
		const fetchAnimals = async () => {
			try {
				const animals = await sendRequest(BASE_API_URL + '/animals')
				setAnimals(animals);
			} catch (err) { }
		};
		fetchAnimals();

	}, [sendRequest])

	return (
		<section className='animals-section'>
			<ul className='animals-section-list'>
				{animals.map((animal) => <AnimalsItem key={animal._id} animal={animal} />)}
			</ul>
		</section>

	);
};

export default AnimalsList;



