import React, { useState } from 'react';

function CampaignPopup({ campaign, onClose, updateCampaign }) {
  const [id, setId] = useState(campaign[0].id);
  const [name, setName] = useState(campaign[0].name);
  const [caption, setCaption] = useState(campaign[0].caption);
  const [volunteerNeeded, setVolunteerNeeded] = useState(campaign[0].volunteer_needed);
  const [startDate, setStartDate] = useState(campaign[0].start_date);
  const [photo, setPhoto] = useState(campaign[0].photo);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCampaign({
      id,
      name,
      caption,
      volunteerNeeded,
      startDate,
      photo
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Campaign</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Caption:
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </label>
          <br />
          <label>
            Volunteer Needed:
            <input type="number" value={volunteerNeeded} onChange={(e) => setVolunteerNeeded(e.target.value)} />
          </label>
          <br />
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <br/>
          <label>
            Img:
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          </label>
          <br />
          <button type="submit">Update Campaign</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CampaignPopup;