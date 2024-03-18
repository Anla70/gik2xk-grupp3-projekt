import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
	return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	const addToCart = (product, quantity) => {
		setCartItems((currentItems) => {
			const itemExists = currentItems.find((item) => item.id === product.id);
			if (itemExists) {
				return currentItems.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item
				);
			} else {
				return [...currentItems, { ...product, quantity }];
			}
		});
	};
	const updateCartItemQuantity = (productId, newQuantity) => {
		// Validate newQuantity (optional):
		if (isNaN(newQuantity) || newQuantity < 1) {
			console.warn(
				"Invalid quantity. Quantity must be a number greater than or equal to 1."
			);
			return;
		}

		setCartItems((currentItems) =>
			currentItems.map((item) =>
				item.id === productId ? { ...item, quantity: newQuantity } : item
			)
		);
	};
	const removeItemFromCart = (productId) => {
		setCartItems((currentItems) =>
			currentItems.filter((item) => item.id !== productId)
		);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				setCartItems,
				addToCart,
				updateCartItemQuantity,
				removeItemFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
