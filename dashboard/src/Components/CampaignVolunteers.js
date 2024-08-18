import React, { useState, useEffect } from 'react';

function CampaignVolunteers({id}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/show_Volunteer_participation/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: 'Bearer 1|2zEOURbNmlwkf4YJ8lj6Q0AVcK9xkxdUwdGL1psQ4cbda026',
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
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Campaign Volunteers</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.first_name} {item.last_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignVolunteers;