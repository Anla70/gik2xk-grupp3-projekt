import { getAll } from '../services/ProductService';
import ProductItemSmall from './ProductItemSmall';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProductList({pathname}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll(pathname).then((products) => {
      setProducts(products);
    });
  }, [pathname]);


  return  (
    <ul>
      {products?.length > 0 ? (
        products.map((product) => (
          <li key={`products_${product.id}`}>
            <ProductItemSmall product={product} />
          </li>
        ))
      ) : (
        <h3>Kunde inte hämta produkt</h3>
      )}
    </ul>

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


