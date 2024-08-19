import React, { useState, useEffect } from 'react';

function CampaignVolunteers({id}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  let token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/show_Volunteer_participation/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data)
        setData(data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
    {data && data.length > 0 && ( 
      <div className='mb-5'>   
      <h2 className='mb-3'>متطوعي الحملة</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.first_name} {item.last_name}</li>
        ))}
      </ul>
      </div>
      )}
    </div>
  );
}

export default CampaignVolunteers;