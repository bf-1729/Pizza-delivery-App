// Adminscreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Userslist from './Userslist';
import Pizzaslist from './Pizzaslist';
import Addpizza from './Addpizza';
import Editpizza from './Editpizza';
import Navbar from '../components/Navbar';
import "./Adminscreen.css"
import Orderscreen from './Orderscreen';
function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser, loading } = userstate;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!currentUser || !currentUser.isAdmin)) {
      navigate("/");
    }
  }, [currentUser, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='adminscreen_main text-center'>
      <Navbar/>
      <div className='row justify-content-center'>
        <div className='col-md-10'>
          <div className='adminfunctions'>
            <Link to='/admin/userslist' className='link'>Users List</Link>
            <Link to='/admin/orderslist' className='link'>Orders List</Link>
            <Link to='/admin/pizzaslist' className='link'>Pizzas List</Link>
            <Link to='/admin/addpizza' className='link'>Add New Pizza</Link>
          </div>

          <Routes>
            <Route path="userslist" element={<Userslist />} />
            <Route path="orderslist" element={<Orderscreen />} />
            <Route path="pizzaslist" element={<Pizzaslist />} />
            <Route path="addpizza" element={<Addpizza />} />
            <Route path="editpizza/:pizzaid" element={<Editpizza/>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Adminscreen;
