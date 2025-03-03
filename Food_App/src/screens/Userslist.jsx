import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { getAllUsers, deleteUser,logoutUser } from '../actions/userActions';
import "./userslist.css";

function Userslist() {
  const dispatch = useDispatch();
  const [visibleUsers, setVisibleUsers] = useState([]); // Track visible users

  const userstate = useSelector(state => state.getAllUsersReducer);
  const { error, loading, users = [] } = userstate; // Ensure users is always an array

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className='userlist'>
      <h2 className='user_header'>Users List</h2>
      {loading && <Loading />}
      {error && <Error error={error || "Something went wrong"} />}

      <table className='usertable table justify-content-center'>
        <thead className='table-dark'>
          <tr className='usertable_header'>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='usertable_data'>
  {users && users.length > 0 ? (
    users.map(user => 
      user ? (
        <tr key={user._id}>
          <td className='user_data'>{user._id}</td>
          <td className='user_data'>{user.name}</td>
          <td className='user_data'>{user.email}</td>
          <td>
            <i
              style={{ color: "red", cursor: "pointer" }}
              className='fa fa-trash'
              onClick={() => handleDelete(user._id)}
            />
          </td>
        </tr>
      ) : null
    )
  ) : (
    <tr>
      <td colSpan="4" style={{ textAlign: "center" }}>No users found</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}

export default Userslist;
