import React, { useState, useEffect } from 'react';
import CampaignTable from '../Components/Campaings/CampaignTable';
import VolunteerRegister from '../Components/Volunteers/VolunteerRegister';
import DashboardHeader from '../Components/DashboardHeader';
import VolunteerStatusWrapper from '../Components/Volunteers/VolunteerStatusWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';

function Volunteer() {
  const [activeVolunteers, setActiveVolunteers] = useState([]);
  const [inactiveVolunteers, setInactiveVolunteers] = useState([]);
  const [columns, setColumns] = useState([
    // define your table columns here
    { Header: 'Name', accessor: 'name' },
    { Header: 'Status', accessor: 'status' },
  ]);

//   useEffect(() => {
//     const fetchActiveVolunteers = async () => {
//       const response = await fetch('http://localhost:8000/api/show_volunteer_active', {
//         method: 'GET',
//         headers: {
//           Accept: 'application/vnd.api+json',
//           'Content-Type': 'application/vnd.api+json',
//           Authorization: 'Bearer 2|GU6cWRjTxMnXmL2qWc3X2tghJyP1f6eul4kddob36c174beb',
//         },
//       });
//       const data = await response.json();
//       setActiveVolunteers(data);
//     };

//     const fetchInactiveVolunteers = async () => {
//       const response = await fetch('http://localhost:8000/api/show_volunteer_no_active', {
//         method: 'GET',
//         headers: {
//           Accept: 'application/vnd.api+json',
//           'Content-Type': 'application/vnd.api+json',
//           Authorization: 'Bearer 2|GU6cWRjTxMnXmL2qWc3X2tghJyP1f6eul4kddob36c174beb',
//         },
//       });
//       const data = await response.json();
//       setInactiveVolunteers(data);
//     };

//     fetchActiveVolunteers();
//     fetchInactiveVolunteers();
//   }, []);

  const campaigns = [...activeVolunteers, ...inactiveVolunteers];

  return (
    <div className='container-fluid'>
      {/* <DashboardHeader/> */}
      <VolunteerStatusWrapper/>
      {/* <CampaignTable campaigns={campaigns} columns={columns} name="Volunteer" /> */}
      {/* <VolunteerRegister/> */}
    </div>
  );
}

export default Volunteer;