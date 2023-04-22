import axios from 'axios';

export const rootUrl = 'http://localhost:3000/';

/** Try logging into the application */
export async function checkLogin(username, password) {
  try {
    const response = await axios.post(`${rootUrl}/login`, { username: `${username}`, password: `${password}` });
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/** Try getting all posts for a user */
export async function getMyPosts(username) {
  try {
    const response = await axios.get(`${rootUrl}/posts`, { params: { username: `${username}` } });
    return response.data;
  } catch (error) {
    return { posts: [], error: error.message };
  }
}

/** Try creating a new post */
export async function newPost(title, size, style, zip, comment, image) {
  try {
    const response = await axios.post(`${rootUrl}/post`, {
      title: `${title}`, size: `${size}`, style: `${style}`, zip: `${zip}`, comment: `${comment}`, image: `${image}`,
    });
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/** Try getting a post by ID */
export async function getPostByID(ID) {
  try {
    const response = await axios.get(`${rootUrl}/getPost`, { params: { postID: `${ID}` } });
    return response.data;
  } catch (error) {
    return { data: {}, error: error.message };
  }
}

/** Try deleting a post by ID */
export async function deletePost(ID) {
  try {
    const response = await axios.put(`${rootUrl}/deletePost`, { postID: `${ID}` });
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/** Try updating a post */
export async function updatePost(ID, title, size, style, zip, comment, image) {
  try {
    const response = await axios.put(`${rootUrl}/updatePost`, {
      ID: `${ID}`,
      title: `${title}`,
      size: `${size}`,
      style: `${style}`,
      zip: `${zip}`,
      comment: `${comment}`,
      image: `${image}`,
    });
    return response.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
}
