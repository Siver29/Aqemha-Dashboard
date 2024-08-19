import React, { useState, useEffect } from 'react';
import './Beneficiary.css';
import AddBeneficiaryButton from '../Components/Beneficiaries/AddBeneficiaryButton';

const Beneficiary = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [originalBeneficiaries, setOriginalBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const [aidFilter, setAidFilter] = useState('');
  const token = localStorage.getItem('token');

  const fetchBeneficiaries = async () => {
    try {
      const url = 'http://localhost:8000/api/allBeneficiaries';
      console.log(`Fetching beneficiaries from URL: ${url}`);

      const response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('فشل في جلب البيانات');
      }

      const data = await response.json();
      console.log('Beneficiaries fetched:', data);

      if (data && Array.isArray(data.data)) {
        const processedData = data.data.map(beneficiary => ({
          id: beneficiary.id,
          first_name: beneficiary.first_name,
          father_name: beneficiary.father_name,
          last_name: beneficiary.last_name,
          aid_suggested: parseAidSuggested(beneficiary.aid_suggested),
          final_rate: beneficiary.final_rate,
        }));
        setOriginalBeneficiaries(processedData);
        setBeneficiaries(processedData);
      } else {
        console.error('Invalid data format:', data);
        setError('تنسيق البيانات غير صالح');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching beneficiaries:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, [token]);

  useEffect(() => {
    let filteredData = [...originalBeneficiaries];

    if (filter === 'rating') {
      filteredData = filteredData.sort((a, b) => b.final_rate - a.final_rate);
      console.log('Beneficiaries sorted by rating');
    }

    if (aidFilter) {
      filteredData = filteredData.filter(beneficiary =>
        beneficiary.aid_suggested.includes(aidFilter)
      );
      console.log(`Beneficiaries filtered by aid type: ${aidFilter}`);
    }

    setBeneficiaries(filteredData);
  }, [filter, aidFilter, originalBeneficiaries]);

  const handleDelete = async (id) => {
    console.log(`Handle delete called with ID: ${id}`);
    if (!id) {
      console.error('لم يتم توفير معرف للحذف');
      return;
    }

    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المستفيد؟')) {
      try {
        console.log(`Attempting to delete beneficiary with ID: ${id}`);
        const response = await fetch(`http://localhost:8000/api/removeBeneficiaries/${id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          console.error('Failed to delete:', response.statusText);
          throw new Error('فشل في الحذف');
        }

        console.log(`Beneficiary with ID ${id} deleted successfully`);
        setBeneficiaries(beneficiaries.filter(b => b.id !== id));
        setOriginalBeneficiaries(originalBeneficiaries.filter(b => b.id !== id));
      } catch (err) {
        console.error('Error deleting beneficiary:', err);
        setError(err.message);
      }
    } else {
      console.log('تم إلغاء الحذف');
    }
  };

  return (
    <div className="container beneficiary-container p-4">
      <div className="header mb-4">
        <h2>قائمة المستفيدين</h2>
      </div>

      <div className="filter-controls mb-3">
        <button
          className={`btn ${filter === 'rating' ? 'btn-primary' : 'btn-outline-primary'} shadow-sm`}
          onClick={() => {
            setFilter(filter === 'rating' ? null : 'rating');
            console.log(`Filter set to ${filter === 'rating' ? 'none' : 'rating'}`);
          }}
        >
          {filter === 'rating' ? 'إلغاء فلترة حسب التقييم' : 'فلترة حسب التقييم'}
        </button>

        <select
          className="form-select"
          aria-label="فلترة حسب المساعدة"
          value={aidFilter}
          onChange={(e) => setAidFilter(e.target.value)}
        >
          <option value="">فلترة حسب المساعدة</option>
          <option value="food">غذاء</option>
          <option value="money">مال</option>
          <option value="medicine">دواء</option>
          <option value="clothes">ملابس</option>
        </select>
      </div>


      {loading && <div className="alert alert-info">جاري تحميل البيانات...</div>}
      {error && <div className="alert alert-danger">خطأ: {error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>الاسم الأول</th>
              <th>اسم الأب</th>
              <th>الاسم الأخير</th>
              <th>المساعدة المقترحة</th>
              <th>التقييم النهائي</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((beneficiary, index) => (
              <tr key={beneficiary.id}>
                <td>{index + 1}</td>
                <td>{beneficiary.first_name}</td>
                <td>{beneficiary.father_name}</td>
                <td>{beneficiary.last_name}</td>
                <td>{beneficiary.aid_suggested || 'غير متوفر'}</td>
                <td>{beneficiary.final_rate || 'غير متوفر'}</td>
                <td>
                  <button
                    className="btn btn-danger shadow-sm"
                    onClick={() => handleDelete(beneficiary.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* تمرير دالة fetchBeneficiaries كمقوم لـ AddBeneficiaryButton */}
      <AddBeneficiaryButton onAddBeneficiary={fetchBeneficiaries} />
    </div>
  );
};

const parseAidSuggested = (aidSuggested) => {
  if (!aidSuggested) {
    console.error('aid_suggested is undefined or null');
    return 'غير متوفر';
  }

  try {
    const parsed = JSON.parse(aidSuggested);
    if (Array.isArray(parsed)) {
      return parsed.join(', ');
    } else {
      console.error('aid_suggested is not an array:', parsed);
      return 'غير متوفر';
    }
  } catch (error) {
    console.error('Error parsing aid_suggested:', error);
    return 'غير متوفر';
  }
};

export default Beneficiary;
