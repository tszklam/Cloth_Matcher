import '@testing-library/jest-dom';
import {
  initUsers,
  getCurrentUser,
  getUsers,
  checkEmail,
  addUser,
  checkEmailExists,
  setCurrentUser,
  checkLogin,
} from '../mockBackend/mockBackend';

require('jest-localstorage-mock');

/** Always clear the local storage before each test case */
beforeEach(() => {
  localStorage.clear();
});

/** Test initializing users */
test('initUsers', () => {
  expect(localStorage.__STORE__.Users).toBeUndefined();
  initUsers();
  expect(JSON.parse(localStorage.__STORE__.Users).length).toBe(0);
  expect(JSON.parse(localStorage.__STORE__.Users)).toMatchObject([]);
  expect(getUsers().length).toBe(0);
  expect(getUsers()).toMatchObject([]);
});

/** Check that we only accept good emails */
test('checkEmail', () => {
  expect(checkEmail('Sarah')).toBeNull();
  expect(checkEmail('hi@email')).toBeNull();
  expect(checkEmail('cis.350')).toBeNull();
  expect(checkEmail('bob@gmail.com').length).toBeGreaterThan(0);
  expect(checkEmail('sarah@domain.domain.com').length).toBeGreaterThan(0);
});

/** Check that we can tell when a user already exists */
test('checkEmailExists', () => {
  initUsers();
  expect(checkEmailExists('sarah@mail.com')).toBe(false);
  expect(JSON.parse(localStorage.__STORE__.Users).length).toBe(0);
  addUser('password', 'sarah@mail.com', 'sarah', 'testing');
  expect(JSON.parse(localStorage.__STORE__.Users).length).toBe(1);
  const expected = [{
    pass: 'password',
    email: 'sarah@mail.com',
    firstN: 'sarah',
    lastN: 'testing',
    profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  }];
  expect(JSON.parse(localStorage.__STORE__.Users)).toMatchObject(expected);
  expect(checkEmailExists('sarah@mail.com')).toBe(true);
  expect(checkEmailExists('sarah')).toBe(false);
});

/** Check that we can tell who the current user is */
test('getCurrentUser', () => {
  expect(getCurrentUser()).toBeNull();
  setCurrentUser('sarah@mail.com');
  expect(getCurrentUser()).toBe('sarah@mail.com');
});

/** Check that we can add and get users */
test('getUsers', () => {
  initUsers();
  addUser('password', 'sarah@mail.com', 'sarah', 'payne');
  addUser('password2', 'cynthia@mail.com', 'cynthia', 'lee');
  addUser('password3', 'raymond@mail.com', 'raymond', 'yang');
  const expected = [
    {
      pass: 'password',
      email: 'sarah@mail.com',
      firstN: 'sarah',
      lastN: 'payne',
      profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      pass: 'password2',
      email: 'cynthia@mail.com',
      firstN: 'cynthia',
      lastN: 'lee',
      profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    {
      pass: 'password3',
      email: 'raymond@mail.com',
      firstN: 'raymond',
      lastN: 'yang',
      profPic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
  ];
  expect(JSON.parse(localStorage.__STORE__.Users)).toMatchObject(expected);
  expect(getUsers()).toMatchObject(expected);
});

/** Check that we can login in users successfully */
test('checkLogin', () => {
  initUsers();
  addUser('password', 'sarah@mail.com', 'sarah', 'testing');
  expect(checkLogin('', '')).toMatchObject({ success: false, error: 'An account with that email was not found' });
  expect(checkLogin('sarah@mail.com', 'this is not my password')).toMatchObject({ success: false, error: 'Incorrect Password' });
  expect(checkLogin('sarah@mail.com', 'password')).toMatchObject({ success: true, error: '' });
});

/** Some edge case testing for adding users */
test('addUser', () => {
  initUsers();
  expect(addUser('password', 'sarah@mail.com', 'sarah', 'testing')).toMatchObject({ success: true, error: '' });
  expect(addUser('password2', 'sarah@mail.com', 'sarah2', 'testing2')).toMatchObject({ success: false, error: 'Another user already registered with that email' });
});
