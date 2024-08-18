import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (email, password) => {
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: new FormData({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
      })
      .catch((error) => console.error(error));
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };