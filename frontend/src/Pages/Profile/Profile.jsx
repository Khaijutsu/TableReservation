import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext"
import './profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className='userInfo'>
        <h4>Name: {user.username}</h4>
        <h4>Mailing Address: {user.mailingAddress}</h4>
        <h4>Billing Adress: {user.billingAddress}</h4>
        <h4>Preferred Diner#: {user.dinerNumber}</h4>
        <h4>Points: {user.points}</h4>
        <h4>Preferred Payment: {user.paymentMethod}</h4>
      </div>
    </div>
  )
}

export default Profile