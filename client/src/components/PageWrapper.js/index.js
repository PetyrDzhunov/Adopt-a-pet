import './PageWrapper.css';

const PageWrapper = (props) => {
	return (
		<div className='page-wrapper'>
			<div className='content-wrap'>
				{props.children}
			</div>
		</div>
	);
};

export default PageWrapper;
