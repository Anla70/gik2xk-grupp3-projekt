import { useEffect, useState } from "react";
import Cart from "./Cart";
import { getAll } from "../services/CartService";


function CartList() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    getAll().then((carts) => setCarts(carts));
  }, []);

	return (
		<ul>
			{carts?.length > 0 ? (
				carts.map((cart) => (
					<li key={cart.name}>
						<Cart text={cart.name} />
					</li>
				))
			) : (
				<h3>Kunde inte hämta kundkorg</h3>
			)}
		</ul>
	);
}

export default CartList;
