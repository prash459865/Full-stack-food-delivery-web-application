import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Add from './pages/add/Add';
import List from './pages/list/List';
import Orders from './pages/Orders/Orders';



const App = () => {

 const url = "http://localhost:4000"
  return (
    <>
      <Router>
        <Navbar />
        <hr />

        <div className="App-container">
          <Sidebar />
          <Routes>
            <Route path='/add' element={<Add />} />
            <Route path='/List' element={<List />} />
            <Route path='/Orders' element={<Orders url = {url}/>} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
