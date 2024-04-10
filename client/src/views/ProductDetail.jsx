import ProductItemLarge from '../components/ProductItemLarge';
import ReviewForm from '../components/ReviewForm';
import Review from '../components/Review';
import { getOne, addReview } from '../services/ProductService';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Tooltip,
  Alert,
  Box,
  Container,
  Typography,
  List
} from '@mui/material';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getOne(id).then((product) => setProduct(product));
  }, [id]);

  const navigate = useNavigate();

  function onReviewAdd(review) {
    addReview(product.id, review)
      .then(() => getOne(id))
      .then((updatedProduct) => setProduct(updatedProduct));
  }
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);

  function clearMessage() {
    window.history.replaceState({}, "");
  }

  return product ? (
    <>
      {message && open && (
        <Alert
          onClose={() => {
            setOpen(false);
            clearMessage();
          }}
          variant='filled'
          severity='success'
        >
          {message}
        </Alert>
      )}

      <Container maxWidth='lg'>
        <Box display="flex" 
          flexDirection={{ xs: 'column', md: 'row' }} 
          justifyContent="center" 
          alignItems="flex-start" 
          gap={5}
        >
          <Box flex={1} display="flex" flexDirection="column" marginRight={{ md: 2 }}>
            <ProductItemLarge product={product} />
            <Box mt={2}>
              <Tooltip
                title='Endast admin kan ändra varan'
                componentsProps={{
                  tooltip: { sx: { fontSize: "1rem" } },
                }}
              >
                <Button
                  startIcon={<EditIcon />}
                  variant='contained'
                  onClick={() => navigate(`/products/${product.id}/edit`)}
                >
                  Ändra vara
                </Button>
              </Tooltip>
            </Box>
          </Box>
          <Box flex={1} marginLeft={{ md: 2 }} sx={{ marginTop: 5 }}>
            <Typography variant="h5" gutterBottom>Recension</Typography>
            <ReviewForm onSave={onReviewAdd} />
            <Typography variant="h5" sx={{ marginTop: 6 }}>Andras kunders recensioner</Typography>
            <Box sx={{ marginTop: 2 }}>
              {product.reviews && (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {product.reviews.map((review, i) => (
                    <Review key={`review_${i}`} review={review} />
                  ))}
                </List>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  ) : (
    <h3>Kunde inte hämta produkten</h3>
  );
}

export default ProductDetail;

