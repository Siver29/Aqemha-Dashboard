import React, { useState, useEffect } from 'react';
import CampaignTable from '../Components/Campaings/CampaignTable';

function Refer() {
  const [offers, setOffers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  let token = localStorage.getItem('token')

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/showAll', {
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
          Name: item.r_first_name + item.r_last_name,
          phone: item.r_phone,
          email: item.r_email,
          relation: item.relation_with_beneficiary,
        }));
        setOffers(filteredData);
        setColumns(Object.keys(filteredData[0]));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOffers();
  }, [refresh]);
  
  const handleAccept = (id) =>{
    const url = `http://localhost:8000/api/acceptReferOffer/${id}`;
    
        fetch(url, {
          method: "POST",
          headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "Authorization": `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data =>{
            setRefresh(!refresh)
            console.log(data)
        }
        )
        .catch(error => console.error(error));
    
  }
  const handleReject = (id) =>{
    console.log(id)
        const url = `http://localhost:8000/api/rejectReferOffer/${id}`;
    
        fetch(url, {
          method: "POST",
          headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "Authorization": `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data =>{
            setRefresh(!refresh)
            console.log(data)
        }
        )
        .catch(error => console.error(error));
  }

  return (
    <div>
      <CampaignTable
        campaigns={offers}
        columns={columns}
        name='Pending Offers'
        renderActions={(offers) => (
          <React.Fragment>
            <button
              className='btn btn-success mx-2'
              onClick={() => handleAccept(offers.id)}
            >
              قبول
            </button>
            <button
              className='btn btn-danger'
              onClick={() => handleReject(offers.id)}
            >
              رفض
            </button>
          </React.Fragment>
        )}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default Refer
