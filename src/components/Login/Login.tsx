import './Login.css';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";


export const Login = () => {
  let history = useHistory();
  const firebase = getFirebase();
  const [error, setError] = useState('');
  const [state, setState] = useState({
    email: '',
    password: ''
  }
  );
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
    firebase.auth().signInWithEmailAndPassword(
      state.email,
      state.password
    ).then((resp) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid);
          history.push({
            pathname: "/new",
            search: `uid=${user.uid}`,
          });
        }
        setState({
          email: '',
          password: ''
        });
      });
    })
      .catch(err => {
        setError('User not found with given details try again !!');
        console.error("User not found with given email and password try again !!", err);
      });
  }
  return (
    <div id="login">
      <h3 className="text-center text-info">Login form</h3>
      <div className="container">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form" onSubmit={handleSubmit}>
                <h3 className="text-center text-info">Login</h3>
                {error &&
                  <h6 className="error"> {error} </h6>}
                <div className="form-group">
                  <label className="text-info">Email:</label><br />
                  <input required autoFocus type="email" name="email" onChange={handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="text-info">Password:</label><br />
                  <input required type="password" name="password" onChange={handleChange} id="password" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="text-info"></label><br />
                  <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" />
                </div>
                <div className="form-group">
                  <div id="register-link" className="text-right">
                    <Link className="text-info" to="/signup ">Register here</Link>

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


export default Login;

