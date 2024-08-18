import './App.css';
import SideBar from './Components/SideBar';
import Campaign from './Pages/Campaign';
import Beneficiary from './Pages/Beneficiary';
import Donation from './Pages/Donation';
import News from './Pages/News';
import Volunteer from './Pages/Volunteer';
import Refer from './Pages/Refer';
import Programs from './Pages/Programs';
import Support from './Pages/Support';
import DashboardHeader from './Components/DashboardHeader';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Components/Auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App app-container container-fluid">
      <BrowserRouter>
        {token ? (
          <div className='row w-100'>
            <div className='col-2'>
              <SideBar/>
            </div>
            <div className='col-10'>
              {/* <DashboardHeader/> */}
              <Routes>
                <Route path="/volunteers" element={<Volunteer />} />
                <Route path="/beneficiaries" element={<Beneficiary />} />
                <Route path="/donations" element={<Donation />} />
                <Route path="/" element={<Campaign />} />
                <Route path="/news" element={<News />} />
                <Route path="/refer" element={<Refer />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/support" element={<Support />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
