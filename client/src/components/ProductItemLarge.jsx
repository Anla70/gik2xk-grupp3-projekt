import PropTypes from 'prop-types';
import { } from 'react-router-dom';
function ProductItemLarge({product}) {
  return  (
  <>
  
  <h3>{product.title}</h3>
  <p>{product.body}</p>  
  <p>{product.price} kr</p>
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
    /* emptyProduct: PropTypes.string, */
    body: PropTypes.string,
    price: PropTypes.number,
    carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
  }).isRequired
};
export default ProductItemLarge;