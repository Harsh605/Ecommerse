import React, { useEffect } from 'react'
import "./updatePassword.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../slices/userSlice';
import { useNavigate } from "react-router-dom"
import Backlog from '../Loading/Backlog';

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isLoading, isUpdated, isError } = useSelector((state) => state.custom2)

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/account")
    }
  }, [dispatch, isUpdated, navigate])

  return (
    (isLoading) ? (<Backlog />) :
      <>
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>

            <form
              className="updatePasswordForm"
              onSubmit={updatePasswordSubmit}
            >
              <div className="loginPassword">
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Change"
                className="updatePasswordBtn"
              />
            </form>
          </div>
        </div>
      </>
  )
}

export default UpdatePassword