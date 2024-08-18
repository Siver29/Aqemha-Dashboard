import React, { useState, useRef } from 'react';

function VolunteerFilter({onFilterChange}) {
  let token = localStorage.getItem('token')
  const [activeComponent, setActiveComponent] = useState('specialization');
  const [selectedValue, setSelectedValue] = useState('');
  const [showSelect, setShowSelect] = useState({
    specialization: false,
    skill: false,
    addresses: false,
  });
  const specializationRef = useRef(null);
  const skillsRef = useRef(null);
  const addressRef = useRef(null);
  

  const handleButtonClick = (component) => {
    setActiveComponent(component);
    setShowSelect({
      specialization: component === 'specialization',
      skill: component === 'skill',
      addresses: component === 'addresses',
    });
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    if (activeComponent === 'specialization') {
      fetchSpecialization(e.target.value);
    } else if (activeComponent === 'skill') {
      fetchSkills(e.target.value);
    } else if (activeComponent === 'addresses') {
      fetchAddress(e.target.value);
    }
  };

  const fetchSpecialization = async (specialization) => {
    try {
      const response = await fetch('http://localhost:8000/api/showSpecializationFilter', {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ specialization : specialization }),
      });
      const data = await response.json();
      console.log(data);
      const filteredData = data.data.map((item) => ({
        fullName: `${item.first_name} ${item.last_name}`,
        phoneNum: item.phone_num,
        birthDate: item.birth_date,
        physicalProblems: (item.has_physical_problems==0)? 'false' :'true',
        active : item.active
      }));
      onFilterChange(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSkills = async (skill) => {
    try {
      const response = await fetch('http://localhost:8000/api/showSkillsFilter', {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skill }),
      });
      const data = await response.json();
      console.log(data);
      const filteredData = data.data.map((item) => ({
        fullName: `${item.first_name} ${item.last_name}`,
        phoneNum: item.phone_num,
        birthDate: item.birth_date,
        physicalProblems: (item.has_physical_problems==0)? 'false' :'true',
        active : item.active
      }));
      onFilterChange(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAddress = async (addresses) => {
    try {
      const response = await fetch('http://localhost:8000/api/showAddressFilter', {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ addresses : [addresses] }),
      });
      const data = await response.json();
      console.log(data);
      const filteredData = data.data.map((item) => ({
        fullName: `${item.first_name} ${item.last_name}`,
        phoneNum: item.phone_num,
        birthDate: item.birth_date,
        physicalProblems: (item.has_physical_problems==0)? 'false' :'true',
        active : item.active
      }));
      onFilterChange(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className='btn text-white w-20 secondryColor' onClick={() => handleButtonClick('specialization')}>الإختصاص</button>
      <button className='btn text-white w-20 secondryColor' onClick={() => handleButtonClick('skill')}>المهارات</button>
      <button className='btn text-white w-20 secondryColor' onClick={() => handleButtonClick('addresses')}>العنوان</button>
      {showSelect.specialization && (
        <select ref={specializationRef} onChange={handleSelectChange} className='form-control w-50 mx-auto text-center mt-3'>
          <option value="">إختر إختصاص</option>
          <option value="طبي">طبي</option>
          <option value="غير طبي">غير طبي</option>
        </select>
      )}
      {showSelect.skill && (
        <select ref={skillsRef} onChange={handleSelectChange} className='form-control w-50 mx-auto text-center mt-3'>
          <option value="">إختر مهارة</option>
          <option value="1">التصوير</option>
          <option value="2">التفكير الابداعي</option>
          <option value="3">ادخال البيانات</option>
          <option value="4">التواصل</option>
          <option value="5">التصميم</option>
          <option value="6">التدريس</option>
          <option value="7">كتابة محتوى</option>
          <option value="8">مونتاج</option>
        </select>
      )}
      {showSelect.addresses && (
        <select ref={addressRef} onChange={handleSelectChange} className='form-control w-50 mx-auto text-center mt-3'>
          <option value="">إختر منطقة</option>
          <option value="1">المرجة</option>
          <option value="2">الحميدية</option>
          <option value="3">الميدان</option>
          <option value="4">الشاغور</option>
          <option value="5">البرامكة</option>
          <option value="6">ركن الدين</option>
          <option value="7">الصالحية</option>
          <option value="8">المزة</option>
          <option value="9">المالكي</option>
          <option value="10">كفرسوسة</option>
          <option value="11">جرمانا</option>
          <option value="12">جوبر</option>
          <option value="13">القابون</option>
          <option value="14">برزة</option>
          <option value="15">ساحة الأمويين</option>
          <option value="16">باب توما</option>
          <option value="17">القصاع</option>
          <option value="18">باب شرقي</option>
          <option value="19">المهاجرين</option>
          <option value="20">العدوي</option>
          <option value="21">عش الورور</option>
          <option value="22">الربوة</option>
          <option value="23">الزاهرة</option>
          <option value="24">القدم</option>
          <option value="25">السبع بحرات</option>
          <option value="26">اليرموك</option>
          <option value="27">المزرعة</option>
          <option value="28">مساكن برزة</option>
          <option value="29">الحجر الأسود</option>
          <option value="30">السيدة زينب</option>
          <option value="31">جرمانا الجديدة</option>
          <option value="32">صحنايا</option>
          <option value="33">داريا</option>
          <option value="34">معضمية الشام</option>
          <option value="35">القصور</option>
          <option value="36">أبو رمانة</option>
          <option value="37">الشيخ محي الدين</option>
          <option value="38">التجارة</option>
          <option value="39">الجسر الأبيض</option>
          <option value="40">ساحة المرجة</option>
        </select>
      )}
    </div>
  );
}

export default VolunteerFilter;