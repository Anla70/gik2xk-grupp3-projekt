/* import List from 'react-router-dom'; */
import { getAll } from '../services/UserService';
import { useEffect, useState } from 'react';
import UserItemSmall from './UserItemSmall';
function UserList() {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll().then((users) => setUsers(users));
  }, []);

    return  (
    
    <ul>
      {users?.length > 0 ? (
        users.map((user) => (
          <li key={`users_${user.id}`}>
            <UserItemSmall user={user} />
          </li>
        ))
      ) : (
        <h3>Kunde inte hämta användare</h3>
      )}
    </ul>
  
);
}

export default UserList;