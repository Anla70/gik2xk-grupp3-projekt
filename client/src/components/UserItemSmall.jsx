import PropTypes from 'prop-types';
import UserList from './UserList';
import { Link } from 'react-router-dom';

function UserItemSmall({user}) {
  return (
    <>
    <Link to={`/users/${user.id}/products`}>
      <h3>{UserList.user.id}</h3>
       
    </Link>
  </>

  );  

}
UserItemSmall.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    password: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired
};
export default UserItemSmall;