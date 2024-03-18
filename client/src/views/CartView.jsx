// import React from "react";
import { useCart } from "../common/CartContext";
import {
	Box,
	Button,
	Table,
	TextField,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Avatar,
	TableRow,
	Typography,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
// import { setCartItems, removeItemFromCart } from "../common/CartContext";

function CartView() {
	const { cartItems } = useCart();
	const [quantity, setQuantity] = useState(1); // Initial quantity

	// const handleQuantityChange = (item, newQuantity) => {
	// 	setQuantity((newValue) => Math.max(0, Math.min(newValue, newQuantity))); // Set valid quantity range
	// 	const updatedCartItems = cartItems.map((cartItem) => {
	// 		if (cartItem.id === item.id) {
	// 			return { ...cartItem, quantity: newQuantity };
	// 		}
	// 		return cartItem;
	// 	});
	// 	// Now you can use setCartItems to update the cart items
	// 	setCartItems(updatedCartItems);
	// };

	const totalCost = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<Box>
			<Typography variant='h2'>Varukorg</Typography>

			{cartItems.length === 0 ? (
				<Typography variant='p'>Din varukorg är tom.</Typography>
			) : (
				<>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Bild</TableCell>
									<TableCell>Produktnamn</TableCell>
									<TableCell>Antal</TableCell>
									<TableCell>Pris</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{cartItems.map((item) => (
									<TableRow key={item.id}>
										<TableCell>
											<Avatar
												sx={{ width: 60, height: 60 }}
												variant='square'
												alt={item.title}
												src={item.imageUrl}
											/>
										</TableCell>

										<TableCell>{item.title}</TableCell>

										<TableCell>{item.quantity}</TableCell>
										
											
												{/* <TextField
													label='Antal'
													type='number'
													value={item.quantity} // Use item.quantity directly
													onChange={handleQuantityChange}
													sx={{ width: 70, mr: 2 }}
													inputProps={{ min: 0 }} // Set minimum input value to 1
												/> */}

												{/* <IconButton
													onClick={() => handleQuantityChange(item, quantity)}
												>
													
													Ta bort i varukorgen
												</IconButton> */}

										
									

										<TableCell>{item.price * item.quantity} kr</TableCell>

										{/* <IconButton onClick={() => removeItemFromCart(item.id)}>
											Ta bort
										</IconButton> */}

										<DeleteIcon />
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<br />
					<strong>Totalt: {totalCost} kr</strong>
				</>
			)}
		</Box>
	);
}

export default CartView;

/*
 */
