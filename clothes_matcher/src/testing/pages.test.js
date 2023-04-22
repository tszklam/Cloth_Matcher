import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/login';

/** Here are the UI tests for the login page */
describe('Test Login Page UI', () => {
  beforeEach(() => {
    render(<Login />);
  });
  test('Welcome message', () => {
    const welcomeMessage = screen.getByText('Welcome to ClothesMatcher!');
    expect(welcomeMessage).toBeInTheDocument();
  });
  test('Email label', () => {
    const emailLabel = screen.getByText('Email:');
    expect(emailLabel).toBeInTheDocument();
  });
  test('Password label', () => {
    const passwordLabel = screen.getByText('Password:');
    expect(passwordLabel).toBeInTheDocument();
  });
  test('Email field', () => {
    const emailField = screen.getByPlaceholderText('Enter email');
    expect(emailField).toBeInTheDocument();
  });
  test('Password field', () => {
    const passwordField = screen.getByPlaceholderText('Enter password');
    expect(passwordField).toBeInTheDocument();
  });
  test('Forgot password', () => {
    const forgotPassword = screen.getByText(/Forgot password/i);
    expect(forgotPassword).toBeInTheDocument();
  });
  test('Terms and conditions', () => {
    const termsConditions = screen.getByText(/Privacy Policy & Terms of Service/i);
    expect(termsConditions).toBeInTheDocument();
  });
  test('Signing up', () => {
    const dontHave = screen.getByText(/Don't have an account already/i);
    expect(dontHave).toBeInTheDocument();
    const signUp = screen.getByText('Sign up.');
    expect(signUp).toBeInTheDocument();
  });
  test('login button', () => {
    const loginButton = screen.getByText('Sign in');
    expect(loginButton).toBeInTheDocument();
  });
  test('Empty username', () => {
    const loginButton = screen.getByText('Sign in');
    userEvent.click(loginButton);
    const warning = screen.getByText(/Please fill in all fields!/i);
    expect(warning).toBeInTheDocument();
  });
  test('Nonexistent account', () => {
    // type in non-existent email and click login
    const emailField = screen.getByPlaceholderText('Enter email');
    const passwordField = screen.getByPlaceholderText('Enter password');
    userEvent.type(emailField, 'bob@gmail.com');
    userEvent.type(passwordField, 'password');
    const loginButton = screen.getByText('Sign in');
    userEvent.click(loginButton);
    // No such user should exist because we're starting with empty local storage
    const warning = screen.getByText(/An account with that email was not found/i);
    expect(warning).toBeInTheDocument();
  });
  test('Login by form rather than button', () => {
    // type in non-existent email and click login
    const emailField = screen.getByPlaceholderText('Enter email');
    const passwordField = screen.getByPlaceholderText('Enter password');
    userEvent.type(emailField, 'bob@gmail.com');
    userEvent.type(passwordField, 'password');
    // this time we press enter on the password rather than clicking the button
    fireEvent.submit(passwordField);
    // No such user should exist because we're starting with empty local storage
    const warning = screen.getByText(/An account with that email was not found/i);
    expect(warning).toBeInTheDocument();
  });
});
