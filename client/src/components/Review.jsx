import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Rating,Typography  } from '@mui/material';
// import UserList from './UserList';


// **** Vi har ändrat till review istället för revi
function Review({review }) {
  return (

    
    <>
   
       <Link to={`/reviews/${review.id}`}></Link>   

<Typography sx={{ my: 1, display: 'block' }}
              color="text.primary"
              variant="h4"
              component="span">{review.title}
              {/* <Rating name="read-only" value={review.review} readOnly />  */}
              </Typography>
  
              <Rating name="read-only" value={review.review} readOnly /> 
    {/* <p>Skrivet av: {UserList.id}</p> */}
    <Typography
              color="text.secondary"
              variant="body1"
              component="span"
              sx={{ display: 'block' }}>
              {review.body}
            </Typography>
     
      {/* <Rating name="read-only" value={review.review} readOnly />  */}
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