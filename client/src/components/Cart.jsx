import { Chip } from "@mui/material";
import { Link } from "react-router-dom"; 
import PropTypes from 'prop-types';


function Cart({text}) {





  return (
		<Link to={`/carts/${text}/products`}>
			<Chip label={text}></Chip>
		</Link> 


);
}
Cart.propTypes = {
	text: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		imageUrl: PropTypes.string,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string, 
		body: PropTypes.string,
		price: PropTypes.number,
		carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
	}).isRequired
};
	


export default Cart;