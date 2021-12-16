import React from 'react'

const ImgPreview = (props) => {
	return (
		<img src={props.src} alt={props.alt} className="form-img__img-preview" />
	);
};

export default ImgPreview;
