import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './features/auth/Login.jsx';
import { store } from './app/store.js'
import Todolist from './features/auth/todolist/Todolist.jsx'
import { Provider } from 'react-redux'
const router=createBrowserRouter([
  {
    path:"/",
    element:<App></App>,
    children:[
      {
        path:"/",
        element:<Login></Login>
      },
      {
        path:"/todos",
        element:<Todolist></Todolist>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <RouterProvider router={router}>
        {/* <App /> */}
   </RouterProvider>
  </Provider>
  
)
