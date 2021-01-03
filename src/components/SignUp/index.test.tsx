import './SignUp.css';
import React, { useState } from "react";
import { render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SignUp from './index';
import { useHistory } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";

test('should render Login correctly', () => {
    render(<SignUp />);
    const linkElement = screen.getByText(/SignUp/i);
    expect(linkElement).toBeInTheDocument();
  });
  
