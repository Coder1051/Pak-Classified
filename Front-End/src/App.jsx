import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/search'
import About from './pages/about'
import Contact from './pages/contact'
import Sitelayout from './pages/siteLayout';
import Categories from './components/mainComponents/categories';
import AdCategory from './components/mainComponents/adCategory';
import Error from './pages/error';
import Privacy from './pages/privacy';
import TermCondition from './pages/termCondition';
import MoreDetails from './components/mainComponents/moreDetails';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Sitelayout />}>
          <Route index element={<Home />} /> 
          <Route path='/home' element={<Home />} /> 
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='categories' element={<Categories />} />
          <Route path='adcategory' element={<AdCategory />} />
          <Route path='privacy' element={<Privacy />} />
          <Route path='carDetails' element={<MoreDetails/>} />
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='term&conditions' element={<TermCondition />} />
          <Route path='*' element={<Error />} />
          <Route path='/admin' element={<Admin/>} />
        </Route>
      </Routes>
    </>
  )
}
export default App