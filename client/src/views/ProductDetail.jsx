import ProductItemLarge from "../components/ProductItemLarge";
import RatingForm from "../components/RatingForm";
import Rating from "../components/Rating";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
	const product = {
		id: 1,
		title: "tröja",
		description: "en röd tröja",
		imageUrl: "",
		price: 150,
		createdAt: "2024-03-13T09:11:20.000Z",
		updatedAt: "2024-03-13T09:11:20.000Z",
		carts: [],
		ratings: [],
	};

	const navigate = useNavigate();

	return (
		<div>
			<ProductItemLarge product={product} />
			<Button onClick={() => navigate(-1)}>Tillbaka</Button>
			<Button onClick={() => navigate(`/products/${product.id}/edit`)}>
				Ändra
			</Button>
			<RatingForm />
			{product.rating &&
				product.ratings.map((rating, i) => (
					<Rating key={`rating_${i}`} rating={rating} />
				))}
		</div>
	);
}

export default ProductDetail;
