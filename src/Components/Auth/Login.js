import React, { useState } from 'react';
// import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  // const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData()
    // formData.append('email' , email)
    // formData.append('password' , password)
    // formData.append('password confirmation' , passwordConfirmation)
    fetch(`http://localhost:8000/api/login?email=${email}&password=${password}&password confirmation=${passwordConfirmation}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) =>{
        console.log(data)
        localStorage.setItem('token', data.data.token);
  
        navigate('/refer')
         console.log(data)
        }
        )
      .catch((error) => console.error(error));
  };

  return (
    <div className="align">
      <div className="grid align__item">
        <div className="register">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="site__logo"
            width="56"
            height="84"
            viewBox="77.7 214.9 274.7 412"
          >
            <defs>
              <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                <stop offset="0%" stop-color="#8ceabb" />
                <stop offset="100%" stop-color="#378f7b" />
              </linearGradient>
            </defs>
            <path fill="url(#a)" d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z" />
          </svg>

          <h2>تسجيل الدخول</h2>

          <form className="form">
            <div className="form__field">
              <input
                type="email"
                placeholder="info@mailaddress.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form__field">
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form__field">
              <input
                type="password"
                placeholder="••••••••••••"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
              />
            </div>

            <div className="form__field">
              <input type="submit" value="تسجيل الدخول" onClick={handleSubmit}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;