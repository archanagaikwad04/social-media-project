import './SignUp.css';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";

export const SignUp = () => {
  let history = useHistory();
  const firebase = getFirebase();
  const [error, setError] = useState('');
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });


  const handleChange = (event: any) => {
    if (event.target.value === '') {
      setError('Email or Password can not be blank')
    }
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(
      state.email,
      state.password

    ).then((resp) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: state.firstName + ' ' + state.lastName

          }).then(function () {
            // Update successful.
          }).catch(function (err) {
            setError('Error when creating user with given details!!');
            console.error("first name last name", err);
          });
          console.log(user.uid);
          history.push({
            pathname: "/new",
            search: `uid=${user.uid}`,
          });
        }
      });
    })
      .catch(err => {
        setError('Error when creating user with given details!!');
        console.error("Error when creating user with given details", err);
      })

  };

  return (
    <div id="signup">
      <h3 className="text-center text-info pt-5">SignUp Form</h3>
      <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={handleSubmit}>
                <h3 className="text-center text-info">SignUp</h3>
                {error &&
                  <h6 className="error"> {error} </h6>}
                <div className="form-group">
                  <label className="text-info">Email:</label><br />
                  <input required autoFocus type="email" name="email" onChange={handleChange} id="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="text-info">Password:</label><br />
                  <input required type="password" name="password" onChange={handleChange} id="password" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="text-info">First Name:</label><br />
                  <input required type="text" name="firstName" onChange={handleChange} id="firstName" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="text-info">Last Name:</label><br />
                  <input required type="text" name="lastName" onChange={handleChange} id="lastName" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="text-info"></label><br />
                  <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                </div>
                <div className="form-group">
                  <div id="register-link" className="text-right">
                    <Link className="text-info" to="/login ">Login from here</Link>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
