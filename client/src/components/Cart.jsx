import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

function Cart({ text }) {
	return (
		<Link to={`/carts/${text}/products`}>
			<Chip label={text}></Chip>
		</Link>
	);
}

export default Cart;
