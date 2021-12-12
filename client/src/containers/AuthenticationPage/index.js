import Header from '../../components/Header';
import PageWrapper from '../../components/PageWrapper.js';
import Footer from '../../components/Footer';
import './Authentication.css';
import Input from '../../components/Input';

const Authentication = () => {
	return (
		<PageWrapper>
			<Header />
			<form>
				<Input type="text" label="Email" id="email" name="email" />
			</form>
			<Footer><p>&copy; Petar Dzhunov</p></Footer>
		</PageWrapper>
	);
};

export default Authentication;
