import React, { useState, useEffect } from 'react';
import CampaignTable from '../Components/Campaings/CampaignTable';

function Support() {
  const [supports, setSupports] = useState([]);
  const [columns, setColumns] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  let token = localStorage.getItem('token')

  useEffect(() => {
    const fetchSupports = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/index_support', {
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
        const filteredData = data.data.filter((item) => item.status === 'wait').map((item) => ({
          id: item.id,
          // category: item.category_id,
          Name: item.first_name + item.last_name,
          phone: item.phone_num,
          item: item.item,
          itemDetails: item.item_details,
          address: item.address,
          startDate: item.start_date,
          endDate: item.end_date,
          status: item.status,
        }));
        setSupports(filteredData);
        setColumns(Object.keys(filteredData[0]));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSupports();
  }, [refresh]);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/accept_support/${id}`, {
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
      alert ('تم قبول طلب الدعم')
      setRefresh(!refresh);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/refuse_support/${id}`, {
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
      alert('تم رفض طلب الدعم')
      setRefresh(!refresh);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <CampaignTable
        campaigns={supports}
        columns={columns}
        name='طلبات الدعم المعلقة'
        renderActions={(support) => (
          <React.Fragment>
            <button
              className='btn btn-success mx-2'
              onClick={() => handleAccept(support.id)}
            >
              قبول
            </button>
            <button
              className='btn btn-danger'
              onClick={() => handleReject(support.id)}
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

export default Support;