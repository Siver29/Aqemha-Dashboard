import React, { useState } from 'react';

function AddCampaing({handleToggleRefresh}) {
  const [name, setName] = useState('');
  const [volunteerNeeded, setVolunteerNeeded] = useState('');
  const [caption, setCaption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [photo, setPhoto] = useState(null);
  let token = localStorage.getItem('token')

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', name);
    formData.append('volunteer_needed', volunteerNeeded);
    formData.append('caption', caption);
    formData.append('start_date', startDate);

    fetch('http://localhost:8000/api/store_campaing', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setName('')
        setVolunteerNeeded('')
        setCaption('')
        setStartDate('')
        setPhoto('')
        console.log(data)
        handleToggleRefresh()
        alert('Campaing has been added')
      })
      .catch((error) => console.error(error));
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className='container text-end'>
      <h2>أضف حملة</h2>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-6 p-3'>
            <input
              id='name'
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="الأسم"
              className='form-control'
            />
          </div>
          <div className='col-6 p-3'>
            <input
              id="volunteerNum"
              type="text"
              value={volunteerNeeded}
              onChange={(event) => setVolunteerNeeded(event.target.value)}
              placeholder="عدد المتطوعين المطلوب"
              className='form-control'              
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-12 p-3'>
            <label htmlFor="startDate" className='mx-3'>تاريخ بداية الحملة</label>
              <input
                id='startDate'
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className='form-control'                
              />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 p-3'>
          <label htmlFor="photo" className='mx-3'>صورة الحملة</label>
            <input 
              id="photo"
              type="file" 
              onChange={handlePhotoChange} 
              className='form-control'              
              />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 p-3'>
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="شرح عن الحملة"
              rows={5}
              cols={50}
              className='form-control'              
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 p-3'>
        <button type="submit" className='btn text-white w-25 primaryColor'>أضافة حملة</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCampaing;