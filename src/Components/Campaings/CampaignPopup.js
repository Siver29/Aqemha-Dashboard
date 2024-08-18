import React, { useState , useEffect } from 'react';

function CampaignPopup({ campaign,fundCampaign, onClose, updateCampaign ,updateFundCampaign ,type }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [volunteerNeeded, setVolunteerNeeded] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [photo, setPhoto] = useState(null);
  const [goal, setGoal] = useState(0);


  useEffect(() => {
    let data = [];
    if (type === 'camp' && campaign) {
      data = campaign;
    } else if (type === 'fund' && fundCampaign) {
      data = fundCampaign;
    }
  
    if (data && data.length > 0) {
      setId(data[0].id);
      setName(data[0].name);
      setCaption(data[0].caption);
      setVolunteerNeeded(data[0].volunteer_needed);
      setStartDate(data[0].start_date);
      setEndDate(data[0].end_date);
      setPhoto(data[0].photo);
      setGoal(data[0].goal);
    }
  }, [campaign, fundCampaign, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(type ==='camp'){
      console.log('wow')
    updateCampaign({
      id,
      name,
      caption,
      volunteerNeeded,
      startDate,
      photo
    });
    }else if(type ==='fund'){
      console.log('hi')
      updateFundCampaign({
        id,
        name,
        caption,
        goal,
        startDate,
        endDate,
        photo
      })
    }
  };

return (
  <div className="popup-overlay">
    <div className="popup-content">
      {type === 'fund' && (
      <h2>عدل التبرعات</h2>
      )}
      {type === 'camp' && (
      <h2>عدل الحملات التطوعية</h2>
      )}
      <form onSubmit={handleSubmit}>
        {name && (
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        <br />
        {caption && (
          <label>
            Caption:
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </label>
        )}
        <br />
        {volunteerNeeded && (
          <label>
            Volunteer Needed:
            <input type="number" value={volunteerNeeded} onChange={(e) => setVolunteerNeeded(e.target.value)} />
          </label>
        )}
        {goal && (
          <label>
            Goal
            <input type="number" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </label>
        )}
        <br />
        {startDate && (
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
        )}
        {endDate && (
          <label>
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
        )}
        <br/>
        {photo && (
          <label>
            Img:
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          </label>
        )}
        <br />
        <button type="submit">Update Campaign</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);
}

export default CampaignPopup;