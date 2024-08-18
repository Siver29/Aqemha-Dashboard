// import React, { useState } from 'react';

// function AddBeneficiary() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [fatherName, setFatherName] = useState('');
//   const [motherName, setMotherName] = useState('');
//   const [livingStatus, setLivingStatus] = useState('');
//   const [birthDate, setBirthDate] = useState('');
//   const [birthPlace, setBirthPlace] = useState('');
//   const [maritalStatus, setMaritalStatus] = useState('');
//   const [educationalLevel, setEducationalLevel] = useState('');
//   const [profession, setProfession] = useState('');
//   const [previousAddress, setPreviousAddress] = useState('');
//   const [currentAddress, setCurrentAddress] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [telephoneNumber, setTelephoneNumber] = useState('');
//   const [partnerName, setPartnerName] = useState('');
//   const [partnerFatherName, setPartnerFatherName] = useState('');
//   const [partnerMotherName, setPartnerMotherName] = useState('');
//   const [partnerBirthDate, setPartnerBirthDate] = useSt
ate('');
//   const [partnerBirthPlace, setPartnerBirthPlace] = useState('');
//   const [familyMembersNumber, setFamilyMembersNumber] = useState('');
//   const [malesNumber, setMalesNumber] = useState('');
//   const [femaleNumber, setFemaleNumber] = useState('');
//   const [familyProviderName, setFamilyProviderName] = useState('');
//   const [familyProviderIdentity, setFamilyProviderIdentity] = useState('');
//   const [peopleCountOnFp, setPeopleCountOnFp] = useState('');
//   const [under18, setUnder18] = useState('');
//   const [above18, setAbove18] = useState('');
//   const [above60, setAbove60] = useState('');
//   const [specialNeeds, setSpecialNeeds] = useState('');
//   const [specialNeedsSituation, setSpecialNeedsSituation] = useState('');
//   const [relativesAtHome, setRelativesAtHome] = useState('');
//   const [children, setChildren] = useState([]);
//   const [income, setIncome] = useState('');
//   const [incomeSource, setIncomeSource] = useState('');
//   const [additionalDetails, setAdditionalDetails] = useState('');
//   const [status, setStatus] = useState('');
//   const [rent, setRent] = useState('');
//   const [roomsNum, setRoomsNum] = useState('');
//   const [houseSituation, setHouseSituation] = useState('');
//   const [aidSuggested, setAidSuggested] = useState([]);
//   const [reportAuthor, setReportAuthor] = useState('');
//   const [team, setTeam] = useState([]);
//   const [visitEndingDate, setVisitEndingDate] = useState('');
//   const [visitStartingDate, setVisitStartingDate] = useState('');
//   const [day, setDay] = useState('');
//   const [date, setDate] = useState('');
//   const [finalRate, setFinalRate] = useState('');
//   const [visitPeriod, setVisitPeriod] = useState('');
//   let token = localStorage.getItem('token')

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('first_name', firstName);
//     formData.append('last_name', lastName);
//     formData.append('father_name', fatherName);
//     formData.append('mother_name', motherName);
//     formData.append('living_status', livingStatus);
//     formData.append('birth_date', birthDate);
//     formData.append('birth_place', birthPlace);
//     formData.append('marital_status', maritalStatus);
//     formData.append('educational_level', educationalLevel);
//     formData.append('profession', profession);
//     formData.append('previous_address', previousAddress);
//     formData.append('current_address', currentAddress);
//     formData.append('mobile_number', mobileNumber);
//     formData.append('telephone_number', telephoneNumber);
//     formData.append('partner_name', partnerName);
//     formData.append('partner_father_name', partnerFatherName);
//     formData.append('partner_mother_name', partnerMotherName);
//     formData.append('partner_birth_date', partnerBirthDate);
//     formData.append('partner_birth_place', partnerBirthPlace);
//     formData.append('family_members_number', familyMembersNumber);
//     formData.append('males_number', malesNumber);
//     formData.append('female_number', femaleNumber);
//     formData.append('family_provider_name', familyProviderName);
//     formData.append('family_provider_identity', familyProviderIdentity);
//     formData.append('people_count_on_fp', peopleCountOnFp);
//     formData.append('under18', under18);
//     formData.append('above18', above18);
//     formData.append('above60', above60);
//     formData.append('special_needs', specialNeeds);
//     formData.append('special_needs_situation', specialNeedsSituation);
//     formData.append('relatives_at_home', relativesAtHome);
//     formData.append('children', JSON.stringify(children));
//     formData.append('income', income);
//     formData.append('income_source', incomeSource);
//     formData.append('additional_details', additionalDetails);
//     formData.append('status', status);
//     formData.append('rent', rent);
//     formData.append('rooms_num', roomsNum);
//     formData.append('house_situation', houseSituation);
//     formData.append('aid_suggested', JSON.stringify(aidSuggested));
//     formData.append('report_author', reportAuthor);
//     formData.append('team', JSON.stringify(team));
//     formData.append('visit_ending_date', visitEndingDate);
//     formData.append('visit_starting_date', visitStartingDate);
//     formData.append('day', day);
//     formData.append('date', date);
//     formData.append('final_rate', finalRate);
//     formData.append('visit_period', visitPeriod);

//     fetch('http://localhost:8000/api/add_beneficiary', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/vnd.api+json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         alert('Beneficiary has been added');
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div>
//       <h2>أضف مستفيد</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='first_name'
//               type="text"
//               value={firstName}
//               onChange={(event) => setFirstName(event.target.value)}
//               placeholder="الأسم الأول"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='last_name'
//               type="text"
//               value={lastName}
//               onChange={(event) => setLastName(event.target.value)}
//               placeholder="الأسم الثاني"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='father_name'
//               type="text"
//               value={fatherName}
//               onChange={(event) => setFatherName(event.target.value)}
//               placeholder="أسم الأب"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='mother_name'
//               type="text"
//               value={motherName}
//               onChange={(event) => setMotherName(event.target.value)}
//               placeholder="أسم الأم"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='living_status'
//               type="text"
//               value={livingStatus}
//               onChange={(event) => setLivingStatus(event.target.value)}
//               placeholder="الحالة الاجتماعية"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='birth_date'
//               type="date"
//               value={birthDate}
//               onChange={(event) => setBirthDate(event.target.value)}
//               placeholder="تاريخ الميلاد"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='birth_place'
//               type="text"
//               value={birthPlace}
//               onChange={(event) => setBirthPlace(event.target.value)}
//               placeholder="مكان الميلاد"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='marital_status'
//               type="text"
//               value={maritalStatus}
//               onChange={(event) => setMaritalStatus(event.target.value)}
//               placeholder="الحالة الزوجية"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='educational_level'
//               type="text"
//               value={educationalLevel}
//               onChange={(event) => setEducationalLevel(event.target.value)}
//               placeholder="المستوى التعليمي"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//           <input
//               id='profession'
//               type="text"
//               value={profession}
//               onChange={(event) => setProfession(event.target.value)}
//               placeholder="المهنة"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='previous_address'
//               type="text"
//               value={previousAddress}
//               onChange={(event) => setPreviousAddress(event.target.value)}
//               placeholder="العنوان السابق"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='current_address'
//               type="text"
//               value={currentAddress}
//               onChange={(event) => setCurrentAddress(event.target.value)}
//               placeholder="العنوان الحالي"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='mobile_number'
//               type="tel"
//               value={mobileNumber}
//               onChange={(event) => setMobileNumber(event.target.value)}
//               placeholder="رقم الجوال"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='telephone_number'
//               type="tel"
//               value={telephoneNumber}
//               onChange={(event) => setTelephoneNumber(event.target.value)}
//               placeholder="رقم التلفون"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='partner_name'
//               type="text"
//               value={partnerName}
//               onChange={(event) => setPartnerName(event.target.value)}
//               placeholder="أسم الشريك"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='partner_father_name'
//               type="text"
//               value={partnerFatherName}
//               onChange={(event) => setPartnerFatherName(event.target.value)}
//               placeholder="أسم أب الشريك"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='partner_mother_name'
//               type="text"
//               value={partnerMotherName}
//               onChange={(event) => setPartnerMotherName(event.target.value)}
//               placeholder="أسم أم الشريك"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='partner_birth_date'
//               type="date"
//               value={partnerBirthDate}
//               onChange={(event) => setPartnerBirthDate(event.target.value)}
//               placeholder="تاريخ ميلاد الشريك"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='partner_birth_place'
//               type="text"
//               value={partnerBirthPlace}
//               onChange={(event) => setPartnerBirthPlace(event.target.value)}
//               placeholder="مكان ميلاد الشريك"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='family_members_number'
//               type="number"
//               value={familyMembersNumber}
//               onChange={(event) => setFamilyMembersNumber(event.target.value)}
//               placeholder="عدد أفراد الأسرة"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='males_number'
//               type="number"
//               value={malesNumber}
//               onChange={(event) => setMalesNumber(event.target.value)}
//               placeholder="عدد الذكور"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='female_number'
//               type="number"
//               value={femaleNumber}
//               onChange={(event) => setFemaleNumber(event.target.value)}
//               placeholder="عدد الإناث"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//         <div className='col-6 p-3'>
//             <input
//               id='family_provider_relation'
//               type="text"
//               value={familyProviderName}
//               onChange={(event) => setFamilyProviderName(event.target.value)}
//               placeholder="اسم مقدم الخدمة للعائلة"
//               className='form-control'
//             />
//           </div>

//         <div className='col-6 p-3'>
//             <input
//               id='family_provider_identity'
//               type="text"
//               value={familyProviderIdentity}
//               onChange={(event) => setFamilyProviderIdentity(event.target.value)}
//               placeholder="هوية مقدم الأسرة"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//         <div className='col-6 p-3'>
//             <input
//               id='peopleCountOnFp'
//               type="text"
//               value={peopleCountOnFp}
//               onChange={(event) => setPeopleCountOnFp(event.target.value)}
//               placeholder="اسم مقدم الخدمة للعائلة"
//               className='form-control'
//             />
//           </div>

//         <div className='col-6 p-3'>
//             <input
//               id='family_provider_identity'
//               type="text"
//               value={familyProviderIdentity}
//               onChange={(event) => setFamilyProviderIdentity(event.target.value)}
//               placeholder="هوية مقدم الأسرة"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='relatives_at_home'
//               type="number"
//               value={relativesAtHome}
//               onChange={(event) => setRelativesAtHome(event.target.value)}
//               placeholder="عدد الأقارب في المنزل"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='children'
//               type="number"
//               value={children}
//               onChange={(event) => setChildren(event.target.value)}
//               placeholder="عدد الأطفال"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='income'
//               type="number"
//               value={income}
//               onChange={(event) => setIncome(event.target.value)}
//               placeholder="الدخل الشهري"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='income_source'
//               type="text"
//               value={incomeSource}
//               onChange={(event) => setIncomeSource(event.target.value)}
//               placeholder="مصدر الدخل"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='additional_details'
//               type="text"
//               value={additionalDetails}
//               onChange={(event) => setAdditionalDetails(event.target.value)}
//               placeholder="تفاصيل إضافية"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='status'
//               type="text"
//               value={status}
//               onChange={(event) => setStatus(event.target.value)}
//               placeholder="الحالة"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='rent'
//               type="number"
//               value={rent}
//               onChange={(event) => setRent(event.target.value)}
//               placeholder="مبلغ الإيجار"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='rooms_num'
//               type="number"
//               value={roomsNum}
//               onChange={(event) => setRoomsNum(event.target.value)}
//               placeholder="عدد الغرف"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='house_situation'
//               type="text"
//               value={houseSituation}
//               onChange={(event) => setHouseSituation(event.target.value)}
//               placeholder="حالة المنزل"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='aid_suggested'
//               type="text"
//               value={aidSuggested}
//               onChange={(event) => setAidSuggested(event.target.value)}
//               placeholder="المساعدة المقترحة"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='report_author'
//               type="text"
//               value={reportAuthor}
//               onChange={(event) => setReportAuthor(event.target.value)}
//               placeholder="مؤلف التقرير"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='team'
//               type="text"
//               value={team}
//               onChange={(event) => setTeam(event.target.value)}
//               placeholder="الفريق"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='visit_ending_date'
//               type="date"
//               value={visitEndingDate}
//               onChange={(event) => setVisitEndingDate(event.target.value)}
//               placeholder="تاريخ نهاية الزيارة"
//               className='form-controll'
//               />
//             </div>
//             <div className='col-6 p-3'>
//             <input
//               id='visit_starting_date'
//               type="date"
//               value={visitStartingDate}
//               onChange={(event) => setVisitStartingDate(event.target.value)}
//               placeholder="تاريخ بداية الزيارة"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='visit_purpose'
//               type="text"
//               value={visitPurpose}
//               onChange={(event) => setVisitPurpose(event.target.value)}
//               placeholder="غرض الزيارة"
//               className='form-control'
//             />
//           </div>
//           <div className='col-6 p-3'>
//             <input
//               id='visit_result'
//               type="text"
//               value={visitResult}
//               onChange={(event) => setVisitResult(event.target.value)}
//               placeholder="نتيجة الزيارة"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-6 p-3'>
//             <input
//               id='notes'
//               type="text"
//               value={notes}
//               onChange={(event) => setNotes(event.target.value)}
//               placeholder="ملاحظات"
//               className='form-control'
//             />
//           </div>
//         </div>

//         <div className='row'>
//           <div className='col-12 p-3'>
//             <button type="submit" className='btn btn-primary'>
//               حفظ
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBeneficiary;
              