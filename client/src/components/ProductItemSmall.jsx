// import Cart from './Cart';
import { Link } from 'react-router-dom';
import { } from 'react-router-dom';
/* import ProductList from './ProductList' */
import PropTypes from 'prop-types';
import {
	Card,
	CardMedia,
	CardHeader,
	CardContent,

	Typography,
} from "@mui/material";

function ProductItemSmall({ product }) {
      
  return (
		<Card variant='outlined' sx={{ mb: 4, ml:2 }}>
			<CardHeader
				title={
					<Typography variant='h3'>
						<Link to={`/products/${product.id}`}> {product.title}</Link>
					</Typography>
				}
			/>
	<CardContent>
			<CardMedia 
				// height="400"
				
				sx={{ borderRadius: 2  }}
				component='img'
				image={product.imageUrl}
			/>

		
				{" "}
				<Typography variant='body1'>{product.body} </Typography>
				<Typography variant='body2'>{product.price} kr </Typography>{" "}
			</CardContent>
		</Card>
	);
}

ProductItemSmall.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      imageUrl: PropTypes.string,
      //review: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string, 
      /* emptyProduct: PropTypes.string, */
      body: PropTypes.string,
      price: PropTypes.number,
      carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
    }).isRequired
};

export default ProductItemSmall;






