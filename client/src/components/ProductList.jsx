import { getAll } from '../services/ProductService';
import ProductItemSmall from './ProductItemSmall';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Box,Grid} from "@mui/material";


function ProductList({pathname}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll(pathname).then((products) => {
      setProducts(products);
    });
  }, [pathname]);


	return (
		<>
      <Box sx={{ flexGrow: 1 }}>
				<ul>
				<Grid container spacing={{ xs: 2, sm:2, md: 3, lg:4 }} columns={{ xs: 4, sm: 4, md: 12,lg: 12}}>
						{products?.length > 0 ? (
							products.map((product) => (
								<Grid item xs={4} sm={4} md={4} lg={4} key={`product_${product.id}`}
								>
									<li>
										<ProductItemSmall product={product} />
									</li>
								</Grid>
							))
						) : (
							<h3>Kunde inte hämta produkt</h3>
						)}
					</Grid>
				</ul>
      </Box>
		</>
	);
}
ProductList.propTypes = {
  pathname: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    review: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
  })
};

export default ProductList;


