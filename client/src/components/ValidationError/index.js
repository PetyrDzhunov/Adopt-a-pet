import React from 'react'

const ValidationError = (props) => {
	return (
		<span style={{ color: '#CC2936', margin: props.margin }}>{props.children}</span>
	);
};

export default ValidationError;
