import './App.css';
import routes from './routes';
import { useRoutes } from 'react-router-dom'
import AuthContext from './Context/authContext';
import { useState } from 'react';


function App() {
  const router = useRoutes(routes)

  const [isloggedIn, setIsloggedIn] = useState(null)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState({})

  const login = (token)=>{
    setToken(token)
    localStorage.setItem('user' , JSON.stringify({token}))
  }
  const logout = (token)=>{
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{
        isloggedIn,
        token,
        userInfos,
        login,
        logout
      }}>
        {router}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
