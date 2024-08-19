import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddBeneficiaryButton = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch('http://localhost:8000/api/add_beneficiary', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to add beneficiary');
            }

            alert('Beneficiary added successfully');
            handleClose();
        } catch (error) {
            console.error('Error adding beneficiary:', error);
            alert('Error adding beneficiary');
        }
    };

    return (
        <>
            <Button
                variant="primary"
                className="add-beneficiary-button"
                onClick={handleShow}
                style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}
            >
                + 
            </Button>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>إضافة مستفيد جديد</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* معلومات المستفيد */}
                        <Form.Group controlId="formFirstName">
                            <Form.Label>الاسم الأول</Form.Label>
                            <Form.Control type="text" name="first_name" required />
                        </Form.Group>
                        <Form.Group controlId="formFatherName">
                            <Form.Label>اسم الأب</Form.Label>
                            <Form.Control type="text" name="father_name" required />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>الاسم الأخير</Form.Label>
                            <Form.Control type="text" name="last_name" required />
                        </Form.Group>
                        <Form.Group controlId="formMotherName">
                            <Form.Label>اسم الأم</Form.Label>
                            <Form.Control type="text" name="mother_name" required />
                        </Form.Group>
                        <Form.Group controlId="formLivingStatus">
                            <Form.Label>حالة المعيشة</Form.Label>
                            <Form.Control type="text" name="living_status" required />
                        </Form.Group>
                        <Form.Group controlId="formBirthDate">
                            <Form.Label>تاريخ الميلاد</Form.Label>
                            <Form.Control type="date" name="birth_date" required />
                        </Form.Group>
                        <Form.Group controlId="formBirthPlace">
                            <Form.Label>مكان الميلاد</Form.Label>
                            <Form.Control type="text" name="birth_place" required />
                        </Form.Group>
                        <Form.Group controlId="formMaritalStatus">
                            <Form.Label>الحالة الاجتماعية</Form.Label>
                            <Form.Control type="text" name="marital_status" required />
                        </Form.Group>
                        <Form.Group controlId="formEducationalLevel">
                            <Form.Label>المستوى التعليمي</Form.Label>
                            <Form.Control type="text" name="educational_level" required />
                        </Form.Group>
                        <Form.Group controlId="formProfession">
                            <Form.Label>المهنة</Form.Label>
                            <Form.Control type="text" name="profession" required />
                        </Form.Group>
                        <Form.Group controlId="formPreviousAddress">
                            <Form.Label>العنوان السابق</Form.Label>
                            <Form.Control type="text" name="previous_address" required />
                        </Form.Group>
                        <Form.Group controlId="formCurrentAddress">
                            <Form.Label>العنوان الحالي</Form.Label>
                            <Form.Control type="text" name="current_address" required />
                        </Form.Group>
                        <Form.Group controlId="formMobileNumber">
                            <Form.Label>رقم الجوال</Form.Label>
                            <Form.Control type="text" name="mobile_number" required />
                        </Form.Group>
                        <Form.Group controlId="formTelephoneNumber">
                            <Form.Label>رقم الهاتف</Form.Label>
                            <Form.Control type="text" name="telephone_number" required />
                        </Form.Group>
                        <Form.Group controlId="formPartnerName">
                            <Form.Label>اسم الشريك</Form.Label>
                            <Form.Control type="text" name="partner_name" required />
                        </Form.Group>
                        <Form.Group controlId="formPartnerFatherName">
                            <Form.Label>اسم والد الشريك</Form.Label>
                            <Form.Control type="text" name="partner_father_name" required />
                        </Form.Group>
                        <Form.Group controlId="formPartnerMotherName">
                            <Form.Label>اسم والدة الشريك</Form.Label>
                            <Form.Control type="text" name="partner_mother_name" required />
                        </Form.Group>
                        <Form.Group controlId="formPartnerBirthDate">
                            <Form.Label>تاريخ ميلاد الشريك</Form.Label>
                            <Form.Control type="date" name="partner_birth_date" required />
                        </Form.Group>
                        <Form.Group controlId="formPartnerBirthPlace">
                            <Form.Label>مكان ميلاد الشريك</Form.Label>
                            <Form.Control type="text" name="partner_birth_place" required />
                        </Form.Group>
                        <Form.Group controlId="formFamilyMembersNumber">
                            <Form.Label>عدد أفراد الأسرة</Form.Label>
                            <Form.Control type="number" name="family_members_number" required />
                        </Form.Group>
                        <Form.Group controlId="formMalesNumber">
                            <Form.Label>عدد الذكور</Form.Label>
                            <Form.Control type="number" name="males_number" required />
                        </Form.Group>
                        <Form.Group controlId="formFemaleNumber">
                            <Form.Label>عدد الإناث</Form.Label>
                            <Form.Control type="number" name="female_number" required />
                        </Form.Group>
                        <Form.Group controlId="formFamilyProviderName">
                            <Form.Label>اسم معيل الأسرة</Form.Label>
                            <Form.Control type="text" name="family_provider_name" required />
                        </Form.Group>
                        <Form.Group controlId="formFamilyProviderIdentity">
                            <Form.Label>هوية معيل الأسرة</Form.Label>
                            <Form.Control type="text" name="family_provider_identity" required />
                        </Form.Group>
                        <Form.Group controlId="formPeopleCountOnFP">
                            <Form.Label>عدد المعتمدين على معيل الأسرة</Form.Label>
                            <Form.Control type="number" name="people_count_on_fp" required />
                        </Form.Group>
                        <Form.Group controlId="formUnder18">
                            <Form.Label>عدد أفراد الأسرة تحت سن 18</Form.Label>
                            <Form.Control type="number" name="under18" required />
                        </Form.Group>
                        <Form.Group controlId="formAbove18">
                            <Form.Label>عدد أفراد الأسرة فوق سن 18</Form.Label>
                            <Form.Control type="number" name="above18" required />
                        </Form.Group>
                        <Form.Group controlId="formAbove60">
                            <Form.Label>عدد أفراد الأسرة فوق سن 60</Form.Label>
                            <Form.Control type="number" name="above60" required />
                        </Form.Group>
                        <Form.Group controlId="formSpecialNeeds">
                            <Form.Label>هل يوجد احتياجات خاصة؟</Form.Label>
                            <Form.Control type="number" name="special_needs" required />
                        </Form.Group>
                        <Form.Group controlId="formSpecialNeedsSituation">
                            <Form.Label>حالة الاحتياجات الخاصة</Form.Label>
                            <Form.Control type="text" name="special_needs_situation" required />
                        </Form.Group>
                        <Form.Group controlId="formRelativesAtHome">
                            <Form.Label>هل يوجد أقارب في المنزل؟</Form.Label>
                            <Form.Control type="text" name="relatives_at_home" required />
                        </Form.Group>

                        {/* معلومات الأطفال */}
                        <Form.Group controlId="formChildren">
                            <Form.Label>معلومات الأطفال</Form.Label>
                            <Form.Control type="text" name="children[0][name]" placeholder="اسم الطفل الأول" required />
                            <Form.Control type="date" name="children[0][c_birth_date]" placeholder="تاريخ ميلاد الطفل الأول" required />
                            <Form.Control type="text" name="children[0][c_birth_place]" placeholder="مكان ميلاد الطفل الأول" required />
                            <Form.Control type="text" name="children[0][educational_status]" placeholder="الحالة التعليمية للطفل الأول" required />
                            <Form.Control type="text" name="children[1][name]" placeholder="اسم الطفل الثاني" />
                            <Form.Control type="date" name="children[1][c_birth_date]" placeholder="تاريخ ميلاد الطفل الثاني" />
                            <Form.Control type="text" name="children[1][c_birth_place]" placeholder="مكان ميلاد الطفل الثاني" />
                            <Form.Control type="text" name="children[1][educational_status]" placeholder="الحالة التعليمية للطفل الثاني" />
                        </Form.Group>

                        {/* معلومات إضافية */}
                        <Form.Group controlId="formIncome">
                            <Form.Label>الدخل</Form.Label>
                            <Form.Control type="number" name="income" required />
                        </Form.Group>
                        <Form.Group controlId="formIncomeSource">
                            <Form.Label>مصدر الدخل</Form.Label>
                            <Form.Control type="text" name="income_source" required />
                        </Form.Group>
                        <Form.Group controlId="formAdditionalDetails">
                            <Form.Label>تفاصيل إضافية</Form.Label>
                            <Form.Control type="text" name="additional_details" required />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>الحالة</Form.Label>
                            <Form.Control type="text" name="status" required />
                        </Form.Group>
                        <Form.Group controlId="formRent">
                            <Form.Label>الإيجار</Form.Label>
                            <Form.Control type="number" name="rent" required />
                        </Form.Group>
                        <Form.Group controlId="formRoomsNum">
                            <Form.Label>عدد الغرف</Form.Label>
                            <Form.Control type="number" name="rooms_num" required />
                        </Form.Group>
                        <Form.Group controlId="formHouseSituation">
                            <Form.Label>حالة المنزل</Form.Label>
                            <Form.Control type="text" name="house_situation" required />
                        </Form.Group>
                        <Form.Group controlId="formAidSuggested">
                            <Form.Label>المساعدة المقترحة</Form.Label>
                            <Form.Control type="text" name="aid_suggested[0]" placeholder="المساعدة الأولى" required />
                        </Form.Group>
                        <Form.Group controlId="formReportAuthor">
                            <Form.Label>مؤلف التقرير</Form.Label>
                            <Form.Control type="text" name="report_author" required />
                        </Form.Group>
                        <Form.Group controlId="formTeam">
                            <Form.Label>الفريق</Form.Label>
                            <Form.Control type="text" name="team[0]" placeholder="عضو الفريق الأول" required />
                            <Form.Control type="text" name="team[1]" placeholder="عضو الفريق الثاني" />
                        </Form.Group>
                        <Form.Group controlId="formVisitEndingDate">
                            <Form.Label>وقت انتهاء الزيارة</Form.Label>
                            <Form.Control type="time" name="visit_ending_date" required />
                        </Form.Group>
                        <Form.Group controlId="formVisitStartingDate">
                            <Form.Label>وقت بدء الزيارة</Form.Label>
                            <Form.Control type="time" name="visit_starting_date" required />
                        </Form.Group>
                        <Form.Group controlId="formDay">
                            <Form.Label>اليوم</Form.Label>
                            <Form.Control type="text" name="day" required />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>التاريخ</Form.Label>
                            <Form.Control type="date" name="date" required />
                        </Form.Group>
                        <Form.Group controlId="formFinalRate">
                            <Form.Label>التقييم النهائي</Form.Label>
                            <Form.Control type="number" name="final_rate" required />
                        </Form.Group>
                        <Form.Group controlId="formVisitPeriod">
                            <Form.Label>مدة الزيارة</Form.Label>
                            <Form.Control type="text" name="visit_period" required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            إضافة المستفيد
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddBeneficiaryButton;
