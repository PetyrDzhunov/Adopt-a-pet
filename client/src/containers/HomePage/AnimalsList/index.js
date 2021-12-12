import { useHttp } from '../../../hooks/useHttp';
import { useState } from 'react';
import './AnimalsList.css';

const AnimalsList = () => {
	const [animals, setAnimals] = useState([]);
	const { isLoading, error, sendRequest, clearError } = useHttp();

	return (
		<ul>

		</ul>
	);
};

export default AnimalsList;



