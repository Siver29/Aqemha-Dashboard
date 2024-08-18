import React, { useState, useEffect } from 'react';

const VolunteerRegister = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    father_name: '',
    mother_name: '',
    address_id: '',
    phone_num: '',
    WhatsApp_num: '',
    nationality: '',
    birth_date: '',
    has_physical_problems: '',
    volunteering_reasons: '',
    current_other_charities: '',
    courses_taken: '',
    skills: [],
    potential_gains: '',
    level_name: '',
    school: '',
    from: '',
    to: '',
    certificate: '',
    specialization: '',
    graduation_rate: '',
    organization: '',
    period: '',
    role: '',
    day_id: '',
    time_id: '',
  });

  const [response, setResponse] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((value) => {
          formData.append(`${key}[]`, value);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    fetch('http://localhost:8000/api/volunteering', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setResponse(data))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={data.email} onChange={(event) => setData({ ...data, email: event.target.value })} />
      </label>
      <label>
        Password:
        <input type="password" value={data.password} onChange={(event) => setData({ ...data, password: event.target.value })} />
      </label>
      <label>
        Password Confirmation:
        <input
          type="password"
          value={data.password_confirmation}
          onChange={(event) => setData({ ...data, password_confirmation: event.target.value })}
        />
      </label>
      {/* Add more form fields for the remaining data properties */}
      <button type="submit">Register</button>
      {response && <div>Response: {JSON.stringify(response)}</div>}
    </form>
  );
};

export default VolunteerRegister;