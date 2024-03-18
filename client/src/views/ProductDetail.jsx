import ProductItemLarge from "../components/ProductItemLarge";
import ReviewForm from "../components/ReviewForm";
import Review from "../components/Review";
import { calculateAverageRating } from '../common/RatingHelp';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, Box, Button, Container, List, Typography } from '@mui/material';
import { addReview, getOne } from '../services/ProductService';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';


function ProductDetail() {

	const { id } = useParams();
  const [product, setProduct] = useState(null);
	const navigate = useNavigate();
  const averageRating = product ? calculateAverageRating(product.reviews) : 0;
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]);

 
	function onReviewAdd(review) {
    addReview(product.id, review)
      .then((review) => getOne(id))
      .then((product) => setProduct(product));
  }

  function clearMessage() {
    window.history.replaceState({}, '');
  }
	
  return product ? (
    <>
      {message && open && (
        <Alert
          onClose={() => {
            setOpen(false);
            clearMessage();
          }}
          variant="filled"
          severity="success">
          {message}
        </Alert>
      )}
      <Container maxWidth="lg">
        <ProductItemLarge product={product} />
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ChevronLeftIcon />}
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}>
            Tillbaka
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => navigate(`/products/${product.id}/edit`)}>
            Ändra
          </Button>
        </Box>
        <Box>
          <Typography variant="h3">Review</Typography>
          <ReviewForm onSave={onReviewAdd} />
          {product.reviews && (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {product.reviews.map((review, i) => (
                <Review key={`review_${i}`} review={review} />
              ))}
            </List>
          )}
        </Box>
      </Container>
    </>
  ) : (
    <h3>Kunde inte hämta inlägg</h3>
  );
}

export default ProductDetail;

