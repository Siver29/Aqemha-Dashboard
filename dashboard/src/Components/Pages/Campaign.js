import React, { useState, useEffect } from 'react';
import AddCampaing from '../AddCampaing';
import CampaignCard from '../CampaignCard';
import CampaignPopup from '../CampaignPopup';
import DashboardHeader from '../DashboardHeader';
import CampaignVolunteers from '../CampaignVolunteers';
import 'bootstrap/dist/css/bootstrap.min.css';

function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [updatedCampaign, setUpdatedCampaign] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);


  const selectCampaign = (id) => {
    setSelectedCampaignId(id);
  };

  async function updateCampaign(data) {
    try {
      const formData = new FormData();
      formData.append('photo', data.photo);
      formData.append('name', data.name);
      formData.append('caption', data.caption);
      formData.append('volunteer_needed', data.volunteerNeeded);
      formData.append('start_date', data.startDate);
  
      const response = await fetch(`http://localhost:8000/api/update_campaing/${data.id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Authorization': 'Bearer 3|RYiJ8qgCsD86OdMXDq6ztr2KMrt89lxp4Q9Vh6fYd2a0754e'
        },
        body: formData
      });
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  async function showCampaigns() {
    try {
      const response = await fetch('http://localhost:8000/api/index_campaing', {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      });
      const data = await response.json();
      console.log(data)
      console.log(data.data)
      // console.log((Object.keys(data.data[0])))
      setCampaigns(data.data);
      // setColumns(Object.keys(data.data[0]));
    } catch (error) {
      console.error(error);
    }
  }
  async function showCampaign(id) {
    try {
      const response = await fetch(`http://localhost:8000/api/show_campaing/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      });
      const data = await response.json();
      console.log(data)
      console.log(data.data)
      setSelectedCampaign([data.data]);
      setShowPopup(true);
      // setColumns(Object.keys(data.data[0]));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    showCampaigns();
  }, []);

  return (
    <div className="app-content container-fluid">
      {/* <DashboardHeader/> */}
      <div className='row'>
        <div className='col-6'>
          <div className='container-fluid'>
            <div className='row'>
            {campaigns.map((campaign, index) => (
                <div key={index} className='col-6'>
                  <CampaignCard campaigns={campaign} showCampaign={showCampaign} selectCampaign={selectCampaign}/>
                </div>
              ))}
            </div>
          </div>
        </div>
          
        <div className='col-6'>
        {selectedCampaignId && <CampaignVolunteers id={selectedCampaignId}/>}
          <AddCampaing />
        </div>
      </div>
      {showPopup && (
        <CampaignPopup campaign={selectedCampaign} onClose={() => setShowPopup(false)} updateCampaign={updateCampaign} />
      )}
    </div>
  );
}

export default Campaign;