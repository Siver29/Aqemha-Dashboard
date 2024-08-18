import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function DashboardHeader() {
  return (
    <div className='container primaryColor dashboardHeader p-3 text-white shadow-lg'>
      <div className='row h-100'>
            <div className='col-6'>
                <input type='text' placeholder='ابحث' className='form-control w-50'></input>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='searchIcon'>
<path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                {/* <button>📢</button> */}
            </div>
            {/* <div className='col-6'>sssssssssss</div> */}
      </div>
    </div>
  )
}

export default DashboardHeader
