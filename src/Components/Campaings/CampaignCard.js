import React,{useState} from 'react'
import '../Style/Style.css'

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
    <div className='card mb-4 campaignCard'>
      {type == 'camp' && (
        <div className='text-start'>
          <button className='btn ' onClick={() => showCampaign(campaigns.id)}><img src='/imges/edit-button-svgrepo-com.svg' className='img-fluid' width={25} height={25}/></button>
          <div className='text-center campName' onClick={() => selectCampaign(campaigns.id)}>
            <h2>{campaigns.name}</h2>
          </div>
        </div>
      )}
      {type == 'fund' && (
        <div className='text-start mb-3'>
          <button className='btn ' onClick={() => showFundCampaign(campaigns.id)}><img src='/imges/edit-button-svgrepo-com.svg' className='img-fluid' width={25} height={25}/></button>
          <button className='btn ' onClick={() => deleteFundCampaign(campaigns.id)}><img src='/imges/delete-svgrepo-com.svg' className='img-fluid' width={25} height={25}/></button>
            <h2 className='text-center mt-4'>{campaigns.name}</h2>
        </div>
      )}
      {campaigns.photo && (
        <img src={`http://localhost:8000${campaigns.photo}`} className='mb-3 w-50 mx-auto' />
      )}
      {campaigns.current_percentage && (
        <div 
        className='mx-auto mb-3'
        role="progressbar" 
        aria-valuenow={campaigns.current_percentage} 
        aria-valuemin="0" 
        aria-valuemax="100" 
        style={{ "--value": campaigns.current_percentage }}
      ></div>        // <p>{campaigns.current_percentage}</p>
      )}
        {campaigns.caption && (
          <p> {campaigns.caption}</p>
        )}
        {campaigns.start_date && (
          <p>تاريخ بداية الحملة :  {campaigns.start_date}</p>
        )}
      {campaigns.end_date && (
        <p>تاريخ نهاية الحملة :{campaigns.end_date}</p>
      )}
      {campaigns.volunteer_needed && (
        <span>عدد المتطوعين المطلوب :{campaigns.volunteer_needed}</span>
      )}
      {campaigns.volunteer_number && (
        <span>عدد المطوعين المشاركين : {campaigns.volunteer_number}</span>
      )}
      {confirmDelete && (
        <div className='mb-3'>
          <p>هل أنت متأكد من حذف الحملة؟</p>
          <button onClick={() => handleConfirmDelete(campaigns.id)} className='btn btn-danger mx-3'>نعم</button>
          <button onClick={handleCancelDelete} className='btn btn-primary'>لا</button>
        </div>
      )}
    </div>
  )
}

export default CampaignCard