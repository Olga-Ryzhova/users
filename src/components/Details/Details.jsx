import { useEffect, useState } from 'react';
import './details.css';
import Spinner from '../spinner/Spinner';

const Details = ({userId}) => {
  const [detail, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true); 

  useEffect(() => {
    if (userId) {
      // Проверяем, загружены ли уже данные для данного userId
      if (!detail.id || detail.id !== userId.id) {
        setLoading(true);
        fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${userId.id}.json`)
          .then(response => response.json())
          .then(result => {
            setDetails(result);
            setLoading(false);
            setIsImageLoading(true);
          })
          .catch(error => {
            console.error('Fetch error:', error);
            setLoading(false);
          });
      } else {
        setLoading(false); // Если данные уже загружены
      }
    } else {
      setDetails({});
      setLoading(false);
    }
  }, [userId, detail.id]);

  const handleImageLoad = () => {
    setIsImageLoading(false); // Изображение загружено
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="details-user"> 
     {isImageLoading && <Spinner />}
      <img className="user-avatar" 
        src={detail.avatar} 
        alt={detail.name}  
        onLoad={handleImageLoad} 
        style={isImageLoading ? { display: 'none' } : {}}
      />
      <div className="user-name">{detail.name}</div>
      <div className="user-city">City: {detail.details?.city}</div>
      <div className="user-company">Company: {detail.details?.company}</div>
      <div className="user-position">Position: {detail.details?.position}</div>
    </div>
  )
}

export default Details;