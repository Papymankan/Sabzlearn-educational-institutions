import './App.css';
import routes from './routes';
import { useRoutes } from 'react-router-dom'
import AuthContext from './Context/authContext';
import { useCallback, useEffect, useState } from 'react';


function App() {
  const router = useRoutes(routes)

  const [isloggedIn, setIsloggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState({})

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }, [])

  const login = useCallback((userInfo, token) => {
    setToken(token)
    setIsloggedIn(true)
    setUserInfos(userInfo)
    localStorage.setItem('user', JSON.stringify({ token }))
  }, [])

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('user'))
    if (localData) {
      fetch('http://localhost:4000/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${localData.token}`
        }
      }).then(res => res.json())
        .then(data => {
          setIsloggedIn(true)
          setToken(localData.token)
          setUserInfos(data)
        })
    }
  }, [login])

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
