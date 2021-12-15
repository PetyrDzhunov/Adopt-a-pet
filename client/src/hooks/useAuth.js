import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/auth';
import { getData } from '../utils/localStorage';

const useAuth = () => {
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const userData = getData();

	if (userData?.token && userData?.userId) {
		dispatch(login(userData.token, userData.userId));
	};

	return auth.isLoggedIn;
};

export default useAuth;