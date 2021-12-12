import Card from '../../../components/Card';
import './AnimalsItem.css';

const AnimalsItem = ({ animal }) => {
	return (
		<Card>
			<li className='animals-section-list__item'>
				<p>{animal.name}</p>
				<p>{animal.gender}</p>
				<p>{animal.species}</p>
				<p>{animal.neutered}</p>
			</li>
		</Card>
	);
};

export default AnimalsItem;
