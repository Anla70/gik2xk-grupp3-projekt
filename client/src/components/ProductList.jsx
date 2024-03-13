import ProductItemSmall from "./ProductItemSmall";
import { getAll } from "../services/ProductService";
import { useEffect, useState } from "react";

function ProductList({ pathname }) {
	const [products, setProduct] = useState([]);

	useEffect(() => {
		getAll(pathname).then((products) => {
			setProduct(products);
		});
	}, [pathname]);
	return (
		<ul>
			{products?.length > 0 ? (
				products.map((product) => (
					<li key={`products_${product.id}`}>
						<ProductItemSmall product={product} />
					</li>
				))
			) : (
				<h3>Kunde inte hämta Produkt</h3>
			)}
		</ul>
	);
}

export default ProductList;
