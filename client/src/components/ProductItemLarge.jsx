import PropTypes from 'prop-types';
import { } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
/* import { useState } from 'react'; */


function ProductItemLarge({product}) {
  const addToCart = addToCart;
  
  return  (
  <>
  
  <h3>{product.title}</h3>
  <p>{product.body}</p>  
  <p>{product.price} kr</p>

  <Button onClick ={addToCart} startIcon={<ShoppingCartIcon />}color="primary" aria-label="add to shopping cart">Lägg till i kundkorg</Button>
 
 
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