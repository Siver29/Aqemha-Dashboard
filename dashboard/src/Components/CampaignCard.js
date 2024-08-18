import React from 'react'

function CampaignCard({campaigns , showCampaign ,selectCampaign  }) {
  return (
    <div className='card mb-4' onClick={() => selectCampaign(campaigns.id)}>
        <button onClick={() => showCampaign(campaigns.id)}>^_^</button>
        <h3>{campaigns.name}</h3>
        {/* <img src={`http://localhost:8000/${campaigns[0].photo}`} /> */}
        <p>{campaigns.start_date}</p>
        <span>{campaigns.volunteer_needed}</span>
        <span>{campaigns.volunteer_number}</span>
    </div>
  )
}

export default CampaignCard
