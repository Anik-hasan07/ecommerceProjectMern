import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";

import MetaData from "../layout/MetaData";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  

  const {  success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    if (success) {
     

      navigate("/login");
    }
  }, [dispatch, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;