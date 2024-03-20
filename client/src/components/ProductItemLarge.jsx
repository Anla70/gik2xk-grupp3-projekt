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

ProductItemLarge.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 

    body: PropTypes.string,
    price: PropTypes.number,
    carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
  }).isRequired
};
export default ProductItemLarge;