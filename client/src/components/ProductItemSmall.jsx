// import Cart from './Cart';
import { Link } from 'react-router-dom';
import { } from 'react-router-dom';
/* import ProductList from './ProductList' */
import PropTypes from 'prop-types';

function ProductItemSmall({ product }) {
      
  return (
   <>
      <Link to={`/products/${product.id}`}>
   <h3>{product.title}</h3>
   </Link>
   <p>{product.body}</p>
   <p>{product.price} kr</p>
   </>

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






