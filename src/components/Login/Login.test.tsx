import React, { useState } from "react";
import { render, screen } from '@testing-library/react';
import Login from './Login';
import './Login.css';
import { getFirebase } from "react-redux-firebase";

import { useDispatch } from 'react-redux';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useHistory } from "react-router-dom";


test('should render Login correctly', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
