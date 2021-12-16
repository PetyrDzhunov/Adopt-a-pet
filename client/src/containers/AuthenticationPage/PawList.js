import Paw from "../../components/Paw/Paw";

const PawList = (props) => {

	return (
		<>
			{props.additional &&
				<>
					<Paw top="120px" />
					<Paw bottom="350px" left="155px" />
					<Paw bottom="325px" right="90px" />
					<Paw top="200px" right="200px" />
				</>
			}
			<Paw top="250px" left="300px" />
			<Paw bottom="200px" right="300px" />
			<Paw right="70px" top="100px" />
			<Paw left="50px" bottom="150px" />
		</>
	);
};

export default PawList;
