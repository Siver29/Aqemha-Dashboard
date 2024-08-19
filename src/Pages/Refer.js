import React, { useState, useEffect } from 'react';
import CampaignTable from '../Components/Campaings/CampaignTable';
import Popup from 'reactjs-popup';

function Refer() {
  const [offers, setOffers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [updatedId, setUpdatedId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  //update input
  const [aidSuggested, setAidSuggested] = useState('');
  const [reportAuthor, setReportAuthor] = useState('');
  const [team, setTeam] = useState('');
  const [visitEndingDate, setVisitEndingDate] = useState('');
  const [visitStartingDate, setVisitStartingDate] = useState('');
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [finalRate, setFinalRate] = useState('');
  const [visitPeriod, setVisitPeriod] = useState('');

  let token = localStorage.getItem('token')

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/showAll', {
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
        console.log(data);
        const filteredData = data.data.map((item) => ({
          id: item.id,
          Name: item.r_first_name +' '+ item.r_last_name,
          phone: item.r_phone,
          email: item.r_email,
          relation: item.relation_with_beneficiary,
        }));
        setOffers(filteredData);
        setColumns(Object.keys(filteredData[0]));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOffers();
  }, [refresh]);

  const updateAccept = async () => {
    console.log(aidSuggested)
    console.log(reportAuthor)
    console.log(visitEndingDate)
    console.log(visitStartingDate)
    console.log(visitPeriod)
    console.log(team)
    console.log(day)
    console.log(date)
    console.log(finalRate)
    const headers = {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`
    };
    const formData1 = new FormData();

  formData1.append('aid_suggested[0]', aidSuggested);
  formData1.append('report_author', reportAuthor);
  formData1.append('visit_ending_date', visitEndingDate);
  formData1.append('visit_starting_date', visitStartingDate);
  formData1.append('team[0]', team);
  formData1.append('day', day);
  formData1.append('date', date);
  formData1.append('final_rate', finalRate);
  formData1.append('visit_period', visitPeriod);
    const response = await fetch(`http://localhost:8000/api/acceptReferOffer/${updatedId}`, {
      method: 'POST',
      headers,
      body: formData1
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    alert('تم القبول')
    setRefresh(!refresh)
    setIsOpen(false)
  };
  
  const handleAccept = (id) =>{
    console.log(id)
    setUpdatedId(id)
    setIsOpen(true) 
  }
  const handleReject = (id) =>{
    console.log(id)
        const url = `http://localhost:8000/api/rejectReferOffer/${id}`;
    
        fetch(url, {
          method: "POST",
          headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "Authorization": `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data =>{
            setRefresh(!refresh)
            console.log(data)
        }
        )
        .catch(error => console.error(error));
  }

  return (
    <div>
      <CampaignTable
        campaigns={offers}
        columns={columns}
        name='الطلبات المعلقة'
        renderActions={(campaign) => (
          <React.Fragment>
            <button
              className='btn btn-success mx-2'
              onClick={() => handleAccept(campaign.id)}
            >
              قبول
            </button>
            <button
              className='btn btn-danger'
              onClick={() => handleReject(campaign.id)}
            >
              رفض
            </button>
          </React.Fragment>
        )}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Popup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        modal={true}
        closeOnDocumentClick={true}
        overlay={{
          background: 'rgba(44, 44, 44, 0.5)',
          opacity: 0.5,
        }}
        style={{
          overflowY: 'auto', // add a scrollbar if the content exceeds the maximum height
        }}
      >
         <div className='row'>
        <div className='col-6 p-3'>
          <label htmlFor="reportAuthor" className='mx-3'>Aid Suggested </label>
          <input
            id='aidSuggested'
            type="text"
            value={aidSuggested}
            onChange={(event) => setAidSuggested(event.target.value)}
            className='form-control'
          />
        </div>

        <div className='col-6 p-3'>
          <label htmlFor="reportAuthor" className='mx-3'>Report Author</label>
          <input
            id='reportAuthor'
            type="text"
            value={reportAuthor}
            onChange={(event) => setReportAuthor(event.target.value)}
            className='form-control'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-6 p-3'>
          <label htmlFor="team0" className='mx-3'>Team</label>
          <input
            id='team0'
            type="text"
            value={team}
            onChange={(event) => setTeam(event.target.value)}
            className='form-control'
          />
        </div>
        <div className='col-6 p-3'>
          <label htmlFor="day" className='mx-3'>Day</label>
          <input
            id='day'
            type="text"
            value={day}
            onChange={(event) => setDay(event.target.value)}
            className='form-control'
          />
        </div>
  

      </div>
      <div className='row'>
      <div className='col-6 p-3'>
          <label htmlFor="visitEndingDate" className='mx-3'>Visit Ending Date</label>
          <input
            id='visitEndingDate'
            type="text"
            value={visitEndingDate}
            onChange={(event) => setVisitEndingDate(event.target.value)}
            className='form-control'
          />
        </div>
        <div className='col-6 p-3'>
          <label htmlFor="visitStartingDate" className='mx-3'>Visit Starting Date</label>
          <input
            id='visitStartingDate'
            type="text"
            value={visitStartingDate}
            onChange={(event) => setVisitStartingDate(event.target.value)}
            className='form-control'
          />
        </div>
      </div>


      <div className='row'>
        <div className='col-6 p-3'>
          <label htmlFor="date" className='mx-3'>Date</label>
          <input
            id='date'
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className='form-control'
          />
        </div>
        <div className='col-6 p-3'>
          <label htmlFor="finalRate" className='mx-3'>Final Rate</label>
          <input
            id='finalRate'
            type="number"
            value={finalRate}
            onChange={(event) => setFinalRate(event.target.value)}
            className='form-control'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-6 p-3'>
          <label htmlFor="visitPeriod" className='mx-3'>Visit Period</label>
          <input
            id='visitPeriod'
            type="number"
            value={visitPeriod}
            onChange={(event) => setVisitPeriod(event.target.value)}
            className='form-control'
          />
        </div>
        <div className='col-6 p-5'>
      <button onClick={updateAccept} className='btn btn-secondary'>Submit</button>
        </div>
      </div>

      </Popup>
    </div>
  );
}

export default Refer