import { useEffect, useState } from 'react';
import './list.css';
import Spinner from '../spinner/Spinner';

const List = ({onSelectedUser}) => {

  const [users, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json')
    .then(response => response.json())
    .then(result => {
      setUsersList(result);
      setLoading(false); 
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setLoading(false); 
    })
  }, [])

  if (loading) {
    return <Spinner />;
  }
  return (
    <ul className="list-items">
      {users.map(item => {
        return (
          <li 
              className="item" 
              key={item.id}
              onClick={() => onSelectedUser({id: item.id, name: item.name })}>
            <div className="item-name">{item.name}</div>
          </li>
        )
      })}
    </ul>
  )
}

export default List;