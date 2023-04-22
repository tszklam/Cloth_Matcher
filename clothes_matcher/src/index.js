/** This is the main page of our application, in which we define each of
 * the routes and their corresponding react components */
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';
import PostPage from './pages/post';
import ForgotPassword from './pages/forgotPassword';
import reportWebVitals from './reportWebVitals';
import AccountInfoPage from './pages/accountInfo';
import Messages from './pages/messages';
import MainPage from './pages/mainPage';

// We use the reactDOM to define routes
ReactDOM.render(
  <div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/account" element={<AccountInfoPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  </div>,
  document.getElementById('root'),
);

// This is pretty much irrelevant right now but we might want it later
reportWebVitals();
