import React, { useState, useEffect } from 'react';
import CampaignTable from '../Campaings/CampaignTable';

function ShowPrograms({refresh}) {
  const [programs, setPrograms] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);

  let token = localStorage.getItem('token')

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/index_program', {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const filteredData = data.data.map((item) => ({
          id: item.id,
          name: item.name,
          caption: item.caption,
        //   photo: item.photo,
          currentAmount: item.current_amount,
        //   status: item.status,
        //   createdAt: item.created_at,
        //   updatedAt: item.updated_at,
        }));
        setPrograms(filteredData);
        setColumns(Object.keys(filteredData[0]));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPrograms();
  }, [refresh]);
  const handleUpdate = (id) => {
    // Call your update function here
    console.log(`Update program with id ${id}`);
  };

  const handleDelete = (id) => {
    const url = `http://localhost:8000/api/delete_program/${id}`;
    const headers = {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${token}`,
    };
  
    fetch(url, {
      method: 'POST',
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('deleted')
        console.log(data);
        // Update the programs state to remove the deleted program
        setPrograms(programs.filter((program) => program.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert('error')
        setError(error.message);
      });
  };

  return (
    <div>
      <CampaignTable campaigns={programs} columns={columns} name='البرامج'
              renderActions={(id) => (
                <React.Fragment>
                  <button onClick={() => handleUpdate(id)}>Update</button>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                </React.Fragment>
              )}/>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default ShowPrograms;