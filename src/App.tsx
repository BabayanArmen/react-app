// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
// import { Header } from './pages/Header'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import ProtectedRoutes from './utils/ProptectedRoutes'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { Notes } from './pages/Notes'
import type { ProfileProps } from './models/profile.props.model'
import { UseReduserExample } from './pages/UseReducerExample'
import React, { useState } from 'react'
import type { AppContextModel } from './models/app.context.model'

const appContextValue: AppContextModel = {} as AppContextModel;

export const AppContext = React.createContext<AppContextModel>(appContextValue);

function App() {
  // const [count, setCount] = useState(0)

  const [data, setData] = useState(null);

  appContextValue.data = data;
  appContextValue.setData = setData;


  const userData: ProfileProps = {
    name: "John Smith",
    age: 25
  }

  const handleCallback = (message: string) => {
      console.log("Message from child:", message);
  };

  return (
    <AppContext.Provider value={appContextValue}>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route element={<ProtectedRoutes/>}>
        <Route path='/home' element={<Home />}>
          <Route index element={<Navigate to="profile" replace />}></Route>
          <Route path='profile' element={<Profile {...userData} callback={handleCallback} />}></Route>
          <Route path='notes' element={<Notes/>}></Route>
          <Route path='reducer' element={<UseReduserExample/>}></Route>
        </Route>
      </Route>
      <Route path='/*' element={<NotFound />}></Route>
    </Routes>
    </AppContext.Provider>
  )
}

export default App
