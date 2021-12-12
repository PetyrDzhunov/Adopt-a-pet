import Header from '../../components/Header';
import PageWrapper from '../../components/PageWrapper.js';
import Footer from '../../components/Footer';
import './Authentication.css';

const Authentication = () => {
	return (
		<PageWrapper>
			<Header />
			<form>
				<label htmlFor="">Email</label>
				<input type="text" />
			</form>
			<Footer><p>&copy; Petar Dzhunov</p></Footer>
		</PageWrapper>
	);
};

export default Authentication;
