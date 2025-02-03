import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { getAllUsers, deleteUser } from '../actions/userActions';
import "./userslist.css";

function Userslist() {
  const dispatch = useDispatch();
  const [visibleUsers, setVisibleUsers] = useState([]); // Track visible users
  const [userIndex, setUserIndex] = useState(0); // Keep track of the current user index

  const userstate = useSelector(state => state.getAllUsersReducer);
  const { error, loading, users } = userstate;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Logic to display users one by one
  useEffect(() => {
    if (users.length > 0) {
      const interval = setInterval(() => {
        if (userIndex < users.length) {
          setVisibleUsers(prevUsers => [...prevUsers, users[userIndex]]);
          setUserIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(interval); // Stop the interval once all users are displayed
        }
      }, 10); // 1000ms (1 second) delay between showing each user

      return () => clearInterval(interval); // Cleanup the interval when component unmounts
    }
  }, [users, userIndex]);

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
          {visibleUsers && visibleUsers.map(user => (
            <tr key={user._id}>
              <td className='user_data'>{user._id}</td>
              <td className='user_data'>{user.name}</td>
              <td className='user_data'>{user.email}</td>
              <td style={{ textAlign: "right" }}>
                <i
                  style={{ color: "red", cursor: "pointer" }}
                  className='fa fa-trash'
                  onClick={() => handleDelete(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Userslist;
