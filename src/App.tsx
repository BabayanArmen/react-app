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
import { UseReduserExample } from './pages/UseREducerExample'

function App() {
  // const [count, setCount] = useState(0)

  const userData: ProfileProps = {
    name: "John Smith",
    age: 25
  }

  const handleCallback = (message: string) => {
      console.log("Message from child:", message);
  };

  return (
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
  )
}

export default App
