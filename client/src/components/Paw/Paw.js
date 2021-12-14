import './Paw.css';

const Paw = (props) => {
	return (
		<div className='paw-wrapper'
			style={{
				top: `${props.top}`,
				bottom: `${props.bottom}`,
				left: `${props.left}`,
				right: `${props.right}`
			}}>
			<div className="paw">
				<div className="inner"></div>
				<div className="bottom"></div>
			</div>
		</div>
	);
};

export default Paw;
