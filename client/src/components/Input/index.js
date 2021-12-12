import './Input.css';

const Input = (props) => {
	return (
		<>
			<label className='form-label' htmlFor={props.id}>{props.label}</label>
			<input className='form-input' type={props.type} id={props.id} name={props.name} placeholder={props.placeholder} value={props.value} defaultValue={props.defaultValue} />
		</>
	);
};

export default Input;
