import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppToolbar from './UI/AppToolbar/AppToolbar'
import { Route, Routes } from 'react-router-dom'
import Register from './features/User/Register'
import Login from './features/User/Login'
import Posts from './features/Post/Posts'


const App = ()=> {
  return (
    <>
      <header className='bg-dark'>
        <AppToolbar></AppToolbar>
      </header>
      <div className="container">
        <Routes>
          <Route path='/' element={
            <> 
              <Posts/>
            </>
          }/>
          <Route path='/:id' element={
            <> 
              <Posts/>
            </>
          }/>
          <Route path='/register' element={
            <Register/>
          }/>
          <Route path='/login' element={
            <Login/>
          }/>
          <Route path="*" element={<h1 className='text-center'>Not found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
