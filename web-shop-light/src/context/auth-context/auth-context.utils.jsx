import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



//console.log(process.env.API_BASE_URL); 
// AuthContext
export const AuthContext = createContext();

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Shrani podatke o uporabniku
  const [token, setToken] = useState(null); // Shrani uporabniški token
  const [refreshToken, setRefreshToken] = useState(null); //

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  //console.log("API_BASE_URL:", API_BASE_URL);

    // Ob inicializaciji preveri lokalno shrambo
    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      const savedRefreshToken = localStorage.getItem('refreshToken');
  
      if (savedUser && savedToken) {
        setUser(savedUser);
        setToken(savedToken);
        setRefreshToken(savedRefreshToken);
      }
    }, []);

  // Prijava
  const login = async (username, pwd) => {

    
    //console.log("DEBUG login:")
    //console.log(API_BASE_URL)
    //console.log(`${API_BASE_URL}/Auth/login`)
    const response = await fetch(`${API_BASE_URL}/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, pwd }),
    });

    if (response.ok) {
      const data = await response.json();

      //console.log(`Token: ${data.accessToken}`);
      //console.log(`refreshToken: ${data.refreshToken}`);
      //console.log(`User: ${username}`);
      //console.log({data});

      setToken(data.accessToken);   //  Shranimo token
      setRefreshToken(data.refreshToken);
      setUser(username); // Shranimo uporabniške podatke, če so priloženi

      console.log('token: ', data.accessToken);
      // Shrani v lokalno shrambo
      localStorage.setItem('user', username);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);


    } else {
      throw new Error('Invalid login credentials');
    }
  };

  // Registracija
  const register = async (userData, language) => {
    
    // Odstrani polje `pwdrpt` iz userData
    const { pwdrpt, ...rest } = userData;
    console.log("rest: ", rest);
    console.log("pwdrpt: ", pwdrpt);
    // Ustvari payload brez `pwdrpt` in z dodanim `userRole`
    //const payload = { ...rest, userRole: 'uporabnik' };
    console.log("userData: ",userData);

    const response = await fetch(`${API_BASE_URL}/Auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response;
  };

  /*

export const getUserData = async (token, username) => {
  const response = 
  await axios.get(`${API_BASE_URL}/User/${username}`,
   createHeaders(token));

  console.log("apiService: getUserDataaddUserAddress:")
  console.log(response.data)
  return response.data;
};
  */
  // Sprememba gesla
  const changePassword = async (username, oldPassword, newPassword) => {
      const payload = {
        "username": username,
        "oldPassword": oldPassword,
        "newPassword": newPassword,
      };
      /*
  "username": "string",
  "oldPassword": "string",
  "newPassword": "string"
      */
      console.log("AuthProvider: changePassword: , ",payload);
      payload["Username"]=username;
      console.log("Change password token", token);

      const response = await fetch(`${API_BASE_URL}/Auth/change-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
         },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      return response;
  };


  // Dodaj forgotPassword funkcijo
  const forgotPassword = async (email) => {
    const payload = { email };
    console.log("Forgot Password payload:", payload);

    const response = await fetch(`${API_BASE_URL}/Auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to send password reset email');
    }

    return response; // Vrne podatke iz API-ja, če je uspešno
  };

  // Logout
  const logout = () => {
    localStorage.setItem('user', "");
    localStorage.setItem('token', "");
    localStorage.setItem('refreshToken', "");
    setUser(null);
    setToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      refreshToken, 
      login, 
      register, 
      changePassword, 
      logout,
      forgotPassword  }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};


export const useAuth = () => useContext(AuthContext);
