import { Link } from 'react-router-dom';
import { } from 'react-router-dom';
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
		<Card variant='outlined' 	
			sx={{
			height: "450px"
			}} >
			<CardHeader
				title={
					<Typography variant='h4'>
						<Link to={`/products/${product.id}`}> {product.title}</Link>
					</Typography>
				}
			/>
		<CardContent>
			<CardMedia 
				height="200"
				sx={{ borderRadius: 2  }}
				component='img'
				image={product.imageUrl}
				alt={`Bild till ${product.title}`}
			/>
				{" "}
				<Typography variant='body1'my={2}>{product.body} </Typography>
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
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string, 
      body: PropTypes.string,
      price: PropTypes.number,
      carts: PropTypes.arrayOf(PropTypes.string) 
    }).isRequired
};

export default ProductItemSmall;






