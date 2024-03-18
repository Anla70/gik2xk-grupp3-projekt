import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Paper,
	TextField,
	Typography,
	Rating,
	IconButton,
	Button,
} from "@mui/material";
import Cart from "./Cart";
/* import UserItemSmall from './UserItemSmall'; */
import { toDateTimeString } from "../common/formatHelpers";


import placeholderImage from "../assets/placeholder.png";
import { calculateAverageRating } from "../common/RatingHelp";
import React, { useState } from "react";
import { useCart } from "../common/CartContext";

function ProductItemLarge({ product }) {
  const { addToCart } = useCart();
	const [showNotification, setShowNotification] = useState(false);
	const [quantity, setQuantity] = useState(1); // Initial quantity
	console.log(quantity);
	console.log(addToCart);
  
	const addToCartHandler = (product) => {
		if (quantity === 0) {
			removeItemFromCart(product.id);
		} else {
			addToCart(product, quantity);
		}
	
		setShowNotification(true);

		// Simulate delay (optional)
		setTimeout(() => {
			setShowNotification(false);
		}, 2000);
	};
// Tillsammans med RatingHelp så räknar den ut medelvärdet för att visa upp det
	const averageRating = product ? calculateAverageRating(product.reviews) : 0;
	const handleQuantityChange = (event) => {
		const newQuantity = parseInt(event.target.value, 10);
		if (isNaN(newQuantity) || newQuantity < 1) {
			setQuantity(1); // Set minimum quantity to 1
		} else {
			setQuantity(newQuantity);
		}
	};
	return (
		<Paper sx={{ my: 4, p: 4, borderRadius: 2 }} elevation={3}>
			<Box>
				<Typography variant='h2'>{product.title}</Typography>
				<Typography>
					Produkten publicerades: {toDateTimeString(product.createdAt)}
				</Typography>
        {/* här har vi averageRating i en mui Rating för att få det via stjärnor, read-only för att man inte ska kunna trycka */}
				<Rating name='read-only' value={averageRating} readOnly />
			</Box>
			<Card elevation={0}>
				<CardMedia
					component='img'
          // Antingen en bild vi lagt in, om den inte kan hämtas så visas placeholdern
					image={product.imageUrl || placeholderImage}
				/>
				<CardContent>
        {product.carts &&
						product.carts.map((cart) => (
							<Cart key={`cart_${cart}`} text={cart} />
						))}
					<Typography variant='body1'>{product.body}</Typography>
					<Typography variant='body2'>{product.price} kr</Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
						<TextField
							label='Antal'
							type='number'
							value={quantity}
							onChange={handleQuantityChange}
							sx={{ width: 70, mr: 2 }}
							inputProps={{ min: 1 }} // Set minimum input value to 1
						/>
						<IconButton onClick={() => addToCartHandler(product)}>
							
							{/* Consider using a Shopping Cart icon or similar */}
							Lägg till i varukorgen
						</IconButton>
					</Box>

					{showNotification && (
						<p>{product.title} har lagts till i varukorgen!</p>
					)}

				</CardContent>
			</Card>
		</Paper>
	);
}

export default ProductItemLarge;