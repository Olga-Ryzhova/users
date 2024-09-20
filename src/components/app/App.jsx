import List from '../List/List';
import Details from '../Details/Details';

import './app.css'
import { useState } from 'react';

const App = () => {
	const [selectedUser, setSelectedUser] = useState(null);

	const onSelectedUser = (user) => {
    setSelectedUser(user);
  };

	 return (
    <div className="container">
      <List onSelectedUser={onSelectedUser} /> 
      <Details userId={selectedUser} /> 
    </div>
  );
}

export default App;