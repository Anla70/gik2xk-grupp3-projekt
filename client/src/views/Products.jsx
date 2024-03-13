import { useParams, useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';

function Products() {
  console.log(useParams(), useLocation());
  const location = useLocation();
  return <ProductList pathname={location.pathname} />;
}

export default Products;
