import ProductItemLarge from '../components/ProductItemLarge';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RatingForm from '../components/RatingForm';
import Rating from '../components/Rating';

function ProductDetail() {


  const product ={
    
    "id": 1,
    "title": "Ett stilla hav",
    "body": "Naturposter: Ett stilla hav med solnedgång. Storlek: 50 x 70 cm.",
    "imageUrl": "http://bild1.com",
    "price": 550,
    "createdAt": "2024-03-18T17:34:22.000Z",
    "updatedAt": "2024-03-19T08:46:45.000Z",
    "carts": [],
    "reviews": []
};


  const navigate = useNavigate();

  return (
    <div>
      <ProductItemLarge product={product} />
      <Button onClick={() => navigate(-1)}>Tillbaka</Button>
      <Button onClick={() => navigate(`/products/${product.id}/edit`)}>Ändra</Button>
      <RatingForm />
      {product.ratings &&
        product.ratings.map((rating, i) => (
          <Rating key={`rating_${i}`} rating={rating} />
        ))}
    </div>
  );
}

export default ProductDetail;