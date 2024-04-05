import axios from './api';

export async function getAll() {
  try {
    const response = await axios.get('/carts');

    if (response.status === 200) return response.data;
    else {
      console.log(response);
      return [];
    }
  } catch (e) {
    e?.response ? console.log(e.response.data) : console.log(e);
  }
}


// export async function addToCart(userId, cart) {
//   try {
//     const response = await axios.post(`/carts/${userId}/addToCart`, cart);
//     if (response.status === 200) return response.data;
//     else {
//       console.log(response.data);
//       return null;
//     }
//   } catch (e) {
//     e?.response ? console.log(e.response.data) : console.log(e);
//   }
// }
// Function to fetch a specific cart by ID
export async function getCartById(cartId) {
	try {
		const response = await axios.get(`/carts/${cartId}`);
		if (response.status === 200) {
			return response.data; // Assuming the backend returns the cart data directly
		} else {
			console.log(response);
			return null; // Or handle this case as needed
		}
	} catch (error) {
		console.error("Failed to fetch cart", error);
		throw error; // Or return null, depending on how you want to handle errors
	}
}

export async function addToCart(cartId, productId, amount) {
	try {
		// Gör ett POST-anrop till din backend-tjänst för att lägga till en produkt i varukorgen
		const response = await axios.post("/carts/addProduct", {
      cartId: cartId,
      productId: productId,
      amount: amount,	
		});

		if (response.status === 200 || response.status === 201) {
			// Hantera framgångsrikt lägga till produkt
			return response.data;
		} else {
			// Hantera fel svar från servern
			throw new Error("Failed to add product to cart");
		}
	} catch (error) {
		console.error("Varan finns redan i din varukorg", error);
		throw error;
	}
}
export async function fetchCart(cartId) {
  return axios.get(`/carts/${cartId}`)
    .then(response => response.data)
    .catch(error => console.error("Failed to fetch cart:", error));
}