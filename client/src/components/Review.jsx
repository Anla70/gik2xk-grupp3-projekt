import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserList from './UserList';

// **** Vi har ändrat till review istället för revi
function Review({review }) {
  return (
    <>
       <Link to={`/reviews/${review.id}`}>
    <h3>{review.title}</h3>
    </Link>    
    <p>Skrivet av: {UserList.id}</p>
      <p>{review.body}</p>
 
 
      
    </>
  );
}

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    review: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
  }).isRequired
};

  
export default Review;