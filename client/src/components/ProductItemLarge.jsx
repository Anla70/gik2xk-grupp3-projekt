import PropTypes from 'prop-types';
import { } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';

function ProductItemLarge({product}) {
  return  (
  <>
  
  <h3>{product.title}</h3>
  <p>{product.body}</p>  
  <p>{product.price} kr</p>

  <Button startIcon={<AddShoppingCartIcon />}color="primary" aria-label="add to shopping cart">
  </Button>
 
  </>
  
 );
}
// Vi har lagt till emptyProduct i propTypes  för att släcka id i ProductEdit.
ProductItemLarge.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
    //review: PropTypes.number,
    /* emptyProduct: PropTypes.string, */
    body: PropTypes.string,
    price: PropTypes.number,
    carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
  }).isRequired
};

export default ProductItemLarge;