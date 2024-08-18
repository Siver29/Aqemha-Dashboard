import React, { useState } from 'react';

function AddFundraising({handleToggleRefresh}) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [goal, setGoal] = useState('');
  let token = localStorage.getItem('token')

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);
    formData.append('caption', caption);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('goal', goal);

    fetch('http://localhost:8000/api/store_fundraising', {
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
        setCaption('')
        setStartDate('')
        setEndDate('')
        setGoal('')
        setPhoto(null)
        handleToggleRefresh()
        console.log(data)
        alert('Fundraising has been added')
      })
      .catch((error) => console.error(error));
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className='container text-end'>
      <h2>أضف جمع التبرعات</h2>
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
        </div>

        <div className='row'>
          <div className='col-12 p-3'>
            <label htmlFor="startDate" className='mx-3'>تاريخ بداية الجمع</label>
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
            <label htmlFor="endDate" className='mx-3'>تاريخ نهاية الجمع</label>
              <input
                id='endDate'
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className='form-control'                
              />
          </div>
        </div>

        <div className='row'>
          <div className='col-12 p-3'>
            <label htmlFor="goal" className='mx-3'>الهدف</label>
              <input
                id='goal'
                type="number"
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className='form-control'                
              />
          </div>
        </div>

        <div className='row'>
          <div className='col-12 p-3'>
          <label htmlFor="photo" className='mx-3'>صورة الجمع</label>
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
              placeholder="شرح عن الجمع"
              rows={5}
              cols={50}
              className='form-control'              
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-12 p-3'>
        <button type="submit" className='btn text-white w-25 primaryColor'>أضافة جمع التبرعات</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddFundraising;