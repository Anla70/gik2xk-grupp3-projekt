import ProductItemLarge from '../components/ProductItemLarge';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import Review from '../components/Review';
import {useState, useEffect} from 'react';
import { getOne,addReview } from '../services/ProductService';

function ProductDetail() {
const { id } = useParams();
const [product, setProduct] = useState(null);

useEffect(() => {
  getOne(id).then((product) => setProduct(product));
}, [id]);


  const navigate = useNavigate();

  function onReviewAdd(review) {
    addReview(product.id, review)
    .then(()=>getOne(id))
    .then((product) => setProduct(product));
   } 

  return product ? (
    <div>
      <ProductItemLarge product={product} />
      <Button onClick={() => navigate(-1)}>Tillbaka</Button>
      <Button onClick={() => navigate(`/products/${product.id}/edit`)}> Ändra vara</Button>
   
      <ReviewForm onSave = {onReviewAdd}  />
      <h2>Andras recensioner</h2>
      {product.reviews &&
        product.reviews.map((review, i) => (
          <Review key={`review_${i}`} review={review} />
        ))}
        
    </div>
  ):(
    <h3>Kunde inte hämta produkten</h3>
  );
}

export default ProductDetail;