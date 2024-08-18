import React ,{ useState } from 'react'
// import News from './Pages/News';
import ActiveVolunteers from './ActiveVolunteers';
import InActiveVolunteers from './InActiveVolunteers';
import 'bootstrap/dist/css/bootstrap.min.css';

function VolunteerStatusWrapper() {
    const [activeComponent, setActiveComponent] = useState(null);
    const handleButtonClick = (component) => {
        setActiveComponent(component);
      };
    
      return (
        <div className='container-fluid mt-5 p-3'>
          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8 d-flex justify-content-around align-items-center mb-5'>
              <button className='btn text-white w-25 primaryColor' onClick={() => handleButtonClick('volunteers')}>المتطوعين</button>
              <button className='btn text-white w-25 primaryColor' onClick={() => handleButtonClick('requests')}>طلبات التطوع</button>
              <button className='btn text-white w-25 primaryColor' onClick={() => handleButtonClick('certificates')}>الشهادات</button>
            </div>
            <div className='col-2'></div>
          </div>
          <div className='row'>
            {activeComponent === 'volunteers' && <ActiveVolunteers />}
            {activeComponent === 'requests' && <InActiveVolunteers />}
            {/* {activeComponent === 'certificates' && <News />} */}
          </div>
        </div>
      );
    }

export default VolunteerStatusWrapper
