import React,{useState} from 'react'

function CampaignCard({ campaigns, showCampaign, selectCampaign,showFundCampaign ,handleToggleRefresh,type }) {
  console.log(campaigns.id)
  const [confirmDelete, setConfirmDelete] = useState(false);
  let token = localStorage.getItem('token')

  const deleteFundCampaign = (id) => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = (id) => {
    const url = `http://localhost:8000/api/delete_fundraising/${id}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    };

    fetch(url, {
      method: 'POST',
      headers: headers,
    })
      .then(response => response.json())
      .then(data => {
      console.log(data)
      handleToggleRefresh()
    })
      .catch(error => console.error(error));
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };
  return (
    <div className='card mb-4'>
      {type == 'camp' && (
        <div>
          <button onClick={() => showCampaign(campaigns.id)}>edit</button>
          <div onClick={() => selectCampaign(campaigns.id)}>
            <h3>{campaigns.name}</h3>
          </div>
        </div>
      )}
      {type == 'fund' && (
        <div>
          <button onClick={() => showFundCampaign(campaigns.id)}>edit111</button>
          <button onClick={() => deleteFundCampaign(campaigns.id)}>delete</button>
            <h3>{campaigns.name}</h3>
        </div>
      )}
      {campaigns.photo && (
        <img src={`http://localhost:8000/${campaigns.photo}`} />
      )}
      {campaigns.end_date && (
        <p>{campaigns.current_percentage}</p>
      )}
      {campaigns.end_date && (
        <p>{campaigns.end_date}</p>
      )}
      {campaigns.start_date && (
        <p>{campaigns.start_date}</p>
      )}
      {campaigns.volunteer_needed && (
        <span>{campaigns.volunteer_needed}</span>
      )}
      {campaigns.volunteer_number && (
        <span>{campaigns.volunteer_number}</span>
      )}
      {confirmDelete && (
        <div>
          <p>Are you sure you want to delete this campaign?</p>
          <button onClick={() => handleConfirmDelete(campaigns.id)}>Yes, delete</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default CampaignCard