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


export async function getCartById(cartId) {
	try {
		const response = await axios.get(`/carts/${cartId}`);
		if (response.status === 200) {
			return response.data; 
		} else {
			console.log(response);
			return null; 
		}
	} catch (error) {
		console.error("Failed to fetch cart", error);
		throw error; 
	}
}

export async function addToCart(cartId, productId, amount) {
	try {
		const response = await axios.post("/carts/addProduct", {
      cartId: cartId,
      productId: productId,
      amount: amount,	
		});
		if (response.status === 200 || response.status === 201) {
			return response.data;
		} else {
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