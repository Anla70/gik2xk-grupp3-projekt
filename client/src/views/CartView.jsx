import { useEffect, useState } from "react";
import { fetchCart } from "../services/CartService";
import { Button, Box, Typography, List, Paper } from "@mui/material/";
import { grey } from "@mui/material/colors";

function CartView() {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const fetchAndSetCartItems = async () => {
			try {
				const userId = 1; // Exempelanvändar-ID, anpassa efter dina behov
				const fetchedCartItems = await fetchCart(userId);
				console.log("Fetched Cart Items:", fetchedCartItems); // Logga för att inspektera strukturen
				if (fetchedCartItems.length > 0) {
					setCartItems(fetchedCartItems[0].products || []); // Antag att första objektet innehåller en 'products'-nyckel
				}
			} catch (error) {
				console.error("Failed to fetch cart items:", error);
			}
		};
		fetchAndSetCartItems();
	}, []);

	function calculateTotal(cartItems) {
		return cartItems.reduce(
			(total, item) => total + (item.cartRow?.amount || 1) * (item.price || 0),
			0
		);
	}
	function handleCheckout() {
		alert("Din beställning är skickad!");
	}
	return (
		<Paper sx={{ mt: 4, borderRadius: 1 }} elevation={3}>
			<Box sx={{ m: 2 }}>
				<Typography variant='h2'> Din kundvagn </Typography>
			</Box>
			<Box sx={{ m: 2 }}>
				{cartItems.map((item, index) => (
					<List
						sx={{ mb: 1, borderBottom: `1px solid ${grey[300]}` }}
						key={index}
					>
						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<img
								src={item.imageUrl}
								alt={"Produktbild saknas"}
								style={{ width: "100px", height: "auto" }}
							/>

							<Typography variant='body1'>
								Vara: {item.title || "Produktnamn saknas"}, Pris:{" "}
								{item.price || 0} kr, Antal: {item.cartRow?.amount || 1},
								Totalt: {(item.cartRow?.amount || 1) * (item.price || 0)} kr
							</Typography>
						</Box>
					</List>
				))}
			</Box>
			<Box
				sx={{ display: "flex", justifyContent: "space-between", mt: 2, pb: 1 }}
			>
				<Button
					sx={{ ml: 2 }}
					variant='contained'
					color='primary'
					onClick={handleCheckout}
				>
					Skicka beställning
				</Button>
				<Typography sx={{ mr: 2 }} variant='h6'>
					Totalt: {calculateTotal(cartItems)} kr
				</Typography>
			</Box>
		</Paper>
	);
}

export default CartView;