import React, { useState, useEffect } from 'react';
import CampaignTable from './CampaignTable';
import VolunteerFilter from './VolunteerFilter';
import 'bootstrap/dist/css/bootstrap.min.css';

function ActiveVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);

  const handleFilterChange = (filteredVolunteers) => {
    const activeVolunteers = filteredVolunteers
      .filter((volunteer) => volunteer.active === 1)
      .map(({ active, ...rest }) => rest);
    setVolunteers(activeVolunteers);
    setColumns(Object.keys(activeVolunteers[0]));
  };

  const token = '1|2zEOURbNmlwkf4YJ8lj6Q0AVcK9xkxdUwdGL1psQ4cbda026';

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/show_volunteer_active', {
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
        console.log(data)
        console.log(data.data)
        const filteredData = data.data.map((item) => ({
            fullName: `${item.first_name} ${item.last_name}`,
            phoneNum: item.phone_num,
            birthDate: item.birth_date,
            physicalProblems: (item.has_physical_problems==0)? 'false' :'true'
          }));
        setVolunteers(filteredData);
        setColumns(Object.keys(filteredData[0]));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <div className="container">
      <VolunteerFilter onFilterChange={handleFilterChange}/>
      <CampaignTable campaigns={volunteers} columns={columns} name='قائمة المتطوعين'/>
    </div>
  );
}

export default ActiveVolunteers;