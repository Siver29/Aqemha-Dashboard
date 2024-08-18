import React, { useState, useEffect } from 'react';
import AddCampaing from '../Components/Campaings/AddCampaing';
import CampaignCard from '../Components/Campaings/CampaignCard';
import CampaignPopup from '../Components/Campaings/CampaignPopup';
import DashboardHeader from '../Components/DashboardHeader';
import CampaignVolunteers from '../Components/Campaings/CampaignVolunteers';
import AddFundraising from '../Components/Campaings/AddFundraising';
import Popup from 'reactjs-popup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/Programs/ProgramStyle.css'

function Campaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [updatedCampaign, setUpdatedCampaign] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedFundCampaign, setSelectedFundCampaign] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showFundPopup, setShowFundPopup] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [toggleCampaigns, settoggleCampaigns] = useState('fund');
  const [refresh, setRefresh] = useState(false)
  let token = localStorage.getItem('token')

  const handleToggleRefresh = () => {
    setRefresh(!refresh);
  };

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
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const responseJson = await response.json();
      if(responseJson.ok){
      console.log(responseJson);
      setShowPopup(false)
      handleToggleRefresh()
      alert('updated successfuly')
      }
    } catch (error) {
      alert('not ok')
      console.error(error);
    }
  }
  async function updateFundCampaign(data) {
    console.log(data)
    try {
      const formData = new FormData();
      formData.append('photo', data.photo);
      formData.append('name', data.name);
      formData.append('caption', data.caption);
      formData.append('goal', data.goal);
      formData.append('start_date', data.startDate);
      formData.append('end_date', data.endDate);

      const response = await fetch(`http://localhost:8000/api/update_fundraising/${data.id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const responseJson = await response.json();
      console.log(responseJson);
      setShowFundPopup(false)
      handleToggleRefresh()
      alert('updated successfuly')
    } catch (error) {
      console.error(error);
      alert('not ok')
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
  async function showFund() {
    try {
      const response = await fetch('http://localhost:8000/api/index_fundraising', {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`
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
    console.log(id)
    try {
      const response = await fetch(`http://localhost:8000/api/show_campaing/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
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

  async function showFundCampaign(id) {
    try {
      console.log(id)
      const response = await fetch(`http://localhost:8000/api/show_fundraising/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data)
      console.log(data.data)
      setSelectedFundCampaign([data.data]);
      setShowFundPopup(true);
      // setColumns(Object.keys(data.data[0]));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (toggleCampaigns === 'camp') {
      showCampaigns();
    }
    if (toggleCampaigns === 'fund') {
      showFund();
    }
  }, [toggleCampaigns, refresh]);

  return (
    <div className="app-content container-fluid">
      <div className='d-flex justify-content-around align-items-center mb-5'>
        <button className='btn text-white w-25 primaryColor'
          onClick={() => {
            settoggleCampaigns('camp');
            setShowPopup(false);
          }}>حملات تطوعية</button>
        <button className='btn text-white w-25 primaryColor'
          onClick={() => {
            settoggleCampaigns('fund');
            setShowFundPopup(false)
          }}>حملات مالية</button>
      </div>
      {toggleCampaigns === 'fund' && (
        <div className='row'>
          <div className='col-6'>
            <div className='container-fluid'>
              <div className='row'>
                {campaigns.map((campaign, index) => (
                  <div key={index} className='col-6'>
                    <CampaignCard campaigns={campaign} showCampaign={showCampaign} selectCampaign={selectCampaign} showFundCampaign={showFundCampaign} updateFundCampaign={updateFundCampaign} handleToggleRefresh={handleToggleRefresh} type='fund' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='col-6'>
            <AddFundraising handleToggleRefresh={handleToggleRefresh} />
          </div>
        </div>
      )}
      {toggleCampaigns === 'camp' && (
        <div className='row'>
          <div className='col-6'>
            <div className='container-fluid'>
              <div className='row'>
                {campaigns.map((campaign, index) => (
                  <div key={index} className='col-6'>
                    <CampaignCard campaigns={campaign} showCampaign={showCampaign} selectCampaign={selectCampaign} showFundCampaign={showFundCampaign} handleToggleRefresh={handleToggleRefresh} type='camp' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='col-6'>
            {selectedCampaignId && <CampaignVolunteers id={selectedCampaignId} />}
            <AddCampaing handleToggleRefresh={handleToggleRefresh} />
          </div>
        </div>
      )}
      <Popup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        modal={true}
        closeOnDocumentClick={true}
        overlay={{
          background: 'rgba(44, 44, 44, 0.5)',
          opacity: 0.5,
        }}
      >
        <CampaignPopup campaign={selectedCampaign} fundCampaign={selectedFundCampaign} onClose={() => setShowPopup(false)} updateCampaign={updateCampaign} updateFundCampaign={updateFundCampaign} type='camp' />
      </Popup>

      <Popup
        open={showFundPopup}
        onClose={() => setShowPopup(false)}
        modal={true}
        closeOnDocumentClick={true}
        overlay={{
          background: 'rgba(44, 44, 44, 0.5)',
          opacity: 0.5,
        }}
      >
        <CampaignPopup campaign={selectedCampaign} fundCampaign={selectedFundCampaign} onClose={() => setShowFundPopup(false)} updateCampaign={updateCampaign} updateFundCampaign={updateFundCampaign} type='fund' />
      </Popup>

    </div>
  );
}

export default Campaign;