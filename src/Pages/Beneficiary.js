import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Beneficiary = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rateFilter, setRateFilter] = useState('');
  const [aidSuggestedFilter, setAidSuggestedFilter] = useState('');
  const [rateOptions, setRateOptions] = useState([]);
  const [aidSuggestedOptions, setAidSuggestedOptions] = useState([]);

  const token = localStorage.getItem('token');

  // Fetch all beneficiaries
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        console.log('Fetching beneficiaries...');
        const response = await fetch('http://localhost:8000/api/allBeneficiaries', {
          headers: {
            Accept: 'application/vnd.api+json',
            type: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('Beneficiaries fetched:', data);

        if (Array.isArray(data.data)) {
          setBeneficiaries(data.data);
        } else {
          throw new Error('Invalid data format');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching beneficiaries:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, [token]);

  // Fetch rate options
  useEffect(() => {
    const fetchRateOptions = async () => {
      try {
        console.log('Fetching rate options...');
        const response = await fetch('http://localhost:8000/api/rateFilter', {
          headers: {
            Accept: 'application/vnd.api+json',
            type: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rate options');
        }

        const data = await response.json();
        console.log('Rate options fetched:', data);

        if (Array.isArray(data.data)) {
          setRateOptions(data.data);
        } else {
          throw new Error('Invalid rate options format');
        }
      } catch (err) {
        console.error('Error fetching rate options:', err);
        setError(err.message);
      }
    };

    fetchRateOptions();
  }, [token]);

  // Fetch aid suggested options
  useEffect(() => {
    const fetchAidSuggestedOptions = async () => {
      try {
        console.log('Fetching aid suggested options...');
        const response = await fetch('http://localhost:8000/api/aidSuggestedFilter', {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.api+json',
            type: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ aid: '' }) // Fetch with empty aid to get all options
        });

        if (!response.ok) {
          throw new Error('Failed to fetch aid suggested options');
        }

        const data = await response.json();
        console.log('Aid suggested options fetched:', data);

        if (Array.isArray(data.data)) {
          setAidSuggestedOptions(data.data);
        } else {
          throw new Error('Invalid aid suggested options format');
        }
      } catch (err) {
        console.error('Error fetching aid suggested options:', err);
        setError(err.message);
      }
    };

    fetchAidSuggestedOptions();
  }, [token]);

  // Filter beneficiaries based on rate and aidSuggested
  useEffect(() => {
    const filterBeneficiaries = () => {
      try {
        console.log('Filtering beneficiaries with rateFilter:', rateFilter, 'and aidSuggestedFilter:', aidSuggestedFilter);
        let filteredData = beneficiaries;

        if (rateFilter) {
          filteredData = filteredData.filter(b => b.final_rate === Number(rateFilter));
        }

        if (aidSuggestedFilter) {
          filteredData = filteredData.filter(b => JSON.parse(b.aid_suggested).includes(aidSuggestedFilter));
        }

        setBeneficiaries(filteredData);
      } catch (err) {
        console.error('Error filtering beneficiaries:', err);
        setError(err.message);
      }
    };

    filterBeneficiaries();
  }, [rateFilter, aidSuggestedFilter, beneficiaries]);

  const handleDelete = async (id) => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      try {
        console.log('Deleting beneficiary with ID:', id);
        const response = await fetch(`http://localhost:8000/api/removeBeneficiaries/${id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.api+json',
            type: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete');
        }

        setBeneficiaries(prev => prev.filter(b => b.id !== id));
        console.log('Beneficiary deleted successfully');
      } catch (err) {
        console.error('Error deleting beneficiary:', err);
        setError(err.message);
      }
    }
  };

  const handleEdit = (id) => {
    if (!id) return;
    console.log('Edit beneficiary with ID:', id);
  };

  const handleFilterByHighestRate = async () => {
    try {
      console.log('Filtering by highest rate...');
      const response = await fetch('http://localhost:8000/api/rateFilter', {
        headers: {
          Accept: 'application/vnd.api+json',
          type: 'application/vnd.api+json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rate filter');
      }

      const data = await response.json();
      console.log('Rate filter data:', data);

      if (Array.isArray(data.data)) {
        const highestRate = Math.max(...data.data);
        setRateFilter(highestRate);
        console.log('Highest rate set to:', highestRate);
      } else {
        throw new Error('Invalid rate filter format');
      }
    } catch (err) {
      console.error('Error fetching rate filter:', err);
      setError(err.message);
    }
  };

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Beneficiaries List</h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-success" onClick={handleFilterByHighestRate}>
          Filter by Highest Rate
        </button>
        
        <div className="d-flex align-items-center">
          <label htmlFor="aidSuggestedFilter" className="form-label me-2 mb-0">Filter by Aid Suggested:</label>
          <select
            id="aidSuggestedFilter"
            className="form-select"
            value={aidSuggestedFilter}
            onChange={(e) => setAidSuggestedFilter(e.target.value)}
          >
            <option value="">Select Aid</option>
            {aidSuggestedOptions.map(aid => (
              <option key={aid} value={aid}>{aid.charAt(0).toUpperCase() + aid.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Father Name</th>
              <th>Last Name</th>
              <th>Aid Suggested</th>
              <th>Final Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((beneficiary) => (
              <tr key={beneficiary.id}>
                <td>{beneficiary.first_name}</td>
                <td>{beneficiary.father_name}</td>
                <td>{beneficiary.last_name}</td>
                <td>{JSON.parse(beneficiary.aid_suggested).join(', ')}</td>
                <td>{beneficiary.final_rate}</td>
                <td>
                  <button 
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(beneficiary.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(beneficiary.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Beneficiary;
