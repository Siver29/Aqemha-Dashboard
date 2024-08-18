import './App.css';
import SideBar from './Components/SideBar';
import Campaign from './Components/Pages/Campaign';
import Beneficiary from './Components/Pages/Beneficiary';
import Donation from './Components/Pages/Donation';
import News from './Components/Pages/News';
import Volunteer from './Components/Pages/Volunteer';
import DashboardHeader from './Components/DashboardHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App app-container container-fluid">
      <BrowserRouter>
      <div className='row w-100'>
        <div className='col-2'>
          <SideBar/>
        </div>
        <div className='col-10'>
          <DashboardHeader/>
          <Routes>
          <Route path="/volunteers" element={<Volunteer />} />
          <Route path="/beneficiaries" element={<Beneficiary />} />
          <Route path="/donations" element={<Donation />} />
          <Route path="/" element={<Campaign />} />
          <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
