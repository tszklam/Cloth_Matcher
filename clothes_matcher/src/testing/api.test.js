import {
  checkLogin, deletePost, getMyPosts, getPostByID, newPost, rootUrl, updatePost,
} from '../mockBackend/api';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

/** Create new adapter before each test */
let mock;
beforeEach(() => {
  mock = new MockAdapter(axios);
});

/** Test the login API */
describe('Test Login API', () => {
  // Check that the previous high score is returned when the user tries to login*/
  test('Successful Login for returning user', async () => {
    mock.onPost(`${rootUrl}/login`).reply(200, { success: true, error: '' });
    const response = await checkLogin('sarah@gmail.com', 'password');
    expect(response).toMatchObject({ success: true, error: '' });
  });
  // Check the error handling
  test('Unsuccessful login', async () => {
    mock.onPost(`${rootUrl}/login`).reply(404);
    const response = await checkLogin('sarah@gmail.com', 'password');
    expect(response).toMatchObject({ success: false, error: 'Request failed with status code 404' });
  });
});

/** Test the post-related APIs */
describe('Test Posting API', () => {
  // Check getting all of the user's posts
  test('Successful getMyPosts', async () => {
    mock.onGet(`${rootUrl}/posts`).reply(203, {
      posts: [{
        title: 'My first post',
        size: 'small',
        style: 'shirt',
        zip: 19104,
        comment: 'comment',
        image: 'img',
      }],
      error: '',
    });
    const response = await getMyPosts('sarah@gmail.com');
    expect(response).toMatchObject({
      posts: [{
        title: 'My first post',
        size: 'small',
        style: 'shirt',
        zip: 19104,
        comment: 'comment',
        image: 'img',
      }],
      error: '',
    });
  });
  // Check the case when there is an error getting the user's posts
  test('Unsuccessful getMyPosts', async () => {
    mock.onGet(`${rootUrl}/posts`).reply(403);
    const response = await getMyPosts('sarah@gmail.com');
    expect(response).toMatchObject({ posts: [], error: 'Request failed with status code 403' });
  });
  // Test creating a new post
  test('Successful newPost', async () => {
    mock.onPost(`${rootUrl}/post`).reply(205, { success: true, error: '' });
    const response = await newPost('My first post', 'small', 'shirt', 19104, '', 'img.jpeg');
    expect(response).toMatchObject({ success: true, error: '' });
  });
  // Test the case where there's an error creating a new post
  test('Unsuccessful newPost', async () => {
    mock.onPost(`${rootUrl}/post`).reply(405);
    const response = await newPost('My first post', 'small', 'shirt', 19104, '', 'img.jpeg');
    expect(response).toMatchObject({ success: false, error: 'Request failed with status code 405' });
  });
  // Test getting a post by ID
  test('Successful getPostByID', async () => {
    mock.onGet(`${rootUrl}/getPost`).reply(206, {
      data: {
        title: 'My first post',
        size: 'small',
        style: 'shirt',
        zip: 19104,
        comment: 'comment',
        image: 'img',
      },
      error: '',
    });
    const response = await getPostByID(5);
    expect(response).toMatchObject({
      data: {
        title: 'My first post',
        size: 'small',
        style: 'shirt',
        zip: 19104,
        comment: 'comment',
        image: 'img',
      },
      error: '',
    });
  });
  // Test the case where there's an error getting a post by ID
  test('Unsuccessful getPostByID', async () => {
    mock.onGet(`${rootUrl}/getPost`).reply(406);
    const response = await getPostByID(5);
    expect(response).toMatchObject({ data: {}, error: 'Request failed with status code 406' });
  });
  // Test deleting a post by ID
  test('Successful deletePost', async () => {
    mock.onPut(`${rootUrl}/deletePost`).reply(207, { success: true, error: '' });
    const response = await deletePost(1);
    expect(response).toMatchObject({ success: true, error: '' });
  });
  // Test the case where deleting a post by ID is not successful
  test('Unsuccessful deletePost', async () => {
    mock.onPut(`${rootUrl}/deletePost`).reply(407);
    const response = await deletePost(1);
    expect(response).toMatchObject({ success: false, error: 'Request failed with status code 407' });
  });
  // Test updating a post
  test('Successful updatePost', async () => {
    mock.onPut(`${rootUrl}/updatePost`).reply(208, { success: true, error: '' });
    const response = await updatePost(5, 'my shirt', 'small', 'shirt', 19104, 'comment', 'image');
    expect(response).toMatchObject({ success: true, error: '' });
  });
  test('Unsuccessful updatePost', async () => {
    mock.onPut(`${rootUrl}/updatePost`).reply(408);
    const response = await updatePost(5, 'my shirt', 'small', 'shirt', 19104, 'comment', 'image');
    expect(response).toMatchObject({ success: false, error: 'Request failed with status code 408' });
  });
});
