import ProductItemLarge from '../components/ProductItemLarge';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import RatingForm from '../components/RatingForm';
import Rating from '../components/Rating';
import {useState, useEffect} from 'react';
import { getOne } from '../services/ProductService';

function ProductDetail() {
const { id } = useParams();
const [product, setProduct] = useState(null);

useEffect(() => {
  getOne(id).then((product) => setProduct(product));
}, [id]);


  const navigate = useNavigate();

  // function onRatingAdd(rating) {
  //   addRating(product.id, rating)
  //   .then((product) => setProduct(product));
  // }

  return product ? (
    <div>
      <ProductItemLarge product={product} />
      <Button onClick={() => navigate(-1)}>Tillbaka</Button>
      <Button onClick={() => navigate(`/products/${product.id}/edit`)}> Ändra vara</Button>
   
      <RatingForm  />
      {product.ratings &&
        product.ratings.map((rating, i) => (
          <Rating key={`rating_${i}`} rating={rating} />
        ))}
    </div>
  ):(
    <h3>Kunde inte hämta produkten</h3>
  );
}

export default ProductDetail;