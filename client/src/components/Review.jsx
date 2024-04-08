import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Rating,Typography  } from '@mui/material';


function Review({review }) {
  return (
    <>
       <Link to={`/reviews/${review.id}`}></Link>   
      <Typography sx={{ my: 1, display: 'block' }}
              color="text.primary"
              variant="h4"
              component="span">{review.title}
              </Typography>
  
              <Rating name="read-only" value={review.review} readOnly /> 
    <Typography
              color="text.secondary"
              variant="body1"
              component="span"
              sx={{ display: 'block' }}>
              {review.body}
            </Typography>
    </>
  );
}

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    rating: PropTypes.number,
    review: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
  }).isRequired
};

  
export default Review;