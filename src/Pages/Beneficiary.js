import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Components/Context/AuthContext';

function Beneficiary() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [filters, setFilters] = useState({
    rate: '',
    aidSuggested: ''
  });
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchBeneficiaries();
  }, [token]);

  const fetchBeneficiaries = async () => {
    console.log('Fetching beneficiaries...');
    try {
      const response = await fetch('http://localhost:8000/api/allBeneficiaries', {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Error fetching beneficiaries: ${response.statusText}`);
      const data = await response.json();
      console.log('Beneficiaries fetched:', data);
      setBeneficiaries(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      console.log('Deleting beneficiary with ID:', id);
      try {
        const response = await fetch(`http://localhost:8000/api/removeBeneficiaries/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`Error deleting beneficiary: ${response.statusText}`);
        console.log('Beneficiary deleted successfully');
        setBeneficiaries(beneficiaries.filter(beneficiary => beneficiary.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdate = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    console.log('Selected beneficiary for update:', beneficiary);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    console.log('Filters updated:', filters);
  };

  const applyFilters = async () => {
    console.log('Applying filters:', filters);
    try {
      const response = await fetch('http://localhost:8000/api/rateFilter', {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filters),
      });
      if (!response.ok) throw new Error(`Error applying filters: ${response.statusText}`);
      const data = await response.json();
      console.log('Filtered beneficiaries:', data);
      setBeneficiaries(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateBeneficiary = async (beneficiary) => {
    console.log('Updating beneficiary:', beneficiary);
    try {
      const response = await fetch(`http://localhost:8000/api/updateBeneficiaries/${beneficiary.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(beneficiary),
      });
      if (!response.ok) throw new Error(`Error updating beneficiary: ${response.statusText}`);
      console.log('Beneficiary updated successfully');
      setSelectedBeneficiary(null);
      fetchBeneficiaries();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2>Beneficiaries</h2>
        <div className="mb-3">
          <label htmlFor="rate" className="form-label">Rate</label>
          <input
            type="text"
            id="rate"
            name="rate"
            className="form-control"
            value={filters.rate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="aidSuggested" className="form-label">Aid Suggested</label>
          <select
            id="aidSuggested"
            name="aidSuggested"
            className="form-select"
            value={filters.aidSuggested}
            onChange={handleFilterChange}
          >
            <option value="">Select Aid</option>
            {/* Add options dynamically if needed */}
            <option value="Aid1">Aid 1</option>
            <option value="Aid2">Aid 2</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((beneficiary) => (
            <tr key={beneficiary.id}>
              <td>{beneficiary.id}</td>
              <td>{beneficiary.first_name}</td>
              <td>{beneficiary.last_name}</td>
              <td>{beneficiary.phone_num}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleUpdate(beneficiary)}
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
      {selectedBeneficiary && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Beneficiary</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="editFirstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      id="editFirstName"
                      className="form-control"
                      value={selectedBeneficiary.first_name}
                      onChange={(e) => setSelectedBeneficiary({ ...selectedBeneficiary, first_name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editLastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      id="editLastName"
                      className="form-control"
                      value={selectedBeneficiary.last_name}
                      onChange={(e) => setSelectedBeneficiary({ ...selectedBeneficiary, last_name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editPhoneNum" className="form-label">Phone Number</label>
                    <input
                      type="text"
                      id="editPhoneNum"
                      className="form-control"
                      value={selectedBeneficiary.phone_num}
                      onChange={(e) => setSelectedBeneficiary({ ...selectedBeneficiary, phone_num: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={() => handleUpdateBeneficiary(selectedBeneficiary)}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Beneficiary;
