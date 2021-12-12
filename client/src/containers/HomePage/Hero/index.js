import './Hero.css';

const Hero = () => {
	return (
		<section className='hero-page'>
			<p>Adopt today, save a life!</p>

			<div className='img-wrapper'>
				<img className='first-image' src="https://wallup.net/wp-content/uploads/2016/12/08/98372-dog-kittens.jpg" alt="cute-dog&cat" />
			</div>

			<div className='img-wrapper'>
				<img className='second-image' src="https://i.pinimg.com/originals/44/d9/8c/44d98cccb725fd3a80c0446b9b2e646d.jpg" alt="cute-dog&cat" />
			</div>

		</section>
	);
};

export default Hero;
