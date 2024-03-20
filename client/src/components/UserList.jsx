/* import List from 'react-router-dom'; */
import UserItemSmall from './UserItemSmall';
function UserList() {
const users = [
    {
        "id": 1,
        "email": "karkar@dummy.se",
        "password": "Karla",
        "firstName": "Karin",
        "lastName": "Karlsson",
        "createdAt": "2024-03-19T15:48:52.000Z",
        "updatedAt": "2024-03-20T10:27:38.000Z"
    },
    {
        "id": 2,
        "email": "annsve@dummy.se",
        "password": "AnnSve",
        "firstName": "Anna",
        "lastName": "Svensson",
        "createdAt": "2024-03-20T10:28:47.000Z",
        "updatedAt": "2024-03-20T10:28:47.000Z"
    },
    {
        "id": 3,
        "email": "larlar@dummy.se",
        "password": "LarLar",
        "firstName": "Lars",
        "lastName": "Larsson",
        "createdAt": "2024-03-20T10:29:28.000Z",
        "updatedAt": "2024-03-20T10:29:28.000Z"
    },
    {
        "id": 4,
        "email": "svesve@dummy.se",
        "password": "SveSve",
        "firstName": "Sven",
        "lastName": "Svensson",
        "createdAt": "2024-03-20T10:30:04.000Z",
        "updatedAt": "2024-03-20T10:30:04.000Z"
    }
]

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