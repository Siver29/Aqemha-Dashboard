import React, { useState, useEffect } from 'react';
import './Donation.css'; // ملف CSS لتخصيص الستايل

function Donation() {
  const [key, setKey] = useState('programs');
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState('newest'); // إدارة حالة الفلتر
  const [dateRange, setDateRange] = useState({ start_date: '', end_date: '' });

  const fetchDonations = async () => {
    let token = localStorage.getItem('token');

    if (!token) {
      console.error('No token available in localStorage');
      return;
    }

    console.log(`Fetching donations for tab: ${key} with filter: ${filter}`);

    let url;
    let options = {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (key === 'programs') {
      if (filter === 'newest') {
        url = 'http://localhost:8000/api/index_filter_newest_program_donation';
      } else if (filter === 'amount') {
        url = 'http://localhost:8000/api/index_filter_amount_program_donation';
      } else if (filter === 'date') {
        url = 'http://localhost:8000/api/index_filter_date_program_donation';
        options.method = 'POST';
        if (dateRange.start_date && dateRange.end_date) {
          options.body = JSON.stringify({
            start_date: dateRange.start_date,
            end_date: dateRange.end_date,
          });
          console.log('Fetching donations with date range:', dateRange);
        } else {
          console.warn('Date range is incomplete');
          return;
        }
      } else {
        url = 'http://localhost:8000/api/index_program_donation';
      }
    } else if (key === 'fundraising') {
      if (filter === 'newest') {
        url = 'http://localhost:8000/api/index_filter_newest_fundraising_donation';
      } else if (filter === 'amount') {
        url = 'http://localhost:8000/api/index_filter_amount_fundraising_donation';
      } else if (filter === 'date') {
        url = 'http://localhost:8000/api/index_filter_date_fundraising_donation';
        options.method = 'POST';
        if (dateRange.start_date && dateRange.end_date) {
          options.body = JSON.stringify({
            start_date: dateRange.start_date,
            end_date: dateRange.end_date,
          });
          console.log('Fetching fundraising donations with date range:', dateRange);
        } else {
          console.warn('Date range is incomplete');
          return;
        }
      } else {
        url = 'http://localhost:8000/api/index_fundraising_donation';
      }
    }

    if (url) {
      console.log('Fetching from URL:', url);
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data fetched successfully:', data);

        setDonations(data.data || []);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [key, filter, dateRange]);

  useEffect(() => {
    if (filter === 'date' && dateRange.start_date && dateRange.end_date) {
      fetchDonations();
    }
  }, [dateRange]);

  return (
    <div className="container h-100 donation-container p-4">
      <ul className="nav nav-tabs mb-3" id="donation-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${key === 'programs' ? 'active' : ''}`}
            onClick={() => {
              setKey('programs');
              console.log('Switched to programs tab');
            }}
            href="#!"
          >
            تبرعات البرامج
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${key === 'fundraising' ? 'active' : ''}`}
            onClick={() => {
              setKey('fundraising');
              console.log('Switched to fundraising tab');
            }}
            href="#!"
          >
            تبرعات الحملات
          </a>
        </li>
      </ul>

      <div className="filter-buttons mb-3">
        <button
          className={`btn ${filter === 'newest' ? 'btn-custom-primary' : 'btn-custom-outline-primary'} shadow-sm`}
          onClick={() => {
            setFilter('newest');
            console.log('Filter set to newest');
          }}
        >
          الأحدث
        </button>
        <button
          className={`btn ${filter === 'amount' ? 'btn-custom-primary' : 'btn-custom-outline-primary'} shadow-sm`}
          onClick={() => {
            setFilter('amount');
            console.log('Filter set to amount');
          }}
        >
          حسب المبلغ
        </button>
        <button
          className={`btn ${filter === 'date' ? 'btn-custom-primary' : 'btn-custom-outline-primary'} shadow-sm`}
          onClick={() => {
            setFilter('date');
            console.log('Filter set to date');
          }}
        >
          حسب التاريخ
        </button>
      </div>


      {filter === 'date' && (
        <div className="date-filter mb-3">
          <input
            type="date"
            className="form-control mb-2"
            placeholder="تاريخ البداية"
            value={dateRange.start_date}
            onChange={(e) => {
              setDateRange({ ...dateRange, start_date: e.target.value });
              console.log('Start date set to:', e.target.value);
            }}
          />
          <input
            type="date"
            className="form-control"
            placeholder="تاريخ النهاية"
            value={dateRange.end_date}
            onChange={(e) => {
              setDateRange({ ...dateRange, end_date: e.target.value });
              console.log('End date set to:', e.target.value);
            }}
          />
        </div>
      )}

      <DonationTable donations={donations} />
    </div>
  );
}

function DonationTable({ donations }) {
  return (
    <div>
      <table className="table table-striped table-bordered table-hover donation-table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>رقم الهاتف</th>
            <th>المبلغ</th>
            <th>طريقة الدفع</th>
            <th>تاريخ الدفع</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`${donation.first_name} ${donation.last_name}`}</td>
              <td>{donation.phone_num}</td>
              <td>{donation.amount}</td>
              <td>{donation.pay_method}</td>
              <td>{donation.pay_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Donation;
