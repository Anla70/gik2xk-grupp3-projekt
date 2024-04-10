import PropTypes from 'prop-types';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../services/CartService";
import { useState } from "react";
import { calculateAverageRating } from "../common/RatingHelp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate} from 'react-router-dom';
import {
	Button,
	TextField,
	Box,
	CardMedia,
	Paper,
	Typography,
	Rating,
} from "@mui/material";

function ProductItemLarge({product}) {
  const averageRating = product ? calculateAverageRating(product.reviews) : 0;
	const [amount, setAmount] = useState(1); // Startar med 1 produkt som standard
	const hardcodedCartId = 1; // Hårdkodat varukorgs-ID
	const userId = 1; // Hårdkodat användar-ID
	const navigate = useNavigate();

const handleAddToCart = async () => {
    try {
      await addToCart(hardcodedCartId, product.id, amount, userId);
      alert("Produkt tillagd i varukorgen!");
    } catch (error) {
      console.error("Could not add product to cart", error);
      alert("Produkten ligger redan i din varukorg.");
    }
};

	return (
		<Paper sx={{ my: 4, p: 4, borderRadius: 2, width: '600px' }} elevation={3}>
			<Box sx={{ mb: 2 }}>
				<Typography variant='h2'> {product.title} </Typography>
				<Rating name='read-only' value={averageRating} readOnly />
				
			</Box>
      <Box>

			<CardMedia
				sx={{ borderRadius: 2, maxWidth:'100%', height: 'auto'}}
				component='img'
				image={product.imageUrl}
			/>
			<Typography variant='body1'sx={{ marginTop: 4 }}> {product.body} </Typography>
			<Typography variant='p' gutterBottom> {product.price} kr</Typography>
			<Box sx={{ my: 4, p: 4, borderRadius: 2, width: '600px', height: 'auto'}}>
				<TextField
					label='Antal'
					type='number'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					size='small'
					sx={{ mb: 1, width: 1 / 6 }}
				/>
				<Button
					sx={{ ml: 1.5 }}
					onClick={handleAddToCart}
					startIcon={<AddShoppingCartIcon />}
					color='primary'
					>Lägg till i varukorgen
				</Button>
			</Box>

			<Button
        variant='contained'
        color='success'
        startIcon={<ChevronLeftIcon />}
        sx={{ mr: 2 }}
        onClick={() => navigate(-1)}
        >
        Tillbaka till butiken
      </Button>
      </Box>
		</Paper>
	);
}

// Vi har lagt till emptyProduct i propTypes  för att släcka id i ProductEdit.
ProductItemLarge.propTypes = {
  product: PropTypes.shape({
    reviews: PropTypes.arrayOf(PropTypes.shape({
	review: PropTypes.number,})).isRequired,
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
    body: PropTypes.string,
    price: PropTypes.number,
	//emptyProduct: PropTypes.object,
    carts: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default ProductItemLarge;

