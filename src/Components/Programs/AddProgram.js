import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './ProgramStyle.css'

function AddProgram({ handleToggleRefresh }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem('token')

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);
    formData.append('caption', caption);

    fetch('http://localhost:8000/api/store_program', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setName('');
        setPhoto(null);
        setCaption('');
        console.log(data);
        // handleToggleRefresh();
        alert('Program has been added');
        handleToggleRefresh()
        
      })
      .catch((error) => console.error(error));
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className='container text-end'>
      <h2>أضف برنامج</h2>
      {!isOpen && (
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
              <label htmlFor="photo" className='mx-3'>صورة البرنامج</label>
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
                placeholder="شرح عن البرنامج"
                rows={5}
                cols={50}
                className='form-control'              
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-12 p-3'>
              <button type="submit" className='btn text-white w-25 primaryColor'>أضافة برنامج</button>
            </div>
          </div>
        </form>
      )}
      {/* <Popup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        trigger={<button className="btn-container">Trigger</button>}
        modal={true}
        closeOnDocumentClick={true}
        overlay={{
          background: 'rgba(44, 44, 44, 0.5)',
          opacity: 0.5,
        }}
      >
        <div className="popup-content">
          hiiiii
        </div>
      </Popup> */}
    </div>
  );
}

export default AddProgram;