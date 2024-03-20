import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserList from './UserList';

function Rating({rating }) {
  return (
    <>
       <Link to={`/ratings/${rating.id}`}>
    <h3>{rating.title}</h3>
    </Link>
    
    <p>Skrivet av: {UserList.id}</p>
      <p>{rating.body}</p>
 
 
      
    </>
  );
}

Rating.propTypes = {
  rating: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    review: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
  }).isRequired
};

export default Rating;