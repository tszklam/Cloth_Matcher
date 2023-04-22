/** This includes code for the mock backend using local storage */

/** Get the current user */
export function getCurrentUser() {
  return localStorage.getItem('currUser');
}

/** Set the current user */
export function setCurrentUser(email) {
  localStorage.setItem('currUser', email);
}

/** This initializes an array in which we will store the posts */
export function initPosts() {
  if (!localStorage.getItem('myPosts')) {
    const myPosts = [];
    localStorage.setItem('myPosts', JSON.stringify(myPosts));
    localStorage.setItem('itemID', 0);
  }
}

/** Get all posts */
export function getAllPosts() {
  const allPosts = JSON.parse(localStorage.getItem('myPosts'));
  if (!allPosts) {
    initPosts();
  }
  return JSON.parse(localStorage.getItem('myPosts'));
}

/** Get all posts made by the current user */
export function getMyPosts(currUser) {
  const allPosts = getAllPosts();
  const myPosts = [];
  if (!allPosts) {
    return [];
  }
  // iterate through the posts and get the ones the current user made
  for (let i = 0; i < allPosts.length; i += 1) {
    if (allPosts[i].userID === currUser) {
      myPosts.push(allPosts[i]);
    }
  }
  return myPosts;
}

/** Add a new post to the array based on the information given */
export function newPost(title, size, style, zip, comment, image) {
  const allPosts = getAllPosts();
  let itemID = localStorage.getItem('itemID');
  itemID += 1;
  const userID = getCurrentUser();
  const likes = [];
  allPosts.push({
    itemID, userID, title, size, style, zip, comment, image, likes,
  });
  localStorage.setItem('myPosts', JSON.stringify(allPosts));
  localStorage.setItem('itemID', itemID + 1);
}

/** Get a post by its ID */
export function getPostByID(ID) {
  const myPosts = getMyPosts(getCurrentUser());
  for (let i = 0; i < myPosts.length; i += 1) {
    if (parseInt(myPosts[i].itemID, 10) === parseInt(ID, 10)) {
      return myPosts[i];
    }
  }
  return -1;
}

/** Delete a post by ID */
export function deletePost(ID) {
  const myPosts = getMyPosts(getCurrentUser());
  for (let i = 0; i < myPosts.length; i += 1) {
    if (parseInt(myPosts[i].itemID, 10) === parseInt(ID, 10)) {
      myPosts.splice(i, 1);
      localStorage.setItem('myPosts', JSON.stringify(myPosts));
      return;
    }
  }
}

/** Update a post with new information */
export function updatePost(ID, title, size, style, zip, comment, image) {
  const myPosts = getMyPosts(getCurrentUser());
  for (let i = 0; i < myPosts.length; i += 1) {
    if (parseInt(myPosts[i].itemID, 10) === parseInt(ID, 10)) {
      myPosts[i].title = title;
      myPosts[i].size = size;
      myPosts[i].style = style;
      myPosts[i].zip = zip;
      myPosts[i].comment = comment;
      myPosts[i].image = image;
      localStorage.setItem('myPosts', JSON.stringify(myPosts));
      return;
    }
  }
}

/** This initializes an array in which we will store the users */
export function initUsers() {
  if (!localStorage.getItem('Users')) {
    const Users = [];
    localStorage.setItem('Users', JSON.stringify(Users));
  }
}

/** Get all users */
export function getUsers() {
  // this is an easy way to make sure that the users are initialized
  if (!localStorage.getItem('Users')) {
    initUsers();
  }
  return JSON.parse(localStorage.getItem('Users'));
}

/** Get the info for the current user */
export function getCurrUserInfo() {
  const currUser = getCurrentUser();
  const Users = getUsers();
  for (let i = 0; i < Users.length; i += 1) {
    if (Users[i].email === currUser) {
      return Users[i];
    }
  }
  return 'error: no such user';
}

/** Check the login attempt */
export function checkLogin(email, password) {
  const Users = getUsers();
  // we'll return whether or not we were successful and the reason
  let success = false;
  let error = '';
  // iterate through the users
  for (let i = 0; i < Users.length; i += 1) {
    // if we find one with a matching email, check for password match
    if (Users[i].email === email) {
      if (Users[i].pass === password) {
        success = true;
      } else {
        error = 'Incorrect Password';
      }
      return { success, error };
    }
  }
  // if we reach here, then no such user exists
  error = 'An account with that email was not found';
  return { success, error };
}

/** Check if email exists already, used as unique identifier */
export function checkEmailExists(email) {
  const Users = getUsers();
  for (let i = 0; i < Users.length; i += 1) {
    if (Users[i].email === email) {
      return true;
    }
  }
  return false;
}

/** Add the user to the database */
export function addUser(pass, email, firstN, lastN) {
  let success = false;
  let error = '';
  // TODO: update this default to be locally stored once we have a real backend
  const profPic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  if (checkEmailExists(email)) {
    error = 'Another user already registered with that email';
    return { success, error };
  }
  const Users = getUsers();
  Users.push({
    email, pass, firstN, lastN, profPic,
  });
  localStorage.setItem('Users', JSON.stringify(Users));
  success = true;
  return { success, error };
}

/** Check if the email provided is valid */
export function checkEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}
