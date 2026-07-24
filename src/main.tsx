import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login.tsx'
import { Notes } from './pages/Notes.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { Profile } from './pages/Profile.tsx'
import { UseReduserExample } from './pages/UseReducerExample.tsx'
import ProtectedRoutes from './utils/ProptectedRoutes.tsx'
import { UserDetails } from './pages/UserDetails.tsx'

const router = createBrowserRouter([
  { 
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { 
        element: <ProtectedRoutes/>,
        children: [
          { 
            path: "/home", 
            element: <Home />, 
            children: [
              { index: true, element: <Navigate to="profile"/> },
              { path: "profile", element: <Profile /> },
              { path: "notes", element: <Notes/> },
              { path: "reducer", element: <UseReduserExample/>},
              { 
                path: "users", 
                lazy:() => import("./pages/Users.tsx"),
                //// loader works well, but now we are not ganna use it
                // loader: async () => {
                //   return (await fetch("https://jsonplaceholder.typicode.com/users")).json();
                // }
              },
              { path: "users/:id/:name?", element: <UserDetails/> }
            ] 
          }
        ]
      },
      { path: "*", element: <NotFound /> }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
  // </StrictMode>,
)
