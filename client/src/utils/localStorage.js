export const setData = (data) => {
	localStorage.setItem('userData', JSON.stringify(data));
};

export const getData = () => {
	return JSON.parse(localStorage.getItem('userData'));
};

export const removeData = () => {
	localStorage.removeItem('userData');
};